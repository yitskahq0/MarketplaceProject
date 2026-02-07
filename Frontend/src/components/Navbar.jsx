import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false); // Close menu on logout
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md relative z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-xl font-bold text-blue-600">MarketPlace</Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                        <Link to="/products" className="text-gray-600 hover:text-blue-600">Produk</Link>
                        {user && (
                            <Link to="/cart" className="text-gray-600 hover:text-blue-600">Keranjang</Link>
                        )}

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-800">Hi, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 focus:outline-none hover:text-blue-600 transition"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar/Drawer */}
            <div className={`fixed inset-0 z-40 md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-50' : 'opacity-0'}`}
                    onClick={closeMenu}
                />

                {/* Sidebar Content */}
                <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-bold text-blue-600">Menu</span>
                            <button onClick={closeMenu} className="text-gray-500 hover:text-gray-700">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 text-lg py-2 border-b border-gray-100">Home</Link>
                            <Link to="/products" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 text-lg py-2 border-b border-gray-100">Produk</Link>
                            {user && (
                                <Link to="/cart" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 text-lg py-2 border-b border-gray-100">Keranjang</Link>
                            )}

                            {user ? (
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <p className="text-gray-500 mb-4">Logged in as <span className="font-semibold text-gray-800">{user.name}</span></p>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-8 flex flex-col space-y-3">
                                    <Link to="/login" onClick={closeMenu} className="w-full text-center border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Login</Link>
                                    <Link to="/register" onClick={closeMenu} className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
