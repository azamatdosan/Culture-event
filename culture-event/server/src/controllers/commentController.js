import Comment from '../models/Comment.js';

// --- 1. ТВОЙ СТАРЫЙ КОД (Для мероприятий) ---
export const getCommentsByEvent = async (req, res) => {
    try {
        const comments = await Comment.find({ event: req.params.eventId })
            .populate('user', 'firstName lastName avatar')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Не найдено' });
        await comment.deleteOne();
        res.json({ message: 'Комментарий удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// --- 2. НАШ НОВЫЙ КОД (Для новостей) ---
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ news: req.params.newsId })
            .populate('user', 'firstName lastName avatar')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// --- 3. УНИВЕРСАЛЬНОЕ ДОБАВЛЕНИЕ ---
export const addComment = async (req, res) => {
    try {
        const { newsId, eventId, text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Нет текста' });
        }

        const comment = new Comment({
            user: req.user._id,
            text: text
        });

        // Если прислали newsId - крепим к новости. Если eventId - к мероприятию.
        if (newsId) comment.news = newsId;
        if (eventId) comment.event = eventId;

        const savedComment = await comment.save();
        const populatedComment = await Comment.findById(savedComment._id).populate('user', 'firstName lastName avatar');

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении комментария' });
    }
};