const messageModel = require('../models/message-model');

module.exports = {
  async getAllMessages() {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (err) {
      console.error(err);
    }
  },

  async addMessage(username, message) {
    const savedMessage = await messageModel.create({ username, message });
    try { 
      return savedMessage.save();
    } catch (err) {
      console.error(err);
    }
  },
};
