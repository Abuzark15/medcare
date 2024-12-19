const Message = require('../modals/Message'); 


const saveMessage = async (message) => {
  try {
    await Message.create({
      sender_id: message.sender_id,
      receiver_id: message.receiver_id,
      content: message.content,
    });
    console.log('Message saved to the database');
  } catch (error) {
    console.error('Error saving message:', error);
    throw new Error('Failed to save message');
  }
};


const getMessages = async (senderId, receiverId) => {
  try {
    const messages = await Message.findAll({
      where: {
        [Sequelize.Op.or]: [
          { sender_id: senderId, receiver_id: receiverId },
          { sender_id: receiverId, receiver_id: senderId },
        ],
      },
      order: [['timestamp', 'ASC']], 
    });
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

module.exports = { saveMessage, getMessages };
