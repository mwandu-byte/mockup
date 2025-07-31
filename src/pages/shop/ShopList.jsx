import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopForm from "./ShopForm";
import { getPhrase } from "../../utils/GetPhrase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [editingShop, setEditingShop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://127.0.0.1:8008/api/v1/shops?page=${page}`);
      setShops(res.data.data);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error("Failed to fetch shops", err);
      toast.error(getPhrase("failed_to_fetch_shops") || "Failed to fetch shops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm(getPhrase("confirm_delete_shop") || "Are you sure you want to delete this shop?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8008/api/v1/shops/${id}`);
      toast.success(getPhrase("shop_deleted_successfully") || "Shop deleted successfully");
      fetchShops();
    } catch (err) {
      console.error("Failed to delete shop", err);
      toast.error(getPhrase("failed_to_delete_shop") || "Failed to delete shop");
    }
  };

  const handleEdit = (shop) => {
    setEditingShop(shop);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingShop(null);
    setShowForm(true);
  };

  const handleFormSubmit = (success) => {
    setShowForm(false);
    setEditingShop(null);
    if (success) {
      toast.success(
        editingShop
          ? getPhrase("shop_updated_successfully") || "Shop updated successfully"
          : getPhrase("shop_created_successfully") || "Shop created successfully"
      );
    }
    fetchShops();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingShop(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar theme="colored" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {getPhrase("shops_list") || "Shops"}
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                {getPhrase("manage_your_shops") || "Manage and organize your shops"}
              </p>
            </div>
            <div className="mt-6 sm:mt-0">
              <button
                onClick={handleCreate}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {getPhrase("create_shop") || "Create Shop"}
              </button>
            </div>
          </div>
        </div>

        {/* Shop Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-8 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-2xl rounded-xl bg-white dark:bg-gray-800">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingShop ? (getPhrase("edit_shop") || "Edit Shop") : (getPhrase("create_shop") || "Create Shop")}
                  </h3>
                  <button
                    onClick={handleFormCancel}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ShopForm 
                  onSubmit={handleFormSubmit} 
                  editingShop={editingShop} 
                  onCancel={handleFormCancel}
                />
              </div>
            </div>
          </div>
        )}

        {/* Shops Table */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getPhrase("shops") || "Shops"} ({shops.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-8 py-4 text-left text-lg font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getPhrase("shop_name") || "Shop Name"}
                  </th>
                  <th className="px-8 py-4 text-left text-lg font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getPhrase("region") || "Region"}
                  </th>
                  <th className="px-8 py-4 text-left text-lg font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getPhrase("district") || "District"}
                  </th>
                  <th className="px-8 py-4 text-left text-lg font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {getPhrase("actions") || "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-16 text-center">
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-10 w-10 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="ml-4 text-xl text-gray-600 dark:text-gray-400">{getPhrase("loading") || "Loading"}...</span>
                      </div>
                    </td>
                  </tr>
                ) : shops.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-16 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{getPhrase("no_shops") || "No shops"}</h3>
                        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{getPhrase("get_started_by_creating") || "Get started by creating a new shop."}</p>
                        <div className="mt-8">
                          <button
                            onClick={handleCreate}
                            className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {getPhrase("create_shop") || "Create Shop"}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  shops.map((shop) => (
                    <tr key={shop.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{shop.name}</div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-lg text-gray-500 dark:text-gray-400">{shop.region?.name || '-'}</div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-lg text-gray-500 dark:text-gray-400">{shop.district?.name || '-'}</div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-medium">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleEdit(shop)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-150 p-2"
                            title={getPhrase("edit") || "Edit"}
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(shop.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150 p-2"
                            title={getPhrase("delete") || "Delete"}
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="bg-white dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-8 mt-8 rounded-xl shadow-lg">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="relative inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-lg font-semibold rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getPhrase("previous") || "Previous"}
              </button>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                disabled={page === lastPage}
                className="ml-4 relative inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-lg font-semibold rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getPhrase("next") || "Next"}
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {getPhrase("showing_page") || "Showing page"} <span className="font-bold">{page}</span> {getPhrase("of") || "of"} <span className="font-bold">{lastPage}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">{getPhrase("previous") || "Previous"}</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                    disabled={page === lastPage}
                    className="relative inline-flex items-center px-4 py-3 rounded-r-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">{getPhrase("next") || "Next"}</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopList;
