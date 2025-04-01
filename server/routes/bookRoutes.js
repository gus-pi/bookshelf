import express from 'express';
import {
  getBookDataByKey,
  searchBooks,
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/:key', getBookDataByKey);
router.get('/', searchBooks);

export default router;
