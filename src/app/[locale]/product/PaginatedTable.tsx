import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const PaginatedTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);  // Number of items per page
  const [totalItems, setTotalItems] = useState<number>(0);  // Total number of products (for pagination)

  useEffect(() => {
    // Replace with your API URL to fetch the products
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      setProducts(response.data.products);  // Assuming your API returns products in the "products" field
      setTotalItems(response.data.totalCount);  // Assuming your API returns the total count in "totalCount"
    };

    fetchProducts();
  }, [currentPage, itemsPerPage]);

  // Calculate page numbers based on total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1>Product Table with Pagination</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
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
      </div>
    </div>
  );
};

export default PaginatedTable;
