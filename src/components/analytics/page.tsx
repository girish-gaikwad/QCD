"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SlidersHorizontal } from "lucide-react";
import { DatePickerWithRange } from "@/components/datepicker";
import { Checkbox } from '@/components/ui/checkbox';

import Table from "@/components/Table/table"
import axios from "axios";
import SpendChart from "@/components/charts/chart";
import useSampleStore from "@/store/sampleStore";
import ButtonDefault from "../Buttons/ButtonDefault";

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
function Analytics() {
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
        impressions: true,
        other_skus: false,
        cpm: false,
        same_skus: false,
        spend: true,
        ctr: false,
        productid: false,
        productname: true,
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

    // let data: Product[] = [];
    const [data, setData] = useState<Product[]>([
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
        }
    ]);
    // const data: Product[] = [];

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
        if (typeof value === "number") {
            if (key === "ctr" || key === "roas") {
                return `${value.toFixed(2)}%`;
            }
            return value.toLocaleString();
        }
        return value;
    };
    // const calculateSummary = () => {
    //   return tableHeaders.reduce((acc, header) => {
    //     if (!visibleColumns[header.key]) return acc;

    //     if (typeof data[0]?.[header.key] === "number") {
    //       acc[header.key] = data.reduce(
    //         (sum, row) => sum + (row[header.key] || 0),
    //         0
    //       );
    //     } else {
    //       acc[header.key] = "Total";
    //     }
    //     return acc;
    //   }, {});
    // };

    // const summary = calculateSummary();

    const handleData = (event: any) => {
        console.log(event);
        setData(event);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send POST request with proper JSON data
                const result = await axios.post(
                    "http://localhost:5000/datewise",
                    {
                        from: "2025-01-17T18:30:00.000Z",
                        to: "2025-02-11T18:30:00.000Z",
                    } // JSON object
                );
                setData(result.data.data)
                // Log the response
                console.log("Response from backend:", result.data.data);
            } catch (error) {
                // Log any errors
                console.error("Error at POST request:", error);
            }
        };

        fetchData(); // Call the async function
    }, []);

    const { chartTypes, chartType, setChartType } = useSampleStore()
    return (
        <div className="flex-1   relative z-10">
            {/* Header Controls - Fixed at top */}
            <div className="  z-20 py-2 px-1 ">
                <div className="flex justify-between items-center max-w-full">

                    <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className=" text-[14px] text-center rounded-[10px] hover:cursor-pointer flex items-center bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-1  whitespace-nowrap"
                        >
                            <DatePickerWithRange data={handleData} />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className=" text-[14px] text-center rounded-[10px] hover:cursor-pointer flex items-center bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-1  whitespace-nowrap"

                        >
                            No comparison
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className=" text-[14px] text-center rounded-[10px] hover:cursor-pointer flex items-center bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-1  whitespace-nowrap"
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
            <div >
                <div className="flex flex-col lg:flex-row gap-4 items-start relative">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="space-y-4">
                            <div className="p-4 h-96 overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">

                                <h2 className="font-bold mb-4">Total Spend</h2>
                                <SpendChart data={data} />
                            </div>

                           <Table/>
                            
                        </div>
                    </div>

                    {/* Filter Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                className="lg:w-64 w-full lg:sticky lg:top-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="sticky top-4 overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">

                                    <div className="space-y-3 p-6 py-2">
                                        <p>Select Metrics</p>
                                        {metrics.map((metric) => (
                                            <div
                                                key={metric.id}
                                                className="flex items-center space-x-2"
                                            >
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
                                    </div>
                                    <div className="space-y-3 p-6 py-2">
                                        <p>Select Chart Type</p>
                                        <div className="w">
                                            <select
                                                value={chartType}
                                                onChange={(e) => setChartType(e.target.value)}
                                                className="block w-full py-2 rounded-md border-gray-300 shadow-sm border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                {chartTypes.map((type) => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>


                                    </div>
                                    <div className="space-y-3 p-6 py-2">
                                        <p>Select Dimensions</p>
                                        {dimensions.map((dimension) => (
                                            <div
                                                key={dimension.id}
                                                className="flex items-center space-x-2"
                                            >
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
                                    </div>
                                    <div className="flex justify-center my-3">


                                        <ButtonDefault
                                            label="Apply"
                                            onClick={applySelection} customClasses="border border-primary text-primary rounded-full py-[8px] px-10 hover:bg-primary hover:text-white"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M10.9987 2.521C6.31578 2.521 2.51953 6.31725 2.51953 11.0002C2.51953 12.3578 2.8381 13.6391 3.40393 14.7751C3.63103 15.231 3.71848 15.7762 3.57519 16.3118L3.02922 18.3523C2.92895 18.7271 3.2718 19.0699 3.64657 18.9696L5.6871 18.4237C6.22262 18.2804 6.76783 18.3678 7.22378 18.5949C8.3598 19.1608 9.64106 19.4793 10.9987 19.4793C15.6816 19.4793 19.4779 15.6831 19.4779 11.0002C19.4779 6.31725 15.6816 2.521 10.9987 2.521ZM1.14453 11.0002C1.14453 5.55786 5.55639 1.146 10.9987 1.146C16.441 1.146 20.8529 5.55786 20.8529 11.0002C20.8529 16.4425 16.441 20.8543 10.9987 20.8543C9.42358 20.8543 7.93293 20.4843 6.61075 19.8257C6.41345 19.7274 6.21199 19.7066 6.0425 19.7519L4.00197 20.2979C2.60512 20.6717 1.3272 19.3937 1.70094 17.9969L2.24692 15.9564C2.29227 15.7869 2.27142 15.5854 2.17315 15.3881C1.5146 14.0659 1.14453 12.5753 1.14453 11.0002ZM14.2348 8.68069C14.5033 8.94918 14.5033 9.38448 14.2348 9.65296L10.5682 13.3196C10.3035 13.5843 9.87588 13.5886 9.60592 13.3294L7.77258 11.5694C7.49867 11.3065 7.48979 10.8713 7.75274 10.5974C8.0157 10.3235 8.45091 10.3146 8.72481 10.5775L10.0722 11.871L13.2626 8.68069C13.531 8.41221 13.9663 8.41221 14.2348 8.68069Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </ButtonDefault>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>



        </div>
    );
}

export default Analytics;
