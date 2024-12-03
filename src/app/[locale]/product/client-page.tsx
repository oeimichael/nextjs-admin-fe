'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PieChart from './PieChart';

// Dynamically import Line chart to avoid SSR issues
const LineChart = dynamic(() => import('./LineChart'), { ssr: false });

export default function ClientPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(100);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Fetch product data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const url = 'https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products';
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pc2VsQGdtYWlsLmNvbSIsImlhdCI6MTczMzIxNzY0NCwiZXhwIjoxNzMzMjIxMjQ0fQ.mKGk0y89fuZ2ic3uhs-2ziGzHKHtJYo3cuibFNt8cDI',
            'Content-Type': 'application/json',
          },
          params: {
            page: currentPage, // For example, add the page parameter
            pageSize: itemsPerPage, // Add the limit parameter for pagination
          },
        });

        if (response.data.total > 0){
          setProducts(response.data.data);
          setTotalItems(response.data.total);
        }
        else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('Failed to fetch products');
        console.error(error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleEditClick = (product: any) => {
    setSelectedProduct(product); // Set the product for editing
  };
  const handleSaveEdit = async () => {
    if (!selectedProduct) return;

    selectedProduct.id = selectedProduct.producId
    // Send updated product data to the API (for example, PATCH request)
    try {
      const response = await axios.put(
        `https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/products`,
        selectedProduct,
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pc2VsQGdtYWlsLmNvbSIsImlhdCI6MTczMzIxMzY3MiwiZXhwIjoxNzMzMjE3MjcyfQ.OG_y-dGWCuue4rM4QpRVL_tEcCYlJ0iibZ5EIDzTYWs',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        alert('Product updated successfully');
        setSelectedProduct(null);
        setCurrentPage(1); // Optional: reset to the first page after saving
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };
 
  // Function to handle saving the edited product (just a placeholder for now)
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
      // If the product was successfully updated, refetch the products
      if (response.status === 200) {
        alert('Product updated successfully');
        setSelectedProduct(null); // Reset selected product after saving
        setCurrentPage(1); // Optional: reset to the first page after saving
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <h1>Product Data</h1>
      {error && <p>{error}</p>}
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Pass the products data to the LineChart component */}
          <LineChart products={products} />
          <PieChart products={products} />
        </div>
      )}

      <div className="table-container">
        <h1>Product Table with Pagination</h1>
        <table style={{ border: '1px solid' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId}>
                <td>{product.producId}</td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <th>Actions</th>
                <td>
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                </td>
                <td>
                  <button  type="button" onClick={() => handleDeleteClick(product.productId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
          <span>
            total items {totalItems}
          </span>
        </div>

        {/* Edit Product Form (appears when a product is selected for editing) */}
        {selectedProduct && (
          <div className="edit-form">
            <h4>Edit Product</h4>
            <form>
              <label>
                Product Name:
                <input
                  type="text"
                  value={selectedProduct.productName}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
                />
              </label>
              <br />
              <label>
                Quantity:
                <input
                  type="number"
                  value={selectedProduct.quantity}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: +e.target.value })}
                />
              </label>
              <br />
              <label>
                Price:
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, price: +e.target.value })}
                />
              </label>
              <br />
              <label>
                Category:
                <input
                  type="text"
                  value={selectedProduct.category}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                />
              </label>
              <br />
              <button type="button" onClick={handleSaveEdit}>
                Save
              </button>
              <button type="button" onClick={() => setSelectedProduct(null)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>

  );
}
