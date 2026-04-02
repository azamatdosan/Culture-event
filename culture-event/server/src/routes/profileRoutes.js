import express from 'express';
// ВОТ ЗДЕСЬ БЫЛА ОШИБКА: мы должны импортировать из profileController, а не из userController
import { updateProfile } from '../controllers/profileController.js'; 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Маршрут: PUT /api/profile
router.put('/', protect, updateProfile);

export default router;