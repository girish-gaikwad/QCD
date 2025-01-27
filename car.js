"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

function Table() {
  const tableHeaders = ['Billing country', 'Orders', 'Gross sales', 'Discounts', 'Returns', 'Net sales', 'Shipping charges'];
  const [columnWidths, setColumnWidths] = useState(
    tableHeaders.map(() => 150)
  );
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

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

  const toggleRowExpand = (rowIndex: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowIndex)) {
      newExpandedRows.delete(rowIndex);
    } else {
      newExpandedRows.add(rowIndex);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className='flex-1 relative'>
      <Card className="h-[500px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="h-full overflow-auto"
        >
          {/* Desktop Table */}
          <table className="w-full border-collapse hidden md:table">
            <thead className="sticky top-0 z-20 bg-white">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th 
                    key={header} 
                    className={`
                      text-left p-2 border-b relative
                      ${index === 0 ? 'sticky left-0 z-30 bg-white' : ''}
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
                        p-2 border-b bg-white
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

          {/* Mobile Accordion View */}
          <div className="md:hidden">
            {Array(20).fill(0).map((_, rowIndex) => (
              <div key={rowIndex} className="border-b">
                <div 
                  onClick={() => toggleRowExpand(rowIndex)}
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
                >
                  <span>Summary {rowIndex + 1}</span>
                  {expandedRows.has(rowIndex) ? <ChevronDown /> : <ChevronRight />}
                </div>
                {expandedRows.has(rowIndex) && (
                  <div className="p-4 bg-gray-50">
                    {tableHeaders.slice(1).map((header, colIndex) => (
                      <div key={header} className="flex justify-between py-2">
                        <span className="font-medium">{header}:</span>
                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Card>
    </div>
  )
}

export default Table;