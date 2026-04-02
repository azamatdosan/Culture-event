// server/src/config/db.js
import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async () => {
  try {
    // Пытаемся подключиться к базе данных
    const conn = await mongoose.connect(config.mongoUri);
    
    console.log(`MongoDB успешно подключена: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Ошибка подключения к MongoDB: ${error.message}`);
    
    // Останавливаем процесс Node.js с кодом ошибки (1), 
    // так как без базы данных нашему приложению нет смысла работать
    process.exit(1);
  }
};