import News from '../models/News.js';

// Получить ОДНУ новость по ID
export const getNewsById = async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Новость не найдена' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const createNews = async(req, res) => {
    try {
        const news = new News(req.body);
        const createdNews = await news.save();
        res.status(201).json(createdNews);
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при создании новости' });
    }
};

export const getNews = async(req, res) => {
    try {
        const news = await News.find({}).sort({ createdAt: -1 }); // Свежие сверху
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};
// Удалить новость
export const deleteNews = async (req, res) => {
  try {
    const article = await News.findById(req.params.id);

    if (article) {
      await article.deleteOne();
      res.json({ message: 'Новость успешно удалена' });
    } else {
      res.status(404).json({ message: 'Новость не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при удалении новости:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};