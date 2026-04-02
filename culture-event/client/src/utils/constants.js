// Категории мероприятий для фильтров
export const EVENT_CATEGORIES = [
  { value: 'all', label: 'Все мероприятия' },
  { value: 'concert', label: 'Концерты' },
  { value: 'theater', label: 'Театр' },
  { value: 'exhibition', label: 'Выставки' },
  { value: 'festival', label: 'Фестивали' },
  { value: 'masterclass', label: 'Мастер-классы' }
];

// Роли пользователей
export const USER_ROLES = {
  GUEST: 'guest',
  USER: 'user',
  ADMIN: 'admin'
};

// Ключи для localStorage
export const STORAGE_KEYS = {
  TOKEN: 'token',
  THEME: 'theme'
};