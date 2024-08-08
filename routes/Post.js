// routes/postRoutes.js
import express from 'express';
import { createPost, addComment, getFriendsPosts } from '../controllers/Post.js';

const router = express.Router();

router.post('/create-post', createPost); 
router.post('/add-comment', addComment); 
router.get('/get-posts/:userId', getFriendsPosts)

export default router;
