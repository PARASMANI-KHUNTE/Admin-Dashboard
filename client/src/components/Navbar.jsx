import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/"); // Navigate to the home page
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center gap-2">
          <img src="logo.jpg" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-gray-800">Hotel Management System</h1>
        </div>
        <ul className="flex items-center gap-6">
          <li>
            <Link className="text-gray-600 hover:text-blue-500 transition duration-300" to="/hotel">
              Hotels
            </Link>
          </li>
          <li>
            <Link className="text-gray-600 hover:text-blue-500 transition duration-300" to="/vehicle">
              Vehicle
            </Link>
          </li>
          <li>
            <Link className="text-gray-600 hover:text-blue-500 transition duration-300" to="/region">
              Regions
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 hover:bg-red-600 rounded transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;