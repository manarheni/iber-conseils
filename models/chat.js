import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    postId: {type: String, required: true},
    message: {type: String, default: null},
    file: {type: String, default: null},
}, {
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;