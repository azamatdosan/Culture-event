import Event from '../models/Event.js';
import User from '../models/User.js';

// 1. Получить все мероприятия
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// 2. Получить ОДНО мероприятие по ID (для страницы деталей)
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Мероприятие не найдено' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// 3. Создать мероприятие (для админа)
export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании мероприятия' });
  }
};

// 4. КУПИТЬ БИЛЕТ
export const buyTicket = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Мероприятие не найдено' });
    }

    // Проверяем, не куплен ли уже билет (чтобы не дублировать)
    const alreadyHasTicket = user.tickets.find(t => t.event.toString() === event._id.toString());
    if (alreadyHasTicket) {
      return res.status(400).json({ message: 'Билет на это событие уже есть в вашем профиле' });
    }

    // Добавляем билет в массив
    user.tickets.push({ event: event._id });
    await user.save();

    res.status(200).json({ message: 'Билет успешно приобретен!', tickets: user.tickets });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при покупке билета' });
  }
};

// ... твои предыдущие функции (getEvents, getEventById, createEvent, buyTicket)

// 5. УДАЛИТЬ МЕРОПРИЯТИЕ (Только для админа)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Мероприятие не найдено' });
    }
    
    await event.deleteOne();
    res.json({ message: 'Мероприятие успешно удалено' });
  } catch (error) {
    console.error('Ошибка удаления:', error);
    res.status(500).json({ message: 'Ошибка при удалении мероприятия' });
  }
};

// 6. ОБНОВИТЬ МЕРОПРИЯТИЕ (Только для админа)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Мероприятие не найдено' });
    }
    res.json(event);
  } catch (error) {
    console.error('Ошибка обновления:', error);
    res.status(500).json({ message: 'Ошибка при обновлении мероприятия' });
  }
};

// 7. ПОЛУЧИТЬ ВСЕ КУПЛЕННЫЕ БИЛЕТЫ ПОЛЬЗОВАТЕЛЯ
export const getMyTickets = async (req, res) => {
  try {
    // populate('tickets.event') подтягивает все данные мероприятия (картинку, название) по его ID
    const user = await User.findById(req.user._id).populate('tickets.event');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    // Подстраховка: если админ удалил мероприятие, убираем пустые билеты
    const validTickets = user.tickets.filter(t => t.event != null);
    
    // Сортируем так, чтобы новые покупки были сверху
    validTickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    
    res.json(validTickets);
  } catch (error) {
    console.error('Ошибка при получении билетов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// 8. ОТМЕНИТЬ БИЛЕТ
export const cancelTicket = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Удаляем билет из массива
    user.tickets = user.tickets.filter(t => t.event.toString() !== req.params.id.toString());
    await user.save();

    res.json({ message: 'Бронь успешно отменена' });
  } catch (error) {
    console.error('Ошибка при отмене билета:', error);
    res.status(500).json({ message: 'Ошибка при отмене' });
  }
};