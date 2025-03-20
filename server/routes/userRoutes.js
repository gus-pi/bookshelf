import express from 'express';
import {
  getAllUsers,
  getUser,
  registerUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);

export default router;
