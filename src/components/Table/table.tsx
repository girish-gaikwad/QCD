"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

function Table({ tableHeaders, visibleColumns, data,datas }) {
  const [columnWidths, setColumnWidths] = useState(tableHeaders.map(() => 150));

  const handleMouseDown = (index) => (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = columnWidths[index];

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;

      const newWidths = [...columnWidths];
      newWidths[index] = Math.max(50, startWidth + deltaX);
      setColumnWidths(newWidths);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
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

  return (
    <div className="flex-1 relative">
      <div className="h-[500px] px-2 overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="h-full overflow-auto"
        >
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20 bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
              <tr>
                {tableHeaders.map(
                  (header, index) =>
                    visibleColumns[header.key] && (
                      <th
                        key={header.key}
                        className={`
                      text-center p-2 border-b relative
                      ${
                        index === 0
                          ? "sticky left-0 z-30 bg-white shadow-1 dark:bg-gray-dark dark:shadow-card"
                          : ""
                      }
                    `}
                        style={{
                          width: `${columnWidths[index]}px`,
                          position: index === 0 ? "sticky" : "relative",
                          left: index === 0 ? 0 : "auto",
                        }}
                      >
                        {header.label}
                        <div
                          onMouseDown={handleMouseDown(index)}
                          className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-200 z-40"
                        />
                      </th>
                    )
                )}
              </tr>
              <tr>
                {tableHeaders.map(
                  (header, index) =>
                    visibleColumns[header.key] && (
                      <th
                        key={header.key}
                        className={`
                      text-center p-2 border-b relative
                      ${
                        index === 0
                          ? "sticky left-0 z-30 bg-white shadow-1 dark:bg-gray-dark dark:shadow-card"
                          : ""
                      }
                    `}
                        style={{
                          width: `${columnWidths[index]}px`,
                          position: index === 0 ? "sticky" : "relative",
                          left: index === 0 ? 0 : "auto",
                        }}
                      >
                        {datas[header.key]}
                        <div
                          onMouseDown={handleMouseDown(index)}
                          className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-200 z-40"
                        />
                      </th>
                    )
                )}
              </tr>
            </thead>
            
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {tableHeaders.map(
                    (header, index) =>
                      visibleColumns[header.key] && (
                        <td
                          key={`${rowIndex}-${header.key}`}
                          className="p-2 border-b text-center"
                        >
                          {formatValue(row[header.key], header.key)}
                        </td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

export default Table;