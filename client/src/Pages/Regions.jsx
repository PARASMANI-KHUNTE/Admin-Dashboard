import  { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', subRegions: [] });
  const [editRegionId, setEditRegionId] = useState(null);
  const [subRegionOptions, setSubRegionOptions] = useState(['East Asia', 'South Asia', 'Western Europe', 'Eastern Europe', 'North America', 'South America']);

  useEffect(() => {
    fetchRegions();
  }, []);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubRegionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, subRegions: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRegionId) {
        await axios.put(`https://admin-dashboard-server-8ggt.onrender.com/api/regions/${editRegionId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('https://admin-dashboard-server-8ggt.onrender.com/api/regions', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setShowForm(false);
      setFormData({ name: '', subRegions: [] });
      setEditRegionId(null);
      fetchRegions();
    } catch (err) {
      console.error('Error saving region:', err);
    }
  };

  const handleEdit = (region) => {
    setFormData({ name: region.name, subRegions: region.subRegions });
    setEditRegionId(region._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://admin-dashboard-server-8ggt.onrender.com/api/regions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchRegions();
    } catch (err) {
      console.error('Error deleting region:', err);
    }
  };

  return (
   <>
   <Navbar />
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search regions..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Add Region Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {showForm ? 'Hide Form' : 'Add Region'}
      </button>

      {/* Region Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Region Name</label>
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
            <label className="block text-sm font-medium text-gray-700">Sub-Regions</label>
            <select
              multiple
              value={formData.subRegions}
              onChange={handleSubRegionChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {subRegionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {editRegionId ? 'Update Region' : 'Add Region'}
          </button>
        </form>
      )}

      {/* Regions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRegions.map((region) => (
          <div key={region._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2 text-blue-600">{region.name}</h2>
            <p className="text-gray-700 mb-4">
              <strong>Sub-Regions:</strong> {region.subRegions.join(', ')}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(region)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(region._id)}
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

export default Regions;