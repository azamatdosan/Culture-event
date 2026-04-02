// server/src/server.js
import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';

const startServer = async () => {
    try {
        // 1. Подключаемся к базе данных MongoDB
        await connectDB();

        // 2. Запускаем прослушивание порта
        const PORT = config.port || 5000;

        app.listen(PORT, () => {
            console.log(`=========================================`);
            console.log(`🚀 Сервер запущен в режиме: ${config.nodeEnv}`);
            console.log(`🔗 URL: http://localhost:${PORT}`);
            console.log(`=========================================`);
        });
    } catch (error) {
        console.error(`Ошибка при запуске сервера: ${error.message}`);
        process.exit(1);
    }
};

// Запуск приложения
startServer();