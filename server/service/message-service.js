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

  async addMessage(_user, message) {
    const userId = _user._id;
    console.log(userId)
    const newMessage = await messageModel.create({ userId, message, createdAt: Date.now() });
    return newMessage;
  }
};
