// LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC<{ products: any[] }> = ({ products }) => {
  const data = {
    labels: products.map((product) => product.productName), // X-axis labels (product names)
    datasets: [
      {
        label: 'Product Quantity', // Dataset label
        data: products.map((product) => product.quantity), // Y-axis data (prices)
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color
        fill: true, // Fill under the line
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Product Name', // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quantity', // Y-axis title
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

