import express from 'express';
import { acceptFriendRequest, rejectFriendRequest, sendFriendRequest } from '../controllers/User.js';

const router = express.Router();

router.post('/send', sendFriendRequest);
router.post('/accept', acceptFriendRequest);
router.post('/reject', rejectFriendRequest);

export default router;