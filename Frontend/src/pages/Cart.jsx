import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(storedCart);
    }, [user, navigate]);

    const updateQuantity = (id, change) => {
        const newCart = cartItems.map(item => {
            if (item._id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removeItem = (id) => {
        const newCart = cartItems.filter(item => item._id !== id);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        alert("Fitur Checkout belum diimplementasikan (Tahap selanjutnya)");
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Keranjang Belanja Kosong</h2>
                <Link to="/products" className="text-blue-600 hover:underline">Mulai Belanja</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Keranjang Belanja</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
                            <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="flex items-center justify-center h-full text-gray-400 text-xs">No img</span>
                                )}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-blue-600 font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item._id, -1)}
                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                                >-</button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item._id, 1)}
                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                                >+</button>
                            </div>
                            <button
                                onClick={() => removeItem(item._id)}
                                className="text-red-500 hover:text-red-700 ml-4"
                            >
                                Hapus
                            </button>
                        </div>
                    ))}
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Total Barang</span>
                            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between mb-6">
                            <span className="font-bold text-lg">Total Harga</span>
                            <span className="font-bold text-lg text-blue-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
