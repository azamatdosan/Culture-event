import User from '../models/User.js';

// 1. ПОЛУЧИТЬ ВСЁ ИЗБРАННОЕ
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    // Подстраховка: убираем пустые карточки (если вдруг афишу удалили из базы)
    const validFavorites = user.favorites.filter(event => event != null);
    
    res.json(validFavorites);
  } catch (error) {
    console.error('Ошибка при получении избранного:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// 2. ДОБАВИТЬ ИЛИ УДАЛИТЬ (Надежный переключатель)
export const toggleFavorite = async (req, res) => {
  try {
    const { eventId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // ИСПРАВЛЕНИЕ ОШИБКИ: Сравниваем ID строго как строки!
    const isFavorite = user.favorites.some(id => id.toString() === eventId.toString());

    if (isFavorite) {
      // Удаляем
      user.favorites = user.favorites.filter(id => id.toString() !== eventId.toString());
    } else {
      // Добавляем
      user.favorites.push(eventId);
    }

    await user.save();
    
    res.json({ 
      message: isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное', 
      favorites: user.favorites 
    });
  } catch (error) {
    console.error('Ошибка обновления избранного:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};