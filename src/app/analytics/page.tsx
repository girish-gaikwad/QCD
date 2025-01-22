"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

// Metrics data
const metrics = [
    { id: "atc", label: "ATC" },
    { id: "clicks", label: "Clicks" },
    { id: "cpm", label: "CPM" },
    { id: "ctr", label: "CTR" },
    { id: "impressions", label: "Impressions" },
    { id: "orders", label: "Orders" },
    { id: "other_skus", label: "Other SKUs" },
    { id: "revenue", label: "Revenue" },
    { id: "roas", label: "ROAS" },
    { id: "same_skus", label: "Same SKUs" },
    { id: "spend", label: "Spend" },
];

const dimensions = [
    { id: "productid", label: "Product Id" },
    { id: "productname", label: "Product Name" },
    { id: "category", label: "Category" },
];
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
        <div className='flex-1 overflow-auto relative z-10'>
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

                                <Tabs defaultValue="metrics" className="w-[250px]  lg:sticky lg:top-20">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="metrics">Metrics</TabsTrigger>
                                        <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="metrics">
                                        <Card>

                                            <CardContent className="space-y-3 py-5 ">
                                                {metrics.map((metric) => (
                                                    <div key={metric.id} className="flex items-center space-x-2">
                                                        <Checkbox id={metric.id} />
                                                        <label
                                                            htmlFor="terms"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {metric.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </CardContent>

                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="dimensions">
                                        <Card>
                                            <CardContent className="space-y-3 py-5 ">
                                                {dimensions.map((dimension) => (
                                                    <div key={dimension.id} className="flex items-center space-x-2">
                                                        <Checkbox id={dimension.id} />
                                                        <label
                                                            htmlFor="terms"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {dimension.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </CardContent>

                                        </Card>
                                    </TabsContent>

                                    <Button className="w-full my-3">Apply</Button>
                                </Tabs>
                            </motion.div>

                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Page