import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
    },
  },
  {
    timestamps: true,
  }
);

// Уникальный индекс: один пользователь может добавить одно мероприятие в избранное только один раз
favoriteSchema.index({ user: 1, event: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;