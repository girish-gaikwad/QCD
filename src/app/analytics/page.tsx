"use client";
import React, { useEffect, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

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
              <DatePickerWithRange data={handleData} />
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
                          {tableHeaders.map(
                            (header) =>
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
                      {/* <TableBody>
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
                      </TableBody> */}
                      <TableBody>
                        {data.map((row, rowIndex) => (
                          <TableRow
                            key={rowIndex}
                            className={
                              rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
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
                  </CardContent>
                  <CardContent className="space-y-3 py-2">
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
    </div>
  );
}

export default Page;
