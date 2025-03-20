import express from 'express';
import {
  getAllUsers,
  getUser,
  registerUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;
