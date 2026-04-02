import express from 'express';
// Берем ВСЕ функции из контроллера
import { getCommentsByEvent, getComments, addComment, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. Получить комментарии для мероприятия
router.get('/event/:eventId', getCommentsByEvent);

// 2. Получить комментарии для новости
router.get('/:newsId', getComments);

// 3. Оставить комментарий (универсально для всего)
router.post('/', protect, addComment);

// 4. Удалить комментарий
router.delete('/:id', protect, deleteComment);

export default router;