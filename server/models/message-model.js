const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('Message', MessageSchema);