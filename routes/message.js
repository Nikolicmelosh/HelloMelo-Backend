const router = require('express').Router();
const Message = require('../models/Message');

// Send a message
router.post('/send', async (req, res) => {
  try {
    const { sender, recipients, content, mediaUrl } = req.body;

    if (!sender || !recipients || recipients.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMessage = new Message({ sender, recipients, content, mediaUrl });
    await newMessage.save();

    res.json({ message: 'Message sent', data: newMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get full chat history for user (sent and received)
router.get('/history', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const messages = await Message.find({
      $or: [
        { sender: username },
        { recipients: { $in: [username] } }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
