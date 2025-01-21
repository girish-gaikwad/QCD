"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';

function Page() {
    const data = {
        total: '₹4.9L',
        breakdown: [
            { country: 'India', value: '₹4.5L', color: 'bg-blue-500' },
            { country: 'Australia', value: '₹30.2T', color: 'bg-purple-500' },
            { country: 'United States', value: '₹11.6T', color: 'bg-blue-400' }
        ]
    };

    const tableHeaders = ['Billing country', 'Orders', 'Gross sales', 'Discounts', 'Returns', 'Net sales', 'Shipping charges'];
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="min-h-screen w-full">
            {/* Header Controls - Fixed at top */}
            <div className="sticky top-0 bg-gray-50 z-20 p-4 border-b">
                <div className="flex justify-between items-center max-w-full">
                    <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white text-[14px] text-center rounded-md p-1 shadow whitespace-nowrap"
                        >
                            22 Dec 2024-21 Jan 2025
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white text-[14px] text-center rounded-md p-1 shadow whitespace-nowrap"
                        >
                            No comparison
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white text-[14px] text-center rounded-md p-1 shadow whitespace-nowrap"
                        >
                            Group by: None
                        </motion.div>
                    </div>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-md p-1 shadow cursor-pointer ml-2 flex-shrink-0"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <SlidersHorizontal size={20} />
                    </motion.button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="space-y-4">
                            <Card className="p-4 h-96 bg-white rounded-md shadow">
                                <h2 className="font-bold mb-4">Total sales</h2>
                            </Card>

                            <Card className="p-4">
                                <motion.div
                                    className="overflow-x-auto"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <table className="w-full min-w-[800px]">
                                        <thead>
                                            <tr>
                                                {tableHeaders.map(header => (
                                                    <th key={header} className="text-left p-2 border-b">{header}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array(10).fill(0).map((_, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td className="p-2">Summary {rowIndex + 1}</td>
                                                    {Array(6).fill(0).map((_, i) => (
                                                        <td key={i} className="p-2">
                                                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            </Card>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                className="lg:w-64 w-full lg:sticky lg:top-20"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="p-4 lg:sticky lg:top-20">
                                    <h2 className="font-bold mb-4">Metrics</h2>
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {['Orders', 'Gross sales', 'Discounts', 'Returns', 'Net sales', 'Shipping charges', 'Taxes'].map((item) => (
                                            <motion.div
                                                key={item}
                                                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {item}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Page