const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = model('User', MessageSchema);