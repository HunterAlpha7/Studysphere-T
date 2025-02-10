import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        index: true // For faster queries
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Todo', todoSchema); 