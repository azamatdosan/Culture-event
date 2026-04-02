import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Имя обязательно'],
    },
    email: {
      type: String,
      required: [true, 'Email обязателен'],
    },
    subject: {
      type: String,
      default: 'Без темы',
    },
    message: {
      type: String,
      required: [true, 'Сообщение не может быть пустым'],
    },
    isRead: {
      type: Boolean,
      default: false, // Флаг для админки: прочитано сообщение или нет
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;