// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipients: [{ type: String, required: true }],
  content: { type: String },
  mediaUrl: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
