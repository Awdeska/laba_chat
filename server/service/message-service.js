const messageModel = require('../models/message-model');

module.exports = {
  async getAllMessages() {
    try {
      const messages = await messageModel.find().sort({ createdAt: 'asc' });
      return messages;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async addMessage(username, message) {
    const newMessage = new messageModel({ username, message });
    try {
      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
