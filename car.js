"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

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
         

            {/* Main Content Area */}
            <div className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="space-y-4">
                          

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

                   
                </div>
            </div>


            
        </div>
    )
}

export default Page