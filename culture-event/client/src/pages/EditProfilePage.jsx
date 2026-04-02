import React from 'react';
import { useAuth } from '../hooks/useAuth';
import ProfileMenu from '../components/profile/ProfileMenu';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import ProfileAvatarUpload from '../components/profile/ProfileAvatarUpload';
import './EditProfilePage.css'; // Можно использовать стили ProfilePage.css

const EditProfilePage = () => {
  const { user, logout } = useAuth();

  const handleSave = (updatedData) => {
    console.log('Сохранение на сервер:', updatedData);
    alert('Данные успешно обновлены!'); // Временно
  };

  return (
    <div className="profile-page container">
      <h1 className="page-title">Редактирование профиля</h1>
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <ProfileMenu onLogout={logout} />
        </aside>
        <main className="profile-content">
          <div className="edit-form-wrapper">
            <ProfileAvatarUpload currentAvatar={user?.avatar} />
            <ProfileEditForm initialData={user} onSave={handleSave} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfilePage;