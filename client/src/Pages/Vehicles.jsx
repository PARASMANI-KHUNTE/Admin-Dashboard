import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [regions, setRegions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ type: '', price: '', regionId: '' });
  const [editVehicleId, setEditVehicleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('type'); // 'type' or 'price'

  // Get the token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchVehicles();
    fetchRegions();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('https://admin-dashboard-server-8ggt.onrender.com/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    }
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.get('https://admin-dashboard-server-8ggt.onrender.com/api/regions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegions(response.data);
    } catch (err) {
      console.error('Error fetching regions:', err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      if (editVehicleId) {
        await axios.put(`https://admin-dashboard-server-8ggt.onrender.com/api/vehicles/${editVehicleId}`, formData, config);
      } else {
        await axios.post('https://admin-dashboard-server-8ggt.onrender.com/api/vehicles', formData, config);
      }
      setShowForm(false);
      setFormData({ type: '', price: '', regionId: '' });
      setEditVehicleId(null);
      fetchVehicles();
    } catch (err) {
      console.error('Error saving vehicle:', err);
    }
  };

  const handleEdit = (vehicle) => {
    setFormData({ type: vehicle.type, price: vehicle.price, regionId: vehicle.regionId });
    setEditVehicleId(vehicle._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://admin-dashboard-server-8ggt.onrender.com/api/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVehicles();
    } catch (err) {
      console.error('Error deleting vehicle:', err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (searchCategory === 'type') {
      return vehicle.type.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchCategory === 'price') {
      return vehicle.price.toString().includes(searchTerm);
    }
    return true;
  });

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Search Bar */}
        <div className="mb-8 flex items-center space-x-4">
          <select
            value={searchCategory}
            onChange={handleSearchCategoryChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="type">Type</option>
            <option value="price">Price</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchCategory}...`}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Add Vehicle Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Hide Form' : 'Add Vehicle'}
        </button>

        {/* Vehicle Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Region</label>
              <select
                name="regionId"
                value={formData.regionId}
                onChange={handleFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a region</option>
                {regions.map((region) => (
                  <option key={region._id} value={region._id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {editVehicleId ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </form>
        )}

        {/* Vehicles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2 text-blue-600">{vehicle.type}</h2>
              <p className="text-gray-700 mb-2"><strong>Price:</strong> ${vehicle.price}</p>
              <p className="text-gray-700 mb-4"><strong>Region:</strong> {regions.find(region => region._id === vehicle.regionId)?.name}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Vehicles;