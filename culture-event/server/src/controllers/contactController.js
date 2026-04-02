import ContactMessage from '../models/ContactMessage.js';

// @desc    Отправить сообщение из формы контактов
// @route   POST /api/contacts
// @access  Public
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля' });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({ message: 'Ваше сообщение успешно отправлено!', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при отправке сообщения', error: error.message });
  }
};