import React, { useState, useEffect } from "react";
import axios from "axios";
import { getPhrase } from "../../utils/GetPhrase";

const ShopForm = ({ editingShop, onSubmit }) => {
  const [form, setForm] = useState({ name: "", region_id: "", district_id: "" });
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8008/api/v1/regions").then(res => setRegions(res.data));
  }, []);

  useEffect(() => {
    if (form.region_id) {
      axios.get(`http://127.0.0.1:8008/api/v1/districts/${form.region_id}`).then(res => {
        setDistricts(res.data);
      });
    } else {
      setDistricts([]);
    }
  }, [form.region_id]);

  useEffect(() => {
    if (editingShop) {
      setForm({
        name: editingShop.name,
        region_id: editingShop.region_id,
        district_id: editingShop.district_id,
      });
    } else {
      setForm({ name: "", region_id: "", district_id: "" });
    }
  }, [editingShop]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingShop) {
      await axios.put(`http://127.0.0.1:8008/api/v1/shops/${editingShop.id}`, form);
    } else {
      await axios.post("http://127.0.0.1:8008/api/v1/shops", form);
    }
    onSubmit();
    setForm({ name: "", region_id: "", district_id: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {getPhrase("shop_name")}
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder={getPhrase("shop_name")}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {getPhrase("select_region")}
        </label>
        <select
          name="region_id"
          value={form.region_id}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">{getPhrase("select_region")}</option>
          {regions.map(region => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {getPhrase("select_district")}
        </label>
        <select
          name="district_id"
          value={form.district_id}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">{getPhrase("select_district")}</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition 
          ${editingShop ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {editingShop ? getPhrase("update_shop") : getPhrase("create_shop")}
      </button>
    </form>
  );
};

export default ShopForm;
