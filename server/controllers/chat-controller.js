const messageService = require("../service/message-service");

class ChatController {
    async getMessages(req, res, next) {
        try {
            const messages = await messageService.getMessages();
            return res.status(200).json(messages);
        } catch (err) {
            next(err);
        }
    }

    async addMessage(req, res, next) {
        try {
            const { text, sender } = req.body;
            const newMessage = await messageService.addMessage(text, sender );
            await newMessage.save();
            return res.status(201).json(newMessage);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ChatController();
