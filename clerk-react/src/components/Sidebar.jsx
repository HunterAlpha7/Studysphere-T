import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    RiDashboardLine,
    RiTeamLine,
    RiTimerLine,
    RiCustomerService2Line,
    RiMenuFoldLine,
    RiMenuUnfoldLine
} from 'react-icons/ri';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: <RiDashboardLine className="text-xl" />
        },
        {
            path: '/study-groups',
            name: 'Study Groups',
            icon: <RiTeamLine className="text-xl" />
        },
        {
            path: '/focus-mode',
            name: 'Focus Mode',
            icon: <RiTimerLine className="text-xl" />
        },
        {
            path: '/contact',
            name: 'Contact Us',
            icon: <RiCustomerService2Line className="text-xl" />
        }
    ];

    return (
        <div className={`min-h-screen bg-gray-800 text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
            <div className="p-4 flex justify-end">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-300 hover:text-white"
                    title={isExpanded ? "Collapse menu" : "Expand menu"}
                >
                    {isExpanded ?
                        <RiMenuFoldLine className="text-xl" /> :
                        <RiMenuUnfoldLine className="text-xl" />
                    }
                </button>
            </div>

            <nav className="mt-8">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={!isExpanded ? item.name : ""}
                            className={`
                                flex items-center px-4 py-3 transition-colors
                                ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}
                                ${isActive && item.path === '/dashboard' ? 'cursor-default pointer-events-none' : ''}
                                ${!isExpanded ? 'justify-center' : ''}
                            `}
                        >
                            <span className="inline-flex">{item.icon}</span>
                            {isExpanded && (
                                <span className="ml-3">{item.name}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
} 