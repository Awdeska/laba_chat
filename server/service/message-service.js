const messageModel = require('../models/message-model');

module.exports = {
  async getAllMessages() {
    try {
      const messages = await messageModel;
      return messages;
    } catch (err) {
      console.error(err);
    }
  },

  async addMessage(user, message) {
    const newMessage = await messageModel.create({ user, message });
    return newMessage;
  }
};
