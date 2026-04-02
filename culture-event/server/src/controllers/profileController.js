import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // ИСПОЛЬЗУЕМ ПРАВИЛЬНЫЕ ПОЛЯ ИЗ ТВОЕЙ СХЕМЫ
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.avatar = req.body.avatar || user.avatar;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        token: req.headers.authorization.split(' ')[1] 
      });
    } else {
      res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка обновления профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении профиля' });
  }
};