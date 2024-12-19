const express = require('express');
const router = express.Router();
const { saveMessage, getMessages } = require('../controller/chatController'); 

router.get('/:senderId/:receiverId', async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await getMessages(senderId, receiverId);
    res.json(messages); 
  } catch (error) {
    console.error('Error in fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});


router.post('/send', async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  try {
    const message = { sender_id, receiver_id, content };
    await saveMessage(message); 
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;
