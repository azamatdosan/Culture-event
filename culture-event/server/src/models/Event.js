import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);