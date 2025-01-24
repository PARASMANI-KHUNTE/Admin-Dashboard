import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://admin-dashboard-server-8ggt.onrender.com/api/admin/register', { email, password });
            if (response == 200){
                navigate('/login')
            }
          
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center">
                <h1 className="text-4xl mb-4">Welcome to Admin Dashboard</h1>
                <p className="text-lg">Please register to continue</p>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-3/4">
                    <h2 className="text-2xl mb-6">Admin Signup</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                    </div>
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;