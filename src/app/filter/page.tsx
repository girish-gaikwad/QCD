"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

function Table() {
  const tableHeaders = ['Billing country', 'Orders', 'Gross sales', 'Discounts', 'Returns', 'Net sales', 'Shipping charges'];
  const [columnWidths, setColumnWidths] = useState(
    tableHeaders.map(() => 150) // Default width for each column
  );
  const [isResizing, setIsResizing] = useState(null);
  const tableRef = useRef(null);
  const resizerRefs = useRef(tableHeaders.map(() => React.createRef()));

  const handleMouseDown = (index) => (e) => {
    // Prevent text selection during resize
    e.preventDefault();
    
    // Store the initial mouse position and current column width
    const startX = e.clientX;
    const startWidth = columnWidths[index];
    
    const handleMouseMove = (moveEvent) => {
      // Calculate the change in width
      const deltaX = moveEvent.clientX - startX;
      
      // Update column widths
      const newWidths = [...columnWidths];
      newWidths[index] = Math.max(50, startWidth + deltaX);
      setColumnWidths(newWidths);
    };

    const handleMouseUp = () => {
      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <div className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Card className="p-4 overflow-x-auto">
              <motion.div
                ref={tableRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr>
                      {tableHeaders.map((header, index) => (
                        <th 
                          key={header} 
                          className={`
                            text-left p-2 border-b relative
                            ${index === 0 ? 'sticky left-0 bg-white z-20' : ''}
                          `}
                          style={{ 
                            width: `${columnWidths[index]}px`,
                            position: index === 0 ? 'sticky' : 'relative',
                            left: index === 0 ? 0 : 'auto'
                          }}
                        >
                          {header}
                          <div 
                            ref={resizerRefs.current[index]}
                            onMouseDown={handleMouseDown(index)}
                            className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-200 z-30"
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array(10).fill(0).map((_, rowIndex) => (
                      <tr key={rowIndex}>
                        {tableHeaders.map((_, colIndex) => (
                          <td 
                            key={colIndex} 
                            className={`
                              p-2 border-b 
                              ${colIndex === 0 ? 'sticky left-0 bg-white z-10' : ''}
                            `}
                            style={{ 
                              width: `${columnWidths[colIndex]}px`,
                              position: colIndex === 0 ? 'sticky' : 'relative',
                              left: colIndex === 0 ? 0 : 'auto'
                            }}
                          >
                            {colIndex === 0 
                              ? `Summary ${rowIndex + 1}` 
                              : <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            }
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
  )
}

export default Table;




