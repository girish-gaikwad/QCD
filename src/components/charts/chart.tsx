import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import useSampleStore from '@/store/sampleStore';
const SpendChart = ({ data }) => {
  const [preparedData, setPreparedData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const processedData = data.map(item => ({
        name: item.productname.length > 20 
          ? item.productname.substring(0, 20) + '...' 
          : item.productname,
        spend: item.spend
      })).sort((a, b) => b.spend - a.spend);
      setPreparedData(processedData);
    }
  }, [data]);

 const{chartTypes, chartType, setChartType } = useSampleStore()

  const COLORS = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#6366F1', // Indigo
    '#F43F5E', // Rose
    '#F59E0B', // Amber
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-md p-4 border">
          <p className="font-bold text-gray-700">{label}</p>
          <p className="text-blue-600">
            Spend: ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const sharedProps = {
      data: preparedData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch(chartType) {
      case 'line':
        return (
          <LineChart {...sharedProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="spend" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ r: 6, fill: '#3B82F6' }}
            />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...sharedProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="spend" barSize={30}>
              {preparedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      case 'radial':
        return (
          <RadialBarChart 
            width={500} 
            height={300} 
            cx="50%" 
            cy="50%" 
            innerRadius="10%" 
            outerRadius="80%" 
            data={preparedData}
            startAngle={90} 
            endAngle={-270}
          >
            <RadialBar 
              dataKey="spend" 
              cornerRadius={10} 
              background 
              fill="#8884d8"
            >
              {preparedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </RadialBar>
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        );
    }
  };

  if (preparedData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No spend data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
     
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default SpendChart;