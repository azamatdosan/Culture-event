// server/src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Импорт мидлваров
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Импорт всех роутов
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// 1. СОЗДАЕМ ПРИЛОЖЕНИЕ (Строго в первую очередь!)
const app = express();

// Настройка пути для статических файлов
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. ГЛОБАЛЬНЫЕ МИДЛВАРЫ
app.use(cors()); // Разрешаем кросс-доменные запросы

// ВАЖНО: Разрешаем серверу принимать данные весом до 10 мегабайт (ОДИН РАЗ)
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 3. Раздача статических файлов (папка uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. ПОДКЛЮЧЕНИЕ МАРШРУТОВ API
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/profile', profileRoutes);

// Тестовый роут для проверки работоспособности
app.get('/', (req, res) => {
  res.send('API Culture Event работает...');
});

// 5. Обработка ошибок (должны идти ПОСЛЕ всех роутов)
app.use(notFound);
app.use(errorHandler);

export default app;