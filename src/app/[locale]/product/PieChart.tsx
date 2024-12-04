import React from 'react';
import { Pie } from 'react-chartjs-2'; // Correct import for the Pie component
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  products: any[];
  width: number;
  height: number;
}

const PieChart: React.FC<PieChartProps> = ({ products, width = 300, height = 300 }) => {
  const data = {
    labels: products.map((product) => product.productName),
    datasets: [
      {
        data: products.map((product) => product.quantity),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(231, 233, 237, 0.6)',
        ],
      },
    ],
  };
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Pie data={data} width={width} height={height} />
    </div>
  );
};

export default PieChart;
