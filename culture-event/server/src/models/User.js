import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'Пожалуйста, введите имя'], trim: true },
    lastName: { type: String, required: [true, 'Пожалуйста, введите фамилию'], trim: true },
    email: { 
      type: String, 
      required: [true, 'Пожалуйста, введите email'], 
      unique: true, 
      lowercase: true 
    },
    password: { type: String, required: [true, 'Пожалуйста, введите пароль'], minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: '' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    
    // НОВОЕ ПОЛЕ: Массив билетов
    tickets: [{
      event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
      purchaseDate: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;