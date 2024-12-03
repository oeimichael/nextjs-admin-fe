import React from 'react';
import { Pie } from 'react-chartjs-2'; // Correct import for the Pie component
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Registering necessary components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

// Define your component and the expected props
interface PieChartProps {
  products: any[];  // Array of products to display
}

const PieChart: React.FC<PieChartProps> = ({ products }) => {
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

  return <Pie data={data} />;
};

export default PieChart;
