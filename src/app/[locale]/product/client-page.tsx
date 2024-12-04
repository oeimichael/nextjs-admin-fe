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
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
      const fetchProducts = async () => {
      setIsLoading(true);
      
      const url = 'https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products';
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            page: currentPage,
            pageSize: itemsPerPage,
          },
        });

        if (response.data.total > 0){
          setProducts(response.data.data);
          setTotalItems(response.data.total);
          setIsLoading(false);
        }
        else {
          setError(response.data.message);
        }
      } 
      catch (error: AxiosError | any) {
        if (error.code === "ERR_NETWORK") {
          alert("Unauthorized access. Please log in again.");
          window.location.href="/login"
        } 
        else {
          setError('Failed to fetch products');
        }
      }
    };

      fetchProducts();
  }, [currentPage]);

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
          page: currentPage,
          pageSize: itemsPerPage,
        },
      });

      if (response.data.total > 0){
        setProducts(response.data.data);
        setTotalItems(response.data.total);
        setIsLoading(false);
      }
      else {
        setError(response.data.message);
      }
    } 
    catch (error: AxiosError | any) {
      if (error.code === "ERR_NETWORK") {
        alert("Unauthorized access. Please log in again.");
        window.location.href="/login"
      } 
      else {
        setError('Failed to fetch products');
      }
    }
  };

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
    setIsLoading(true);
    const token = localStorage.getItem("token")
    try {
      const response = await axios.delete(
         `https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products/${id}`,
          {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        alert(response.data.message);
        await fetchProducts()
      }
      
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        alert("Unauthorized access. Please log in again.");
        // window.location.href="/login"
      } 
      else {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      }
      
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {products.length === 0 ? (
        <p>...</p>
      ) : (
        <div>
          <h1 className="text-md font-bold mb-4">Product Data</h1>
          <div className='flex w-full'>
            <div className='w-6/12'><LineChart products={products} /></div>
            
            <div className='w-6/12'><PieChart products={products} width={200} height={20} /></div>
       
      
          </div>
          <div className="table-container">
            <h1 className="text-2md font-bold mb-4">Product Table with Pagination</h1>
            <button
              className="flex gap-2 rounded-md bg-black px-4 py-2 mb-2"
              type="button"
              onClick={() => handleCreateClick()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="fill-white">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
              <span className="text-white">Add</span>
            </button>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border border-gray-300">ID</th>
                  <th className="py-2 px-4 border border-gray-300">Name</th>
                  <th className="py-2 px-4 border border-gray-300">Quantity</th>
                  <th className="py-2 px-4 border border-gray-300">Category</th>
                  <th className="py-2 px-4 border border-gray-300" colSpan="2">Action</th>
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
      )}

      {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg flex items-center justify-center">
              <div className="loader-border border-t-transparent border-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
              <p className="ml-4 text-lg text-gray-700">Loading...</p>
            </div>
          </div>
      )}
    </div>

  );
}
