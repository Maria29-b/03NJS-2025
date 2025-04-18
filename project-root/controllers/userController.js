import { getAllUsersList, removeUserById } from './authController.js';
import { protect } from '../middleware/protect.js';
import {User} from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersList(); 
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
    
};

export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

export const deleteUser = async (req, res) => {
    try {
        const deleted = await removeUserById(req.params.id); 
        if (deleted) {
          res.json({ message: 'User deleted' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
};
