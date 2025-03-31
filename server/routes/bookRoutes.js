import express from 'express';
import { getBookData, searchBooks } from '../controllers/bookController.js';

const router = express.Router();

router.get('/:ISBN', getBookData);
router.get('/', searchBooks);

export default router;
