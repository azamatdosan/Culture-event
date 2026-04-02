// server/src/controllers/authController.js
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Регистрация нового пользователя
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля' });
    }

    // 1. ПРОВЕРКА: Существует ли уже пользователь с таким email?
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует. Попробуйте войти.' });
    }

    // 2. Хешируем пароль
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ==========================================
    // ЛАЙФХАК: АВТОМАТИЧЕСКАЯ ВЫДАЧА АДМИНА
    // ==========================================
    const role = email === 'dosanazamat51@gmail.com' ? 'admin' : 'user';

    // 3. СОЗДАЕМ пользователя
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role,
      avatar: '' // По умолчанию пустая аватарка
    });

    if (user) {
      // Возвращаем данные и токен сразу (Добавили avatar)
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar, // ТЕПЕРЬ ОТДАЕМ АВАТАРКУ
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Неверные данные пользователя' });
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
};

// @desc    Вход пользователя и получение токена
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Введите email и пароль' });
    }

    // 1. ПРОВЕРКА: Ищем пользователя по email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Пользователь с таким email не найден. Зарегистрируйтесь.' });
    }

    // 2. ПРОВЕРКА: Сравниваем введенный пароль с захешированным в БД
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      // Если всё верно, возвращаем данные (Добавили avatar)
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar, // ТЕПЕРЬ АВАТАРКА НЕ БУДЕТ ПРОПАДАТЬ ПРИ ВХОДЕ
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Неверный пароль. Попробуйте еще раз.' });
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера при входе' });
  }
};

// @desc    Получить данные текущего пользователя
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};