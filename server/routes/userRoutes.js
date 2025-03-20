import express from 'express';
import {
  getAllUsers,
  getUser,
  registerUser,
  deleteUser,
  addBook,
  removeBook,
  loginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/:id/books', addBook);
router.delete('/:id/books', removeBook);

export default router;
