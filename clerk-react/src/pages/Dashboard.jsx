import DashboardLayout from "../components/DashboardLayout";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { FiPlus, FiClock } from "react-icons/fi";

export default function Dashboard() {
    const { user } = useUser();
    const [currentTime, setCurrentTime] = useState(new Date());

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

    return (
        <DashboardLayout>
            <div className="p-6">
                {/* Greeting */}
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
                    Hello, {user?.firstName || user?.username || 'User'}
                </h1>

                {/* Cards Container */}
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
            </div>
        </DashboardLayout>
    );
} 