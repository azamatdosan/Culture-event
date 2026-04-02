// server/src/config/env.js
import dotenv from 'dotenv';

// Загружаем переменные из файла .env в process.env
dotenv.config();

// Проверяем наличие критически важных переменных
if (!process.env.MONGO_URI) {
  console.error('КРИТИЧЕСКАЯ ОШИБКА: MONGO_URI не определен в файле .env');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('КРИТИЧЕСКАЯ ОШИБКА: JWT_SECRET не определен в файле .env');
  process.exit(1);
}

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
};