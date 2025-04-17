import express from 'express';
import { getAllUsers, getUserProfile, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/protect.js';  

const router = express.Router();


router.get('/users', protect, getAllUsers);


router.get('/me', protect, getUserProfile);


router.delete('/users/:id', protect, deleteUser);

export default router;
