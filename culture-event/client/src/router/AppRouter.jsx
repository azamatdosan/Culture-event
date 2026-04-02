import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import HomePage from '../pages/HomePage';
import EventsPage from '../pages/EventsPage';
import EventDetailsPage from '../pages/EventDetailsPage';
import NewsPage from '../pages/NewsPage';
import NewsDetailsPage from '../pages/NewsDetailsPage';
import FaqPage from '../pages/FaqPage'; // НОВЫЙ ИМПОРТ
import ContactsPage from '../pages/ContactsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import FavoritesPage from '../pages/FavoritesPage';
import CreateEventPage from '../pages/CreateEventPage';

import ProtectedRoute from '../components/protected/ProtectedRoute';
import AdminRoute from '../components/protected/AdminRoute';

import './AppRouter.css';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-transition-wrapper">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} /> 
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailsPage />} /> 
        <Route path="/faq" element={<FaqPage />} /> {/* НОВЫЙ МАРШРУТ */}
        <Route path="/contacts" element={<ContactsPage />} />

        {/* Защита авторизации: если зашел, на эти страницы не пускаем */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} />

        {/* Защищенные маршруты */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
        <Route path="/profile/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        
        {/* Админ */}
        <Route path="/admin/create-event" element={<AdminRoute><CreateEventPage /></AdminRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;