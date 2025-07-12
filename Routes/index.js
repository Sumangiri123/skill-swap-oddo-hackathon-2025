import express from 'express';
import { signup, getUsers, createSwap } from '../controllers.js';
const router = express.Router();

router.post('/auth/signup', signup);
router.get('/users', getUsers);
router.post('/requests', createSwap);

export default router;
