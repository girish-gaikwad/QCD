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
  { id: "ad_atc", label: "ATC" },
  { id: "ad_clicks", label: "Clicks" },
  { id: "ad_orders", label: "Orders" },
  { id: "gross_selling_value", label: "gross_selling_value" },
  { id: "total_units_sold", label: "total_units_sold" },
  { id: "ad_impressions", label: "ad_impressions" },
  { id: "ad_spend", label: "ad_spend" },
  {
    id: "stock_on_hand_masterwarehouse",
    label: "stock_on_hand_masterwarehouse",
  },
  { id: "stock_on_hand_sellable", label: "stock_on_hand_sellable" },
  { id: "gross_merchandise_value", label: "gross_merchandise_value" },
  { id: "mrp", label: "mrp" },
  { id: "discounted_selling_price", label: "discounted_selling_price" },
  { id: "ad_revenue", label: "ad_revenue" },
];

const dimensions = [
  { id: "product_id", label: "Product Id" },
  { id: "product_name", label: "Product Name" },
  { id: "category_name", label: "Category" },
];
function Page() {
  type VisibleColumns = {
    ad_atc: boolean;
    ad_clicks: boolean;
    ad_orders: boolean;
    gross_selling_value: boolean;
    total_units_sold: boolean;
    ad_impressions: boolean;
    ad_spend: boolean;
    stock_on_hand_masterwarehouse: boolean;
    stock_on_hand_sellable: boolean;
    gross_merchandise_value: boolean;
    mrp: boolean;
    discounted_selling_price: boolean;
    ad_revenue: boolean;
    product_id: boolean;
    product_name: boolean;
    category_name: boolean;
  };

  type MetricsState = {
    [key: string]: boolean;
  };
  type DimensionState = {
    [key: string]: boolean;
  };
  interface Product {
    date: number;
    product_id: string;
    product_name: string;
    product_ean: number;
    manufacturer_name: string;
    brand_name: string;
    category_name: string;
    mrp: number;
    discounted_selling_price: number;
    stock_on_hand_sellable: number;
    stock_on_hand_masterwarehouse: number;
    total_units_sold: number;
    gross_merchandise_value: number;
    gross_selling_value: number;
    ad_spend: number;
    ad_impressions: number;
    ad_clicks: number;
    ad_atc: number;
    ad_orders: number;
    ad_revenue: number;
  }

  interface TableHeader {
    key: string;
    label: string;
  }
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    ad_atc: false,
    ad_clicks: false,
    ad_orders: false,
    gross_selling_value: false,
    total_units_sold: false,
    ad_impressions: false,
    ad_spend: false,
    stock_on_hand_masterwarehouse: false,
    stock_on_hand_sellable: false,
    gross_merchandise_value: false,
    mrp: true,
    discounted_selling_price: false,
    ad_revenue: false,
    product_id: false,
    product_name: true,
    category_name: false,
  });

  const [selectedMetrics, setSelectedMetrics] = useState<MetricsState>({
    ad_atc: false,
    ad_clicks: false,
    ad_orders: false,
    gross_selling_value: false,
    total_units_sold: false,
    ad_impressions: false,
    ad_spend: false,
    stock_on_hand_masterwarehouse: false,
    stock_on_hand_sellable: false,
    gross_merchandise_value: false,
    mrp: false,
    discounted_selling_price: false,
    ad_revenue: false,
  });

  const [selectedDimensions, setSelectedDimensions] = useState<DimensionState>({
    product_id: false,
    product_name: false,
    category_name: false,
  });

  // let data: Product[] = [];
  const [data, setData] = useState<Product[]>([
    {
      date: 45659,
      product_id: "00e50353-b987-45d3-8251-2492ab9b8d32",
      product_name:
        "Lifelong Llpcm300 Rechargeable Nose And Ear Trimmer; 40 Minutes Runtime And Washable; For Men, Woman 1.0 PIECE",
      product_ean: 8904385419063,
      manufacturer_name: "Lifelong Online Retail Pvt Ltd",
      brand_name: "Lifelong",
      category_name: "Electronics & Appliances",
      mrp: 1500,
      discounted_selling_price: 1050,
      stock_on_hand_sellable: 1162,
      stock_on_hand_masterwarehouse: 243,
      total_units_sold: 16,
      gross_merchandise_value: 19495,
      gross_selling_value: 13646.5,
      ad_spend: 0,
      ad_impressions: 0,
      ad_clicks: 0,
      ad_atc: 0,
      ad_orders: 0,
      ad_revenue: 0,
    },
  ]);
  // const data: Product[] = [];

  const tableHeaders: TableHeader[] = [
    { key: "product_id", label: "Product id" },
    { key: "product_name", label: "Product Name" },
    { key: "category_name", label: "Category" },
    { key: "ad_atc", label: "ATC" },
    { key: "ad_clicks", label: "Clicks" },
    { key: "ad_orders", label: "Orders" },
    { key: "gross_selling_value", label: "gross_selling_value" },
    { key: "total_units_sold", label: "total_units_sold" },
    { key: "ad_impressions", label: "ad_impressions" },
    { key: "ad_spend", label: "ad_spend" },
    {
      key: "stock_on_hand_masterwarehouse",
      label: "stock_on_hand_masterwarehouse",
    },
    { key: "stock_on_hand_sellable", label: "stock_on_hand_sellable" },
    { key: "gross_merchandise_value", label: "gross_merchandise_value" },
    { key: "mrp", label: "mrp" },
    { key: "discounted_selling_price", label: "discounted_selling_price" },
    { key: "ad_revenue", label: "ad_revenue" },
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

  const evaluateGroupdata =  () => {
    const { product_id, product_name, category_name } = selectedDimensions;
    if (category_name && !product_id && !product_name) {
      return true
    } else {
      return false
    }
  };
  const columnsSelected: string[] = [];
  const applySelection = async () => {
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

    // console.log(columnsSelected);
    // console.log(visibleColumns);
    const groupData =evaluateGroupdata()
    console.log(groupData);
    try {
      // Wait for the POST request to complete
      const result = await axios.post("http://localhost:5000/datewise", {
        from: "2025-01-17T18:30:00.000Z",
        to: "2025-02-11T18:30:00.000Z",
        cond: groupData,
      });

      // Log the response
      console.log(result.data.data);
      setData(result.data.data)
    } catch (error) {
      // Log any errors
      console.log("Error at post request", error);
    }
  };

  const formatValue = (value, key) => {
    if (typeof value === "number") {
      if (key === "ctr" || key === "roas") {
        return `${value.toFixed(2)}%`;
      }
      return value.toLocaleString();
    }
    return value;
    console.log(value);
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
            cond: false,
          } // JSON object
        );

        // Log the response
        setData(result.data.data);
        console.log("Response from backend:", result.data.data);
        console.log;
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
              <DatePickerWithRange data={handleData} cond = {true} />
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
                        {
                          data.map((row, rowIndex) => (
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
                          ))
                          // : Object.entries(data).map(
                          //     ([key, value], rowIndex) => (
                          //       <TableRow
                          //         key={rowIndex}
                          //         className={
                          //           rowIndex % 2 === 0
                          //             ? "bg-white"
                          //             : "bg-gray-50"
                          //         }
                          //       >
                          //         {tableHeaders.map(
                          //           (header) =>
                          //             visibleColumns[header.key] && (
                          //               <TableCell
                          //                 key={`${rowIndex}-${header.key}`}
                          //                 className="px-4 py-3 text-sm text-gray-500"
                          //               >
                          //                 {formatValue(
                          //                   value[header.key],
                          //                   header.key
                          //                 )}
                          //               </TableCell>
                          //             )
                          //         )}
                          //       </TableRow>
                          //     )
                          //   )
                        }
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
