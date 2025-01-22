"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from 'framer-motion';
import {
    BarChart2,
    ChevronLeft,
    FileText,
    Flame,
    Home,
    LayoutDashboard,
    MessageSquare,
    Package,
    Settings,
    ShoppingCart,
    Store,
    Users
} from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainMenuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', count: '3,129', href: '/orders' },
    { icon: <Package size={20} />, label: 'Products', href: '/products' },
    { icon: <Users size={20} />, label: 'Customers', href: '/customers' },
    { icon: <FileText size={20} />, label: 'Content', href: '/content' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', href: '/analytics' },
    { icon: <MessageSquare size={20} />, label: 'Reports', href: '/reports' },
];

const salesChannels = [
    { icon: <Store size={20} />, label: 'Online Store', href: '/store' }
];

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();

    const sidebarVariants = {
        expanded: { width: "250px" },
        collapsed: { width: "80px" }
    };

    const labelVariants = {
        expanded: { opacity: 1, display: "block", transition: { delay: 0.1 } },
        collapsed: { opacity: 0, display: "none", transition: { duration: 0.1 } }
    };

    const isCurrentPath = (href) => {
        if (href === '/') return pathname === href;
        return pathname.startsWith(href);
    };

    const NavItem = ({ icon, label, count, href }) => (
        <Link href={href} className="w-full">
            <Button
                variant="ghost"
                className={`
                    group relative h-12 w-full
                    hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/80
                    dark:hover:from-gray-800/40 dark:hover:to-gray-800/60
                    transition-all duration-300 ease-in-out
                    rounded-lg
                    ${isExpanded ? 'justify-start px-4' : 'justify-center px-0'}
                    ${isCurrentPath(href) ? 'bg-[#fafafa] shadow-sm' : ''}
                `}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className={`
                        text-[#4a4a4a] dark:text-gray-400
                        group-hover:text-gray-800 dark:group-hover:text-gray-200
                        flex items-center
                        ${isExpanded ? 'mr-3' : 'mr-0'}
                        ${isCurrentPath(href) ? 'text-gray-800 dark:text-gray-200' : ''}
                    `}
                >
                    {icon}
                </motion.div>
                <motion.span
                    variants={labelVariants}
                    className="flex-1 text-left text-[15px] font-medium text-[#4a4a4a] dark:text-gray-300
                             group-hover:text-gray-900 dark:group-hover:text-gray-100"
                >
                    {label}
                </motion.span>
                {count && (
                    <motion.span
                        variants={labelVariants}
                        className="text-sm text-[#4a4a4a] dark:text-gray-400 font-medium
                                 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
                    >
                        {count}
                    </motion.span>
                )}
            </Button>
        </Link>
    );

    return (
        <div className="sticky top-0">
            <AnimatePresence mode="wait">
                <motion.aside
                    initial="expanded"
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={sidebarVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="
                        flex flex-col p-4
                        bg-[#ebebeb]
                        dark:from-gray-900 dark:to-gray-900/95
                        border-r border-gray-200/80 dark:border-gray-800/80
                        h-screen
                        relative
                        shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                        dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
                    "
                >
                    <div className="flex items-center justify-between mb-8">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Link href="/">
                                <div className={`
                                    group flex items-center relative h-12
                                    transition-all duration-300
                                    rounded-lg w-full
                                    ${isExpanded ? 'justify-start px-4' : 'justify-center px-0'}
                                `}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                        className={`
                                            text-[#4a4a4a]  dark:text-gray-100
                                            flex items-center
                                            ${isExpanded ? 'mr-3' : 'mr-0 ml-3'}
                                        `}
                                    >
                                        <Flame size={24} className='text-red-500 dark:text-gray-100' />
                                    </motion.div>
                                    <motion.span
                                        variants={labelVariants}
                                        className="font-semibold text-xl text-[#4a4a4a] dark:text-gray-100"
                                    >
                                        mart
                                    </motion.span>
                                </div>
                            </Link>
                        </motion.div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="
                            
                                rounded-full 
                                border border-gray-200/80 dark:border-gray-700/80
                                hover:bg-gray-100/80 dark:hover:bg-gray-800/80
                                transition-all duration-300
                                absolute -right-3 top-6
                                bg-gradient-to-br from-white to-gray-50
                                dark:from-gray-900 dark:to-gray-800
                                shadow-sm
                            "
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: isExpanded ? 0 : 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronLeft size={16} className="text-[#4a4a4a] dark:text-gray-400" />
                            </motion.div>
                        </Button>
                    </div>

                    <nav className="flex flex-col gap-1.5 flex-1">
                        {mainMenuItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <NavItem {...item} />
                            </motion.div>
                        ))}

                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-8 relative"
                            >
                                <div className="text-sm font-medium text-[#4a4a4a] dark:text-gray-400 mb-3 px-4
                                              bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent
                                              py-2 rounded-md">
                                    Sales channels
                                </div>
                                {salesChannels.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: (mainMenuItems.length + index) * 0.1 }}
                                    >
                                        <NavItem {...item} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 pt-4 border-t border-gray-200/80 dark:border-gray-800/80"
                    >
                        <NavItem
                            icon={<Settings size={20} />}
                            label="Settings"
                            href="/settings"
                        />
                    </motion.div>
                </motion.aside>
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;