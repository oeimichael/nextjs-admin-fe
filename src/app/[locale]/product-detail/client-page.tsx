'use client';

import type { Product } from '@arcjet/next';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ProductModel {
  id: number | null,
  productId: number,
  productName: string;
  quantity: number;
  category: string;
}

export default function ClientPage() {
  const [error, setError] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
  useEffect(() => {
      const fetchProducts = async () => {
      const pathSegments = window.location.href.split("id="); // Split the URL into parts
      const id = pathSegments[pathSegments.length - 1]; // Get the last part of the URL (ID)

      const url = 'https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products/' + id;
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data != null){
          setSelectedProduct(response.data.data);
        }
        else {
          setError(response.data.message);
        }
      } catch (error) {
        // window.location.href = '/login';
        setError('Failed to fetch products');
        console.error(error);
      }
    };

    fetchProducts();
    
  },[]);
  const backToDashBoard = async () =>{
    window.location.href = '/product';
  };
  const handleSaveEdit = async () => {
    if (!selectedProduct) return;

    selectedProduct.id = selectedProduct.productId
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products`,
        selectedProduct,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleFieldChange = (field: keyof ProductModel, value: any) => {
    setSelectedProduct((prevState) => {
      if (prevState === null) return null;
      return {
        ...prevState, 
        [field]: value,
      };
    });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {selectedProduct === null ? (
        <p>Loading...</p>
      ) : (
        <div className="flex h-screen w-full items-center justify-center overflow-hidden">
          <div className="edit-form max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold text-center mb-6">Edit Product</h4>
            <form className="space-y-4">
              {/* Product Name */}
              <div className="flex flex-col">
                <label htmlFor="productName" className="text-sm font-medium text-gray-700">
                  Product Name:
                </label>
                <input
                  id="productName"
                  type="text"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProduct.productName}
                  onChange={(e) => handleFieldChange("productName", e.target.value)}
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProduct.quantity}
                  onChange={(e) => handleFieldChange("quantity", e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category:
                </label>
                <input
                  id="category"
                  type="text"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProduct.category || ''}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={backToDashBoard}
                  className="w-1/2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      )}
    </div>
    
  );
}
