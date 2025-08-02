module.exports = function(io) {
  io.on('connection', socket => {
    console.log('🔌 New user connected:', socket.id);

    socket.on('send-message', (data) => {
      // You can later add user-specific or group-specific logic
      io.emit('receive-message', data);
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};
