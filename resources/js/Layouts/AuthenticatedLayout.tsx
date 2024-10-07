import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Sidebar from '@/Components/Sidebar';
import { LogOut, Menu, X, Bell, MessageSquare } from 'lucide-react';

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingSidebar, setShowingSidebar] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3); // Example count
    const [messageCount, setMessageCount] = useState(2); // Example count

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center shrink-0">
                                <Link href="/">
                                    <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {/* Notifications */}
                            <div className="relative mr-3">
                                <button className="relative p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500">
                                    <Bell className="w-6 h-6" />
                                    {notificationCount > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                                            {notificationCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="relative mr-3">
                                <button className="relative p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500">
                                    <MessageSquare className="w-6 h-6" />
                                    {messageCount > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-blue-500 rounded-full">
                                            {messageCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Déconnexion
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center -me-2 sm:hidden">
                            <button
                                onClick={() => setShowingSidebar((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                {showingSidebar ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex h-screen overflow-hidden">
                <Sidebar 
                    className={`${showingSidebar ? 'block' : 'hidden'} sm:block flex-shrink-0 border-r border-gray-200 bg-white`} 
                    user={user}
                />
                
                <div className="flex-1 overflow-auto">
                    {header && (
                        <header className="bg-white shadow">
                            <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    <main className="p-4">{children}</main>
                </div>
            </div>
        </div>
    );
}