import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        // ДОБАВЛЯЕМ ЭТОТ БЛОК НАСТРОЕК
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Укажи здесь порт твоего бэкенда! (обычно 5000 или 3000)
                changeOrigin: true,
            },
        },
    },
});