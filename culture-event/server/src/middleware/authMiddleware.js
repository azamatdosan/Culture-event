import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/env.js';

export const protect = async(req, res, next) => {
    let token;

    // Проверяем, есть ли заголовок Authorization и начинается ли он с 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Извлекаем токен (убираем слово "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // Расшифровываем токен с помощью нашего секретного ключа
            const decoded = jwt.verify(token, config.jwtSecret);

            // Находим пользователя в БД по ID из токена и убираем пароль из результата
            req.user = await User.findById(decoded.id).select('-password');

            // Передаем управление дальше (в контроллер)
            next();
        } catch (error) {
            console.error('Ошибка проверки токена:', error.message);
            res.status(401).json({ message: 'Не авторизован, токен недействителен' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Не авторизован, токен отсутствует' });
    }
};

// ... существующий код protect ...

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора.' });
    }
};