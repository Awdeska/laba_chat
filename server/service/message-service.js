const messageModel = require('../models/message-model');
const ApiError = require("../exceptions/api-error");

module.exports = {
  async getAllMessages() {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (err) {
      throw ApiError.BadRequest('Что-то пошло не так')
    }
  },

  async addMessage(_user, message) {
    const userId = _user._id;
    const newMessage = new messageModel({ userId, message, createdAt: Date.now() });
    try {
      return newMessage.save();
    }
    catch (err) {
      throw ApiError.BadRequest('Что-то пошло не так')
    }
  }
};
