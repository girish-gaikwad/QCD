"use client"
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from 'framer-motion';
import {
    BarChart2,
    ChevronLeft,
    FileText,
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
import { useState } from 'react';

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
        expanded: { width: "256px" },
        collapsed: { width: "80px" }
    };

    const labelVariants = {
        expanded: {
            opacity: 1,
            display: "block",
            transition: { delay: 0.1 }
        },
        collapsed: {
            opacity: 0,
            display: "none",
            transition: { duration: 0.1 }
        }
    };

    const isCurrentPath = (href) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const NavItem = ({ icon, label, count, href }) => (
        <Link href={href} className="w-full">
            <Button
                variant="ghost"
                className={`
                    group relative h-12 w-full
                    hover:bg-accent hover:text-accent-foreground
                    transition-colors duration-300
                    rounded-lg
                    ${isExpanded ? 'justify-start px-3' : 'justify-center px-0'}
                    ${isCurrentPath(href) ? 'bg-accent/50' : ''}
                `}
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className={`
                        text-muted-foreground group-hover:text-primary
                        flex items-center
                        ${isExpanded ? 'mr-4' : 'mr-0'}
                        ${isCurrentPath(href) ? 'text-primary' : ''}
                    `}
                >
                    {icon}
                </motion.div>
                <motion.span
                    variants={labelVariants}
                    className="flex-1 text-left text-[16px] font-medium"
                >
                    {label}
                </motion.span>
                {count && (
                    <motion.span
                        variants={labelVariants}
                        className="text-sm text-muted-foreground"
                    >
                        {count}
                    </motion.span>
                )}
            </Button>
        </Link>
    );

    return (
        <div className=" sticky top-0">
            <AnimatePresence mode="wait">
                <motion.aside
                    initial="expanded"
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={sidebarVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="
                        flex flex-col p-4
                        bg-background border-r border-border/40
                        h-screen shadow-sm
                        relative
                    "
                >
                    <div className="flex items-center justify-between mb-8">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Link href="/">
                                <div
                                    className={`
                                        group flex items-center relative h-12
                                        transition-colors duration-300
                                        rounded-lg w-full
                                        ${isExpanded ? 'justify-start px-3' : 'justify-center px-0'}
                                    `}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.2 }}
                                        className={`
                                            text-primary
                                            flex items-center
                                            ${isExpanded ? 'mr-4' : 'mr-0 ml-3'}
                                        `}
                                    >
                                        <LayoutDashboard />
                                    </motion.div>
                                    <motion.span
                                        variants={labelVariants}
                                        className="font-semibold text-xl text-primary"
                                    >
                                        Dashboard
                                    </motion.span>
                                </div>
                            </Link>
                        </motion.div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="
                                rounded-full border border-border/50
                                hover:bg-accent hover:text-accent-foreground
                                transition-all duration-300
                                absolute -right-3 top-6
                                bg-background shadow-sm
                            "
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: isExpanded ? 0 : 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronLeft size={18} />
                            </motion.div>
                        </Button>
                    </div>

                    <nav className="flex flex-col gap-2 flex-1">
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
                                className="mt-8"
                            >
                                <div className="text-sm font-medium text-muted-foreground mb-2">
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
                        className="mt-4"
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