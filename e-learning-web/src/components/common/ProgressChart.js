import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const ProgressChart = ({ progress }) => {
  const data = [
    { name: 'Hoàn thành', value: progress },
    { name: 'Còn lại', value: 100 - progress },
  ];

  const COLORS = ['#2563eb', '#e5e7eb']; // Blue-600 and Gray-200

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center relative">
      <PieChart width={160} height={160}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={65}
          paddingAngle={5}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
        />
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-black text-blue-600 leading-none">{progress}%</span>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Tiến độ</span>
      </div>
    </div>
  );
};

export default ProgressChart;