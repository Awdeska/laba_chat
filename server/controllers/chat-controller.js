const messageService = require('./message-service');

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
            const {author, text} = req.body;
            const newMessage = await messageService.addMessage(author, text);
            return res.status(201).json(newMessage);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ChatController();
