'use client';

import axios, { type AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PieChart from './PieChart';
import { Console } from 'console';

// Dynamically import Line chart to avoid SSR issues
const LineChart = dynamic(() => import('./LineChart'), { ssr: false });

export default function ClientPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(2);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Fetch product data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const url = 'https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products';
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            page: currentPage, // For example, add the page parameter
            pageSize: itemsPerPage, // Add the limit parameter for pagination
          },
        });
        console.log('status',response.status)
        if (response.data.total > 0){
          setProducts(response.data.data);
          setTotalItems(response.data.total);
        }
        else {
          setError(response.data.message);
        }
      } 
      catch (error: AxiosError | any) {
        if (error.code === "ERR_NETWORK") {
          setError("Unauthorized access. Please log in again.");
          window.location.href="/login"
        } 
        else {
          setError('Failed to fetch products');
        }
      }
    };

      fetchProducts();
    }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setProducts([]);
    }
  };
  const handleEditClick = (product: any) => {
    setSelectedProduct(product); // Set the product for editing
    window.location.href="/product-detail?id=" + product.productId
  };
  const handleCreateClick = () => {
    window.location.href="/product-create"
  };
  const handleDeleteClick = async (id: Number) => {
    if (!selectedProduct) return;

    // Send updated product data to the API (for example, PATCH request)
    try {
      const response = await axios.delete(
        `https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products/${id}`,
          {
          headers: {
            'Authorization': 'Bearer YOUR_BEARER_TOKEN',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Product updated successfully');
        setSelectedProduct(null); 
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div>
      <h1>Product Data</h1>
      {error && <p>{error}</p>}
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
          <div className='flex w-full'>
            {/* <div className='w-6/12'><LineChart products={products} /></div>
            
            <div className='w-6/12'><PieChart products={products} width={200} height={20} /></div> */}
          </div>
      )}

      <div className="table-container">
        <h1 className="text-2xl font-bold mb-4">Product Table with Pagination</h1>
        <button
            onClick={() => handleCreateClick()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 mb-1">
            Add
        </button>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Quantity</th>
              <th className="py-2 px-4 border border-gray-300">Category</th>
              <th className="py-2 px-4 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border border-gray-300">{product.productId}</td>
                <td className="py-2 px-4 border border-gray-300">{product.productName}</td>
                <td className="py-2 px-4 border border-gray-300">{product.quantity}</td>
                <td className="py-2 px-4 border border-gray-300">{product.category}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    type="button"
                    onClick={() => handleDeleteClick(product.productId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination flex items-center space-x-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500">
          Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500">
            Next
          </button>
          <span className="text-lg">
            total items {totalItems}
          </span>
        </div>

      </div>
    </div>

  );
}
