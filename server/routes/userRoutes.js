import express from 'express';
import {
  getAllUsers,
  getUser,
  registerUser,
  deleteUser,
  addBook,
  removeBook,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUser,
  searchUser,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.put('/update', protect, updateUser);
router.get('/', getAllUsers);
router.get('/search', searchUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/:id/books', protect, addBook);
router.delete('/:id/books', protect, removeBook);
router.get('/auth/profile', protect, getUserProfile);

export default router;
