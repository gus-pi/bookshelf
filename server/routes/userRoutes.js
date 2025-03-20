import express from 'express';
import {
  getAllUsers,
  getUser,
  registerUser,
  deleteUser,
  addBook,
  removeBook,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/:id/books', addBook);
router.delete('/:id/books', removeBook);

export default router;
