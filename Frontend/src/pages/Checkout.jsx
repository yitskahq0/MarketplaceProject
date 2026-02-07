import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        paymentMethod: 'transfer'
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (storedCart.length === 0) {
            navigate('/cart');
        }
        setCartItems(storedCart);
    }, [navigate]);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock checkout process
        alert(`Pesanan Berhasil! Total: Rp ${totalPrice.toLocaleString('id-ID')}\nDikirim ke: ${formData.address}`);
        localStorage.removeItem('cart');
        navigate('/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Informasi Pengiriman</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nama Penerima</label>
                            <input
                                type="text"
                                value={user?.name || ''}
                                disabled
                                className="w-full px-3 py-2 border rounded bg-gray-100"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Alamat Lengkap</label>
                            <textarea
                                required
                                className="w-full px-3 py-2 border rounded focus:border-blue-500 outline-none"
                                rows="3"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nomor Telepon</label>
                            <input
                                type="tel"
                                required
                                className="w-full px-3 py-2 border rounded focus:border-blue-500 outline-none"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Metode Pembayaran</label>
                            <select
                                className="w-full px-3 py-2 border rounded focus:border-blue-500 outline-none"
                                value={formData.paymentMethod}
                                onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                            >
                                <option value="transfer">Transfer Bank</option>
                                <option value="cod">Cash on Delivery (COD)</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                        >
                            Buat Pesanan
                        </button>
                    </form>
                </div>

                <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
                        <ul className="mb-4 space-y-2">
                            {cartItems.map(item => (
                                <li key={item._id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-blue-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
