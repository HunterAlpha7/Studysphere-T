const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    console.error('API URL is not defined in environment variables');
}

// Helper function to ensure date is properly formatted
const formatTodoForSubmission = (todo) => ({
    ...todo,
    deadline: new Date(todo.deadline).toISOString()
});

export const todoService = {
    async getTodos(userId) {
        try {
            const response = await fetch(`${API_URL}/todos/${userId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: 'cors'  // Explicitly set CORS mode
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const todos = await response.json();
            return todos.map(todo => ({
                ...todo,
                deadline: new Date(todo.deadline)
            }));
        } catch (error) {
            console.error('Error fetching todos:', error);
            // Return empty array instead of throwing error
            return [];
        }
    },

    async createTodo(todo) {
        try {
            const response = await fetch(`${API_URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formatTodoForSubmission(todo)),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const savedTodo = await response.json();
            return {
                ...savedTodo,
                deadline: new Date(savedTodo.deadline)
            };
        } catch (error) {
            console.error('Error creating todo:', error);
            throw error;
        }
    },

    async updateTodo(id, completed) {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    },

    async deleteTodo(id) {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    },
}; 