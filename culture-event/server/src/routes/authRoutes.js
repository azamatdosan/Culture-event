import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Публичные маршруты
router.post('/register', registerUser);
router.post('/login', loginUser);

// Защищенный маршрут (нужен токен)
router.get('/me', protect, getMe);

export default router;