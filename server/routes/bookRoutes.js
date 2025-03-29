import express from 'express';
import { getBookData } from '../controllers/bookController.js';

const router = express.Router();

router.get('/:ISBN', getBookData);

export default router;
