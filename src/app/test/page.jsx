"use client";

import React from "react";
import dynamic from 'next/dynamic';

// Dynamically import ColumnResize to ensure it's only loaded on client-side
const ColumnResize = dynamic(() => import("react-table-column-resizer"), { 
  ssr: false 
});

export default function ColumnResizePage() {
  return (
    <div className="p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">1</th>
            <ColumnResize
              id={1}
              resizeEnd={(width) => console.log("resize end", width)}
              resizeStart={() => console.log("resize start")}
              className="columnResizer"
            />
            <th className="border p-2">2</th>
            <ColumnResize
              id={2}
              className="columnResizer"
              minWidth={120}
              disabled
            />
            <th className="border p-2">3</th>
            <ColumnResize
              id={3}
              resizeEnd={(width) => console.log("resize end", width)}
              resizeStart={() => console.log("resize start")}
              className="columnResizer"
            />
            <th className="border p-2">minWidth 120</th>
            <ColumnResize 
              id={4} 
              minWidth={120} 
              className="columnResizer" 
            />
            <th className="border p-2">5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">1</td>
            <td className="column_resizer_body" />
            <td className="border p-2">2</td>
            <td className="column_resizer_body" />
            <td className="border p-2">3</td>
            <td className="column_resizer_body" />
            <td className="border p-2">4</td>
            <td className="column_resizer_body" />
            <td className="border p-2">5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}