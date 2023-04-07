const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('Message', MessageSchema);