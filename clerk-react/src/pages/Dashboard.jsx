import DashboardLayout from "../components/DashboardLayout";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { FiPlus, FiClock, FiTrash2, FiCheck } from "react-icons/fi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Dashboard() {
    const { user } = useUser();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newTodo, setNewTodo] = useState('');
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [todoDeadline, setTodoDeadline] = useState(new Date());
    const [todos, setTodos] = useState([
        { id: 1, text: 'Complete study materials', completed: false, deadline: new Date() },
        { id: 2, text: 'Review notes', completed: true, deadline: new Date() },
    ]);

    // Format date to show day and month in text
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    text: newTodo.trim(),
                    completed: false,
                    deadline: todoDeadline
                }
            ]);
            setNewTodo('');
            setShowAddTodo(false);
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleDateClick = (date) => {
        setTodoDeadline(date);
        setShowAddTodo(true);
    };

    const calendarClassName = `
        react-calendar 
        w-full 
        bg-white dark:bg-gray-800
        border-none 
        font-sans
    `;

    const tileClassName = ({ date, view }) => {
        let baseClasses = "text-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative";

        // For month view
        if (view === 'month') {
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();

            if (isSelected) {
                baseClasses += " bg-blue-500 text-white hover:bg-blue-600";
            } else if (isToday) {
                baseClasses += " font-semibold text-blue-600 dark:text-blue-400";
            }
        }

        return baseClasses;
    };

    const navigationLabel = ({ date, label }) => {
        return (
            <span className="text-gray-700 dark:text-gray-200 font-semibold">
                {label}
            </span>
        );
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                {/* Greeting */}
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
                    Hello, {user?.firstName || user?.username || 'User'}
                </h1>

                {/* Upper Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Create Room Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
                        <button
                            className="w-full h-full flex flex-col items-center justify-center space-y-4"
                            onClick={() => {
                                // TODO: Implement room creation functionality
                                console.log("Create room clicked");
                            }}
                        >
                            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                                <FiPlus className="text-3xl text-blue-600 dark:text-blue-300" />
                            </div>
                            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                Create Room
                            </span>
                        </button>
                    </div>

                    {/* Time Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
                                <FiClock className="text-3xl text-purple-600 dark:text-purple-300" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    Current Time
                                </div>
                                <div className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    {currentTime.toLocaleTimeString()}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {formatDate(currentTime)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Todo Panel */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Reminders</h2>

                        {showAddTodo ? (
                            <form onSubmit={handleAddTodo} className="mb-4">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={newTodo}
                                        onChange={(e) => setNewTodo(e.target.value)}
                                        placeholder="Add a new reminder..."
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        Deadline: {todoDeadline.toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Add
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowAddTodo(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : null}

                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {todos.map(todo => (
                                <div
                                    key={todo.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleTodo(todo.id)}
                                            className={`w-5 h-5 rounded border ${todo.completed
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-gray-300 dark:border-gray-500'
                                                } flex items-center justify-center`}
                                        >
                                            {todo.completed && <FiCheck className="text-white" />}
                                        </button>
                                        <div>
                                            <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-200'}`}>
                                                {todo.text}
                                            </span>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Due: {todo.deadline.toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calendar Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Calendar</h2>
                        <div className="calendar-container max-w-full">
                            <Calendar
                                onChange={handleDateClick}
                                value={selectedDate}
                                className={calendarClassName}
                                tileClassName={tileClassName}
                                navigationLabel={navigationLabel}
                                tileContent={({ date, view }) => {
                                    if (view !== 'month') return null;
                                    const todosForDate = todos.filter(
                                        todo => todo.deadline.toDateString() === date.toDateString()
                                    );
                                    return todosForDate.length > 0 ? (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                                            <div className="h-1.5 w-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                                        </div>
                                    ) : null;
                                }}
                                formatShortWeekday={(locale, date) => {
                                    return date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2);
                                }}
                                next2Label={null}
                                prev2Label={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
} 