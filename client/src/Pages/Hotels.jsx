import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [regions, setRegions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', address: '', regionId: '' });
  const [editHotelId, setEditHotelId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('name'); // 'name', 'price', or 'region'

  useEffect(() => {
    fetchHotels();
    fetchRegions();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('https://admin-dashboard-server-8ggt.onrender.com/api/hotels', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setHotels(response.data);
    } catch (err) {
      console.error('Error fetching hotels:', err);
    }
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.get('https://admin-dashboard-server-8ggt.onrender.com/api/regions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
      if (editHotelId) {
        await axios.put(`https://admin-dashboard-server-8ggt.onrender.com/api/hotels/${editHotelId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('https://admin-dashboard-server-8ggt.onrender.com/api/hotels', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setShowForm(false);
      setFormData({ name: '', price: '', address: '', regionId: '' });
      setEditHotelId(null);
      fetchHotels();
    } catch (err) {
      console.error('Error saving hotel:', err);
    }
  };

  const handleEdit = (hotel) => {
    setFormData({ name: hotel.name, price: hotel.price, address: hotel.address, regionId: hotel.regionId });
    setEditHotelId(hotel._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://admin-dashboard-server-8ggt.onrender.com/api/hotels/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchHotels();
    } catch (err) {
      console.error('Error deleting hotel:', err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  // Filter hotels based on search term and category
  const filteredHotels = hotels.filter((hotel) => {
    if (searchCategory === 'name') {
      return hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchCategory === 'price') {
      return hotel.price.toString().includes(searchTerm);
    } else if (searchCategory === 'region') {
      const region = regions.find((region) => region._id === hotel.regionId);
      return region?.name.toLowerCase().includes(searchTerm.toLowerCase());
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
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="region">Region</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchCategory}...`}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Add Hotel Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Hide Form' : 'Add Hotel'}
        </button>

        {/* Hotel Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
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
              {editHotelId ? 'Update Hotel' : 'Add Hotel'}
            </button>
          </form>
        )}

        {/* Hotels List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div key={hotel._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2 text-blue-600">{hotel.name}</h2>
              <p className="text-gray-700 mb-2"><strong>Price:</strong> ${hotel.price}</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> {hotel.address}</p>
              <p className="text-gray-700 mb-4">
                <strong>Region:</strong> {regions.find((region) => region._id === hotel.regionId)?.name}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(hotel)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hotel._id)}
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

export default Hotels;