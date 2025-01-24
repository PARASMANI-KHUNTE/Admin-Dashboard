import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-100">
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <img src="logo.jpg" alt="Logo" className="h-10 w-10" />
                    <h1 className="text-xl font-bold text-gray-800">Hotel Management System</h1>
                </div>
                <ul className="flex gap-6">
                    <li><Link className="text-gray-600 hover:text-blue-500" to="/">Home</Link></li>
                    <li><Link className="text-gray-600 hover:text-blue-500" to="/login">Login</Link></li>
                    <li><Link className="text-gray-600 hover:text-blue-500" to="/signup">Register</Link></li>
                </ul>
            </nav>
            <section className="">
                <div className="h-170 flex flex-col items-center justify-center py-20 bg-cover bg-center" style={{ backgroundImage: `url(${'/hotel.jpg'})` }}>
                    <h2 className="text-4xl font-bold text-white mb-4">Welcome to Our Hotel Management System</h2>
                    <p className="text-lg text-white max-w-2xl text-center">
                        Our Hotel Management System offers a comprehensive solution for managing your hotel operations efficiently. From booking management to customer service, we provide all the tools you need to ensure a seamless experience for your guests.
                    </p>
                    <Link to="/signup" className="mt-8 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded hover:bg-blue-600">
                        Get Started
                    </Link>
                </div>
            </section>
            <footer className="bg-blue-600 text-white p-8 mt-auto">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">Hotel Management</h1>
                        <p className="mt-2 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit vitae odio a rutrum. Aenean eget nisl condimentum, tristique ligula pulvinar, gravida tellus. Nulla id orci nec nulla facilisis tincidunt. Integer non libero nec nulla facilisis tincidunt.
                        </p>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">Quick Links</h2>
                        <ul className="mt-2 space-y-2">
                            <li><Link className="hover:underline" to="/">Home</Link></li>
                            <li><Link className="hover:underline" to="/login">Login</Link></li>
                            <li><Link className="hover:underline" to="/signup">Register</Link></li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">Contact Us</h2>
                        <p className="mt-2 text-sm">
                            1234 Street Name, City, State, 12345
                        </p>
                        <p className="mt-2 text-sm">
                            Email: info@hotelmanagement.com
                        </p>
                        <p className="mt-2 text-sm">
                            Phone: (123) 456-7890
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
