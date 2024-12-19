const socketIo = require('socket.io');
const Message = require('../modals/Message'); 

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
          origin: '*',
        }
      });
  const users = {}; 

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

   
    socket.on('joinRoom', (userId) => {
      users[userId] = socket.id;
      console.log(`User ${userId} joined room with socket id: ${socket.id}`);
    });

    socket.on('sendMessage', async (message) => {
      try {
    
        await Message.create({
          sender_id: message.sender_id,
          receiver_id: message.receiver_id,
          content: message.content,
        });

        console.log('Message saved to the database');

        // Send the message to the receiver, if the receiver is connected
        const receiverSocketId = users[message.receiver_id];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receiveMessage', message);
          console.log(`Message sent to user ${message.receiver_id}`);
        } else {
          console.log(`Receiver ${message.receiver_id} is not online`);
        }
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    // Handle disconnects
    socket.on('disconnect', () => {
      // Find and remove the socket from the users map when the user disconnects
      for (let userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  return io;
};

module.exports = setupSocket;
