import express from 'express';
import { createChatMsg, getChatByPost, getChats } from '../controllers/chat.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', auth, getChats);
router.get('/:id', getChatByPost);
router.post('/:id', auth, createChatMsg);

// router.delete('/:id', auth, deletePost);

export default router;