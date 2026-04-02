import express from 'express';
import { 
  createEvent, 
  getEvents, 
  getEventById, 
  buyTicket,
  deleteEvent,
  updateEvent,
  getMyTickets, // <--- НОВОЕ
  cancelTicket  // <--- НОВОЕ
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// СПЕЦИФИЧНЫЕ МАРШРУТЫ ДОЛЖНЫ БЫТЬ ВЫШЕ ДИНАМИЧЕСКИХ (/:id)
router.get('/my/tickets', protect, getMyTickets);

router.route('/')
    .get(getEvents)
    .post(protect, admin, createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, admin, updateEvent)
    .delete(protect, admin, deleteEvent);

router.post('/:id/buy', protect, buyTicket);
router.delete('/:id/ticket', protect, cancelTicket); // <--- Маршрут для отмены

export default router;