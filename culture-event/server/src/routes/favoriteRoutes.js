import express from 'express';
import { getFavorites, toggleFavorite } from '../controllers/favoriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/favorites - получить список
// POST /api/favorites - добавить/удалить
router.route('/')
  .get(protect, getFavorites)
  .post(protect, toggleFavorite);

export default router;