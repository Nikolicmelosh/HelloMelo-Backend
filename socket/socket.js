const Message = require('../models/Message');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('🔌 New user connected:', socket.id);

    // Receive message from client
    socket.on('send-message', async (data) => {
      try {
        // Save to MongoDB
        const newMessage = new Message({
          sender: data.sender,
          recipients: data.recipients || [],
          content: data.content || '',
          mediaUrl: data.mediaUrl || null
        });

        const savedMessage = await newMessage.save();

        // Broadcast to all connected clients
        io.emit('receive-message', savedMessage);
      } catch (err) {
        console.error('❌ Error saving message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};
