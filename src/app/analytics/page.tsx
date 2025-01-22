"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "../components/datepicker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    type VisibleColumns = {
        atc: boolean;
        orders: boolean;
        revenue: boolean;
        clicks: boolean;
        impressions: boolean;
        other_skus: boolean;
        cpm: boolean;
        same_skus: boolean;
        spend: boolean;
        ctr: boolean;
        productid: boolean;
        productname: boolean;
        category: boolean;
    };
    type MetricsState = {
        [key: string]: boolean;
    };
    type DimensionState = {
        [key: string]: boolean;
    };
    interface Product {
        productid: string;
        productname: string;
        brandid: string;
        brandname: string;
        atc: number;
        campaign_id: number;
        campaign_name: string;
        category: string;
        clicks: number;
        cpm: number;
        ctr: number;
        impressions: number;
        orders: number;
        other_skus: number;
        revenue: number;
        roas: number;
        same_skus: number;
        spend: number;
        processed_date: string;
    }
    interface TableHeader {
        key: string;
        label: string;
    }
    const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
        atc: false,
        orders: false,
        revenue: false,
        clicks: false,
        impressions: false,
        other_skus: false,
        cpm: false,
        same_skus: false,
        spend: false,
        ctr: false,
        productid: false,
        productname: false,
        category: false,
    });

    const [selectedMetrics, setSelectedMetrics] = useState<MetricsState>({
        atc: false,
        orders: false,
        revenue: false,
        clicks: false,
        impressions: false,
        other_skus: false,
        cpm: false,
        same_skus: false,
        spend: false,
        ctr: false,
    });

    const [selectedDimensions, setSelectedDimensions] = useState<DimensionState>({
        productid: false,
        productname: false,
        category: false,
    });

    const data: Product[] = [
        {
            productid: "f2cd647c-239f-4258-b8cc-943131a355b1",
            productname:
                "Lifelong 2-in1 Egg Boiler and Poacher 500-Watt (Black), Boil 8 eggs, Poach 4 eggs, 3 Boiling Modes",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 1,
            campaign_id: 2023706,
            campaign_name: "Lifelong-Electronics PCA Jan",
            category: "Kitchen Appliances",
            clicks: 18,
            cpm: 700,
            ctr: 0.79,
            impressions: 2287,
            orders: 6,
            other_skus: 6,
            revenue: 16588,
            roas: 10.36,
            same_skus: 0,
            spend: 1601,
            processed_date: "2025-01-18",
        },
        {
            productid: "cda0ea54-a604-45bb-82c5-e65c174a12d4",
            productname:
                "Lifelong Minipix Smart Projector (3500 lm) Portable Android 720p HD Native with 4K, Upto 120-inch Display",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023706,
            campaign_name: "Lifelong-Electronics PCA Jan",
            category: "Home Appliances",
            clicks: 7,
            cpm: 700,
            ctr: 0.47,
            impressions: 1491,
            orders: 5,
            other_skus: 5,
            revenue: 13499,
            roas: 12.93,
            same_skus: 0,
            spend: 1044,
            processed_date: "2025-01-18",
        },
        {
            productid: "6dd9466e-8362-4469-8b8e-cd88bac29467",
            productname:
                "Lifelong Rechargeable Gun Massager For Pain Relief With 6 Speed Setting For Muscle Massage(Llgm117)",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 1,
            campaign_id: 2023706,
            campaign_name: "Lifelong-Electronics PCA Jan",
            category: "Massagers & Weighing Machines",
            clicks: 8,
            cpm: 700,
            ctr: 0.83,
            impressions: 967,
            orders: 1,
            other_skus: 1,
            revenue: 16300,
            roas: 24.08,
            same_skus: 0,
            spend: 677,
            processed_date: "2025-01-18",
        },
        {
            productid: "65bcded1-4d5a-42f5-bf4a-5a1d449ae3c9",
            productname:
                "Lifelong Protein Shaker With Extra Compartment Bpa Free Sipper Bottle-500Ml - Llshb02 Black Plastic",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023715,
            campaign_name: "Lifelong- Fitness PCA Jan",
            category: "Activities & Sports",
            clicks: 5,
            cpm: 650,
            ctr: 0.7,
            impressions: 717,
            orders: 2,
            other_skus: 2,
            revenue: 400,
            roas: 0.86,
            same_skus: 0,
            spend: 466,
            processed_date: "2025-01-18",
        },
        {
            productid: "a3e220aa-f32d-46ce-820e-a6e91d2c5866",
            productname:
                "Lifelong Washing Machine Stand - Adjustable Metal Kitchen Trolley With Rubber Pads Black & White",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023708,
            campaign_name: "Lifelong- Home Needs PCA Jan",
            category: "Utility & Organizer",
            clicks: 1,
            cpm: 599,
            ctr: 0.22,
            impressions: 449,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 269,
            processed_date: "2025-01-18",
        },
        {
            productid: "17fc876e-e109-4645-bd66-2590a31cede0",
            productname:
                "Lifelong Adjustable Cycling Helmet with Detachable Visor Light Weight Mountain Bike Cycle Helmet",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023715,
            campaign_name: "Lifelong- Fitness PCA Jan",
            category: "Activities & Sports",
            clicks: 0,
            cpm: 651,
            ctr: 0.0,
            impressions: 361,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 235,
            processed_date: "2025-01-18",
        },
        {
            productid: "ce34b92c-308d-4fb1-bbb0-d03221d69c93",
            productname:
                "Lifelong Bathroom Corner Shelf For Storage - Mild Steel Wall Mounted Washroom Rack Pack Of 2 Black",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023708,
            campaign_name: "Lifelong- Home Needs PCA Jan",
            category: "Utility & Organizer",
            clicks: 1,
            cpm: 599,
            ctr: 0.29,
            impressions: 347,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 208,
            processed_date: "2025-01-18",
        },
        {
            productid: "f5146440-be7c-4cca-8532-16701a167e28",
            productname:
                "Lifelong Kitchen Organizer Stainless Steel Drying Rack Utensil Drainer Basket Sink Bartan Stand",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023708,
            campaign_name: "Lifelong- Home Needs PCA Jan",
            category: "Utility & Organizer",
            clicks: 1,
            cpm: 601,
            ctr: 0.32,
            impressions: 313,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 188,
            processed_date: "2025-01-18",
        },
        {
            productid: "682c2e1f-5c7c-407d-b8c3-f734af8f2203",
            productname:
                "Lifelong 10000 mAh 22.5 W Compact Pocket Size Power Bank (LLPBVA10), Sky Blue",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023706,
            campaign_name: "Lifelong-Electronics PCA Jan",
            category: "Cables, Chargers & Powerbanks",
            clicks: 3,
            cpm: 700,
            ctr: 1.14,
            impressions: 263,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 184,
            processed_date: "2025-01-18",
        },
        {
            productid: "81c679c0-4d7a-4306-9cee-42161d387aba",
            productname:
                "Lifelong Fruit Basket for Dining Table & Kitchen Storage|Mesh Open Storage Bin|Vegetable Basket",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023708,
            campaign_name: "Lifelong- Home Needs PCA Jan",
            category: "Utility & Organizer",
            clicks: 0,
            cpm: 599,
            ctr: 0.0,
            impressions: 294,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 176,
            processed_date: "2025-01-18",
        },
        {
            productid: "af40b6c4-9327-4244-bf17-8db3347be17a",
            productname:
                "Lifelong Pickleball Paddle Set -Fiberglass Surface 4 Pickleball Balls & Paddle Cover Bag",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023715,
            campaign_name: "Lifelong- Fitness PCA Jan",
            category: "Activities & Sports",
            clicks: 2,
            cpm: 651,
            ctr: 0.94,
            impressions: 212,
            orders: 1,
            other_skus: 1,
            revenue: 499,
            roas: 3.62,
            same_skus: 0,
            spend: 138,
            processed_date: "2025-01-18",
        },
        {
            productid: "27227107-2540-4201-a7d0-99301ceca656",
            productname:
                "Lifelong Bamboo Laundry Basket with RopeHandles&Lid|Foldable Bag|Durable|WashableBag",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023708,
            campaign_name: "Lifelong- Home Needs PCA Jan",
            category: "Bath & Laundry",
            clicks: 0,
            cpm: 595,
            ctr: 0.0,
            impressions: 84,
            orders: 1,
            other_skus: 1,
            revenue: 3999,
            roas: 79.98,
            same_skus: 0,
            spend: 50,
            processed_date: "2025-01-18",
        },
        {
            productid: "3b9a7f8b-4091-4660-9d35-7e648b48c7c7",
            productname: "Lifelong Llfh922A Fan Room Heater 2000 W",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023706,
            campaign_name: "Lifelong-Electronics PCA Jan",
            category: "Home Appliances",
            clicks: 0,
            cpm: 701,
            ctr: 0.0,
            impressions: 67,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 47,
            processed_date: "2025-01-18",
        },
        {
            productid: "229a3aee-06f8-407f-b412-722ebf07e8ea",
            productname:
                "Lifelong Pvc Hex Dumbbells 2Kg (1Kg x 2) For Home Gym Equipment Fitness Barbell (Pack Of 2)",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023715,
            campaign_name: "Lifelong- Fitness PCA Jan",
            category: "Activities & Sports",
            clicks: 2,
            cpm: 657,
            ctr: 5.71,
            impressions: 35,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 23,
            processed_date: "2025-01-18",
        },
        {
            productid: "d535fc18-3037-4868-81c3-7866dd03409e",
            productname:
                "Lifelong Abs Roller For Men & Women With Timer Mobile Holder & Knee Pad-Exercise (Blue)",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023715,
            campaign_name: "Lifelong- Fitness PCA Jan",
            category: "Activities & Sports",
            clicks: 0,
            cpm: 667,
            ctr: 0.0,
            impressions: 15,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 10,
            processed_date: "2025-01-18",
        },
        {
            productid: "d9b14a30-cfad-4128-ade1-ce668d63fb5b",
            productname:
                "Lifelong Dual Color Tpe Material Yoga Mat For Women & Men|6Mm Anti-Slip Yoga Mat(Llym114)",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023715,
            campaign_name: "Lifelong- Fitness PCA Jan",
            category: "Activities & Sports",
            clicks: 0,
            cpm: 667,
            ctr: 0.0,
            impressions: 9,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 6,
            processed_date: "2025-01-18",
        },
        {
            productid: "d7170fdc-b94a-47a3-b69c-843a0b463fdb",
            productname:
                "Lifelong Bathroom Organiser |Makeup Bamboo Stand|Countertop Rack|2-Tier|Water-Resistant Tray",
            brandid: "72637924-4a0c-4391-9e63-4cda2d401e01",
            brandname: "Lifelong",
            atc: 0,
            campaign_id: 2023708,
            campaign_name: "Lifelong- Home Needs PCA Jan",
            category: "Utility & Organizer",
            clicks: 0,
            cpm: 600,
            ctr: 0.0,
            impressions: 5,
            orders: 0,
            other_skus: 0,
            revenue: 0,
            roas: 0.0,
            same_skus: 0,
            spend: 3,
            processed_date: "2025-01-18",
        },
    ];

    const tableHeaders: TableHeader[] = [
        { key: "productid", label: "Product Id" },
        { key: "productname", label: "Product Name" },
        { key: "category", label: "Category" },
        { key: "atc", label: "ATC" },
        { key: "clicks", label: "Clicks" },
        { key: "cpm", label: "CPM" },
        { key: "ctr", label: "CTR" },
        { key: "impressions", label: "Impressions" },
        { key: "orders", label: "Orders" },
        { key: "other_skus", label: "Other SKUs" },
        { key: "revenue", label: "Revenue" },
        { key: "roas", label: "ROAS" },
        { key: "same_skus", label: "Same SKUs" },
        { key: "spend", label: "Spend" },
    ];
    const [showFilters, setShowFilters] = useState(false);

    const toggleMetric = (metricID: string) => {
        setSelectedMetrics((prev: MetricsState) => ({
            ...prev,
            [metricID]: !prev[metricID],
        }));
    };

    const toggleDimension = (dimensionID: string) => {
        setSelectedDimensions((prev: DimensionState) => ({
            ...prev,
            [dimensionID]: !prev[dimensionID],
        }));
    };
    const columnsSelected: string[] = [];
    const applySelection = () => {
        const updatedVisibleColumns = { ...visibleColumns };

        Object.entries(selectedMetrics).forEach(([key, value]) => {
            updatedVisibleColumns[key] = value;
        });
        Object.entries(selectedDimensions).forEach(([key, value]) => {
            updatedVisibleColumns[key] = value;
        });
        setVisibleColumns(updatedVisibleColumns);

        // const newDimensionInput: string[] = [];
        // const newMetricInput: string[] = [];
        const columnsSelected: string[] = [];
        Object.entries(selectedDimensions).forEach(([key, value]) => {
            if (value) {
                columnsSelected.push(key);
            }
        });
        Object.entries(selectedMetrics).forEach(([key, value]) => {
            if (value) {
                columnsSelected.push(key);
            }
        });

        console.log(columnsSelected);
        console.log(visibleColumns);
    };

    const formatValue = (value, key) => {
        if (typeof value === 'number') {
            if (key === 'ctr' || key === 'roas') {
                return `${value.toFixed(2)}%`;
            }
            return value.toLocaleString();
        }
        return value;
    };
    const calculateSummary = () => {
        return tableHeaders.reduce((acc, header) => {
            if (!visibleColumns[header.key]) return acc;

            if (typeof data[0]?.[header.key] === 'number') {
                acc[header.key] = data.reduce((sum, row) => sum + (row[header.key] || 0), 0);
            } else {
                acc[header.key] = 'Total';
            }
            return acc;
        }, {});
    };

    const summary = calculateSummary();

    return (
        <div className="flex-1 bg-[#f1f1f1] overflow-auto relative z-10">

            {/* Header Controls - Fixed at top */}
            <div className="  z-20 p-4 border-b">
                <div className="flex justify-between items-center max-w-full">
                    <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className=" rounded-md shadow whitespace-nowrap"
                        >
                            <DatePickerWithRange />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white text-[14px] text-center  flex items-center rounded-md p-1 shadow whitespace-nowrap"
                        >
                            No comparison
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white text-[14px] text-center flex items-center  rounded-md p-1 shadow whitespace-nowrap"
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

                            <Card className="">
                                <motion.div
                                    className="overflow-x-auto"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                   <div className="w-full h-[650px] overflow-auto rounded-md border">
    <Table>
        <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="bg-gray-50">
                {tableHeaders.map((header) =>
                    visibleColumns[header.key] && (
                        <TableHead
                            key={header.key}
                            className="px-4 py-3 sticky top-0 text-left text-sm font-semibold text-gray-900"
                        >
                            {header.label}
                        </TableHead>
                    )
                )}
            </TableRow>
        </TableHeader>
        <TableBody>
            {Object.keys(summary).length > 0 && (
                <TableRow className="bg-gray-50">
                    {tableHeaders.map(
                        (header, rowIndex) =>
                            visibleColumns[header.key] && (
                                <TableCell
                                    key={`${rowIndex}-${header.key}`}
                                    className="px-4 py-3 text-sm text-gray-500"
                                >
                                    {summary[header.key]}
                                </TableCell>
                            )
                    )}
                </TableRow>
            )}
        </TableBody>
        <TableBody>
            {data.map((row, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                    {tableHeaders.map(
                        (header) =>
                            visibleColumns[header.key] && (
                                <TableCell
                                    key={`${rowIndex}-${header.key}`}
                                    className="px-4 py-3 text-sm text-gray-500"
                                >
                                    {formatValue(row[header.key], header.key)}
                                </TableCell>
                            )
                    )}
                </TableRow>
            ))}
        </TableBody>
    </Table>
</div>

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
                            <Card className="sticky top-4">
                                <CardContent className="space-y-3 py-2">
                                    <p>Select Metrics</p>
                                    {metrics.map((metric) => (
                                        <div key={metric.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedMetrics[metric.id]}
                                                onChange={() => toggleMetric(metric.id)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {metric.label}
                                            </label>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardContent className="space-y-3 py-2">
                                    <p>Select Dimensions</p>
                                    {dimensions.map((dimension) => (
                                        <div key={dimension.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedMetrics[dimension.id]}
                                                onChange={() => toggleDimension(dimension.id)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {dimension.label}
                                            </label>
                                        </div>
                                    ))}
                                </CardContent>
                                <div className="flex justify-center my-3">
                                    <Button className="w-[80%]" onClick={applySelection}>
                                        Apply
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>

                    )}
                </AnimatePresence>
            </div>
        </div>
        </div >
    );
}

export default Page;
