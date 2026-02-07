import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md px-8">
                {/* Back Button Placeholder if needed */}
                <div className="mb-8">
                    {/* <button className="p-2 rounded-full bg-black text-white"><ArrowLeft size={20} /></button> */}
                </div>

                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">Hai!</h1>
                    <p className="text-gray-500 text-lg">Masuk untuk berbelanja.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Masukkan email anda"
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-black transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 ml-1">Kata sandi</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-black transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-full mt-8 hover:bg-black hover:text-white transition duration-300"
                    >
                        Masuk
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        Belum punya akun? <Link to="/register" className="text-black font-bold hover:underline">Daftar sekarang</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
