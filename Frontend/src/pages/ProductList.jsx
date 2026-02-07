import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { ShoppingCart, Bell, MessageCircle, Heart, Search, User } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState({ name: 'Pengguna' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                setError(err.message || "Gagal memuat produk");
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = () => {
            // Mock user fetch or get from local storage/context
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Error parsing user", e);
                }
            }
        };

        fetchProducts();
        fetchUser();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen text-red-500">
            {error}
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h2 className="text-gray-500 text-sm">Selamat berbelanja</h2>
                    <h1 className="text-2xl font-bold flex items-center">
                        {user.name || 'Pengguna'}!
                    </h1>
                </div>
                <div className="flex space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                        <MessageCircle size={24} />
                        {/* <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full"></span> */}
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                        <ShoppingCart size={24} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                        <Bell size={24} />
                    </button>
                </div>
            </header>

            {/* Search Bar (Optional based on typical design, but let's keep it simple to match mobile which didn't show one explicitly in the grid screenshot but implies it might be there, or just the grid) */}
            {/* <div className="px-6 py-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Cari produk..." 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
            </div> */}

            {/* Product Grid */}
            <main className="px-6 py-4">
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <p className="text-gray-500">Belum ada produk tersedia.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <Link
                                to={`/products/${product._id}`}
                                key={product._id}
                                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition duration-300"
                            >
                                {/* Image Container */}
                                <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <div className="text-center">
                                                <span className="block text-4xl mb-2">📷</span>
                                                <span className="text-sm">No Image</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Heart Icon Overlay */}
                                    <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition shadow-sm">
                                        <Heart size={18} className="text-gray-600 hover:text-red-500 transition" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate mb-1">{product.name}</h3>
                                    <p className="text-gray-500 font-medium text-sm">
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProductList;
