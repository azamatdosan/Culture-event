import express from 'express';
import { getNews, getNewsById, createNews, deleteNews } from '../controllers/newsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getNews)
  .post(protect, admin, createNews);

router.route('/:id')
  .get(getNewsById)
  .delete(protect, admin, deleteNews); // Добавили эту строку

export default router;