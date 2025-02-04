import { useState, useEffect } from 'react';
import DashboardLayout from "../components/DashboardLayout";
import { FiX, FiPlay, FiPause, FiRefreshCw, FiMaximize, FiMinimize } from 'react-icons/fi';

const POMODORO_PRESETS = [
    { name: 'Pomodoro', duration: 25 },
    { name: 'Short Break', duration: 5 },
    { name: 'Long Break', duration: 15 },
];

export default function FocusMode() {
    const [showHero, setShowHero] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes
    const [customDuration, setCustomDuration] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('Pomodoro');
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Handle fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreenNow = document.fullscreenElement !== null;
            setIsFullscreen(isFullscreenNow);
            if (isFullscreenNow) {
                setShowHero(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Timer effect
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            // Play notification sound or show completion message
            new Audio('/pomo-notif.wav').play().catch(() => { }); // Add a notification sound file
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = (minutes = 25) => {
        setIsRunning(false);
        setTimeLeft(minutes * 60);
    };

    const handlePresetClick = (preset) => {
        setSelectedPreset(preset.name);
        resetTimer(preset.duration);
    };

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        const duration = parseInt(customDuration);
        if (duration > 0) {
            setSelectedPreset('Custom');
            resetTimer(duration);
            setCustomDuration('');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                {/* Hero Banner */}
                {showHero && !isFullscreen && (
                    <div className="relative bg-blue-600 text-white p-6 rounded-lg mb-8 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <FiMaximize className="text-2xl" />
                            <div>
                                <h2 className="text-xl font-semibold">Enhanced Focus Mode</h2>
                                <p className="text-blue-100">For the best experience, try using fullscreen mode</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleFullscreen}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Go Fullscreen
                            </button>
                            <button
                                onClick={() => setShowHero(false)}
                                className="text-white hover:text-blue-100"
                            >
                                <FiX className="text-2xl" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Timer Section */}
                <div className="max-w-2xl mx-auto">
                    {/* Fullscreen Toggle Button (always visible) */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={toggleFullscreen}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        >
                            {isFullscreen ? <FiMinimize className="text-xl" /> : <FiMaximize className="text-xl" />}
                        </button>
                    </div>

                    {/* Timer Display */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6 text-center">
                        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-6">
                            {formatTime(timeLeft)}
                        </h1>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={toggleTimer}
                                className={`${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                    } text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors`}
                            >
                                {isRunning ? (
                                    <>
                                        <FiPause /> <span>Pause</span>
                                    </>
                                ) : (
                                    <>
                                        <FiPlay /> <span>Start</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => resetTimer(POMODORO_PRESETS.find(p => p.name === selectedPreset)?.duration || 25)}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                <FiRefreshCw /> <span>Reset</span>
                            </button>
                        </div>
                    </div>

                    {/* Preset Buttons */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {POMODORO_PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => handlePresetClick(preset)}
                                className={`p-4 rounded-lg transition-colors ${selectedPreset === preset.name
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="font-medium">{preset.name}</div>
                                <div className="text-sm opacity-75">{preset.duration} mins</div>
                            </button>
                        ))}
                    </div>

                    {/* Custom Duration Input */}
                    <form onSubmit={handleCustomSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex space-x-4">
                            <input
                                type="number"
                                value={customDuration}
                                onChange={(e) => setCustomDuration(e.target.value)}
                                placeholder="Enter custom duration (mins)"
                                className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                min="1"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Set Custom Timer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
} 