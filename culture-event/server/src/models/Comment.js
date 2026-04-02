import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // Оставляем твою старую связь с мероприятиями
    event: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event' 
    },
    // Добавляем новую связь с новостями
    news: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'News' 
    },
    text: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);