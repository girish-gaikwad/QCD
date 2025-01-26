"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

function Table() {
  const tableHeaders = ['Billing country', 'Orders', 'Gross sales', 'Discounts', 'Returns', 'Net sales', 'Shipping charges'];
  const [columnWidths, setColumnWidths] = useState(
    tableHeaders.map(() => 150)
  );

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
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className='flex-1 relative'>
        
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
                {tableHeaders.map((header, index) => (
                  <th 
                    key={header} 
                    className={`
                      text-left p-2 border-b relative
                      ${index === 0 ? 'sticky left-0 z-30 bg-white shadow-1 dark:bg-gray-dark dark:shadow-card' : ''}
                    `}
                    style={{ 
                      width: `${columnWidths[index]}px`,
                      position: index === 0 ? 'sticky' : 'relative',
                      left: index === 0 ? 0 : 'auto'
                    }}
                  >
                    {header}
                    <div 
                      onMouseDown={handleMouseDown(index)}
                      className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-200 z-40"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(20).fill(0).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {tableHeaders.map((_, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`
                        p-2 border-b bg-white  shadow-1 dark:bg-gray-dark dark:shadow-card
                        ${colIndex === 0 ? 'sticky left-0 z-10' : ''}
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
      </div>
    </div>
  )
}

export default Table;