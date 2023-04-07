const messageService = require('../service/message-service');

class Socket {

    async connectSocket(io) {

        io.on('connection', (socket) => {
            messageService.getAllMessages()
                .then((messages) => {
                    socket.emit('all-messages', messages);
                })
                .catch((err) => {
                    console.error(err);
                });

            socket.on('chat-message', async (data) => {
                const {username, message} = data;
                const newMessage = await messageService.addMessage(username, message);
                io.emit('chat-message', newMessage);
            });

            socket.on('disconnect', () => {
                console.log(`User ${socket.id} disconnected`);
            });
        });
    }
}


module.exports = new Socket();
