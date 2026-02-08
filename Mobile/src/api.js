import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';


// =================================================================
// KONFIGURASI IP (WAJIB DIGANTI JIKA PINDAH KOMPUTER/WIFI)
// Ganti '192.168.100.235' dengan IP Address komputer Anda.
// Cara cek IP di Windows: Buka cmd, ketik 'ipconfig', lihat IPv4 Address.
// =================================================================
const BASE_URL = 'http://192.168.100.235:5001/api';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Response Error:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;
