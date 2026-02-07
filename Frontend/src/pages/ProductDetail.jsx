import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Gagal memuat produk");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Simple LocalStorage Cart Implementation for now
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item._id === product._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produk berhasil ditambahkan ke keranjang!');

        // Optional: trigger cart update event if using Context (skipped for simplicity in this step)
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-10">Produk tidak ditemukan</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-sm">
                <div className="w-full md:w-1/2">
                    <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 text-xl">No Image</span>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl text-blue-600 font-bold mb-6">Rp {product.price.toLocaleString('id-ID')}</p>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            {user ? '+ Keranjang' : 'Login untuk Beli'}
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
