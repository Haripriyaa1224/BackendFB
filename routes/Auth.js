import express from 'express';
import { test } from '../controllers/Auth.js';
import { register } from '../controllers/Auth.js';
const router = express.Router();

router.get("/test", test);
router.post("/register", register);

export default router;