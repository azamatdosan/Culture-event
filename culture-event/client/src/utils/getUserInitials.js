/**
 * Получает инициалы из полного имени
 * Например: "Иван Иванов" -> "ИИ", "Алексей" -> "А"
 */
export const getUserInitials = (name) => {
  if (!name || typeof name !== 'string') return '?';

  // Убираем лишние пробелы и разбиваем строку на слова
  const words = name.trim().split(/\s+/);
  
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  // Берем первые буквы первого и второго слова
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};