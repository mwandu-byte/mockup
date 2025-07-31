import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [stockTotal, setStockTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from backend (using dummy data)
    setTimeout(() => {
      setProductsCount(42); // dummy total products
      setStockTotal(987);   // dummy total stock
      setLoading(false);
    }, 1000); // 1-second fake delay
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">Loading dashboard...</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card: Total Products */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <i className="fas fa-box text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Total Products</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{productsCount}</h2>
            </div>
          </div>
        </div>

        {/* Card: Total Stock */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <i className="fas fa-cubes text-green-600 dark:text-green-400 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Total Stock</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{stockTotal}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
