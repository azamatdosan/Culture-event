export const admin = (req, res, next) => {
  // Проверяем, существует ли объект пользователя и равна ли его роль 'admin'
  if (req.user && req.user.role === 'admin') {
    next(); // Пропускаем
  } else {
    res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора.' });
  }
};