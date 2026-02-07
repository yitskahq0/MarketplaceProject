import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Selamat Datang di <span className="text-blue-600">MarketPlace</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Temukan produk terbaik dengan harga terjangkau. Belanja mudah, aman, dan cepat.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Mulai Belanja
                    </Link>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-blue-600 text-4xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold mb-2">Produk Lengkap</h3>
                        <p className="text-gray-500">Berbagai macam kategori produk tersedia untuk Anda.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-blue-600 text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-semibold mb-2">Pengiriman Cepat</h3>
                        <p className="text-gray-500">Pesanan Anda akan segera diproses dan dikirim.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-blue-600 text-4xl mb-4">🛡️</div>
                        <h3 className="text-xl font-semibold mb-2">Aman Terpercaya</h3>
                        <p className="text-gray-500">Traksaksi aman dengan jaminan kepuasan pelanggan.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
