import express from 'express';
import { getAllUsers, getUserProfile, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/protect.js'; 
import { register, login } from '../controllers/authController.js'; 
import { getMe } from '../controllers/authController.js';

 

const router = express.Router(); 


router.post('/register', register);
router.post('/login', login);



router.get('/users', protect, getAllUsers);
router.get('/me', protect, getUserProfile);
router.delete('/users/:id', protect, deleteUser);

export default router;  