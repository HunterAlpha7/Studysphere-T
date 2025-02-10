import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Todo from './src/models/Todo.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Vite's default port
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Function to create default todos for new users
async function createDefaultTodos(clerkId) {
    const defaultTodos = [
        {
            clerkId,
            text: 'Complete study materials',
            completed: false,
            deadline: new Date().toISOString()
        },
        {
            clerkId,
            text: 'Review notes',
            completed: true,
            deadline: new Date().toISOString()
        }
    ];

    try {
        await Todo.insertMany(defaultTodos);
    } catch (error) {
        console.error('Error creating default todos:', error);
    }
}

// Routes
app.get('/api/todos/:clerkId', async (req, res) => {
    try {
        let todos = await Todo.find({ clerkId: req.params.clerkId });

        // If user has no todos, create default ones
        if (todos.length === 0) {
            await createDefaultTodos(req.params.clerkId);
            todos = await Todo.find({ clerkId: req.params.clerkId });
        }

        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            clerkId: req.body.clerkId,
            text: req.body.text,
            deadline: new Date(req.body.deadline).toISOString()
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(400).json({ message: error.message });
    }
});

app.patch('/api/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 