import express from 'express';
import Chat from '../models/chat.js';

const router = express.Router();

export const getChats = async (req, res) => {    
    try {
        const chats = await Chat.find()
        res.json({ data: chats});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getChatByPost = async (req, res) => { 
    const { id } = req.params;
    try {
        const chats = await Chat.find({ postId : id });
        res.json({chats});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createChatMsg = async (req, res) => {
    const { id } = req.params;
    const {userId, message, file} = req.body;
    const chat = new Chat({ postId: id, userId: userId, message: message, file: file })
    try {
        await chat.save();
        res.status(201).json({chat});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/* 
export const deleteChat = async (req, res) => {
    const { id } = req.params;

   // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}
 */

export default router;