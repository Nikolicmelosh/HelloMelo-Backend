const Message = require('../models/Message');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('🔌 New user connected:', socket.id);

    // When message is received from client
    socket.on('chat-message', async (data) => {
      try {
        // Save to MongoDB
        const newMessage = new Message({
          sender: data.sender,
          recipients: data.recipients ? data.recipients.split(',') : [],
          content: data.content || '',
          mediaUrl: data.mediaUrl || null,
          timestamp: data.timestamp || new Date().toISOString()
        });

        const savedMessage = await newMessage.save();

        // Emit to all connected clients (real-time)
        io.emit('chat-message', savedMessage);
      } catch (err) {
        console.error('❌ Error saving message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};
