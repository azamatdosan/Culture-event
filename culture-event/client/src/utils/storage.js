/**
 * Безопасное сохранение данных в localStorage
 */
export const setItem = (key, value) => {
  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage:', error);
  }
};

/**
 * Безопасное получение данных из localStorage
 */
export const getItem = (key, parseJson = false) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return parseJson ? JSON.parse(item) : item;
  } catch (error) {
    console.error('Ошибка при чтении из localStorage:', error);
    return null;
  }
};

/**
 * Удаление элемента
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Ошибка при удалении из localStorage:', error);
  }
};