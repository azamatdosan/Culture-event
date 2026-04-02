import { useState, useEffect, useCallback } from 'react';

export const useFetch = (initialUrl, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url = initialUrl) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Заменить на реальный fetch запрос, когда API будет готово
      // const response = await fetch(url, options);
      // if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
      // const result = await response.json();
      // setData(result);

      // Имитация задержки сети для проверки UI (лоадеров)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Заглушка успешного ответа
      setData([]); 
    } catch (err) {
      setError(err.message || 'Произошла непредвиденная ошибка при загрузке данных');
    } finally {
      setIsLoading(false);
    }
  }, [initialUrl, options]);

  useEffect(() => {
    if (initialUrl) {
      fetchData();
    }
  }, [fetchData, initialUrl]);

  return { data, isLoading, error, refetch: fetchData };
};