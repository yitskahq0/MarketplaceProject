import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(name, email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registrasi gagal');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">Mari bergabung!</h1>
                    <p className="text-gray-500 text-lg">Bergabunglah dengan ribuan pembeli yang puas.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2 ml-1">Nama</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Masukkan nama anda"
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-black transition"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

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
                        className="w-full bg-black text-white font-bold py-4 rounded-full mt-8 hover:bg-gray-800 transition duration-300"
                    >
                        Daftar
                    </button>
                </form>

                <div className="mt-8 text-center flex justify-center items-center">
                    <span className="text-gray-500 mr-1">Anda sudah memiliki akun?</span>
                    <Link to="/login" className="text-black font-bold hover:underline">Masuk</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
