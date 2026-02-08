# Panduan Mengubungkan Mobile ke Backend (Integration Guide)

Saat ini aplikasi Mobile berjalan dalam **Standalone Mode** (menggunakan Dummy Data) agar bisa dijalankan tanpa backend.

Jika tim Backend Anda sudah siap dan ingin menghubungkan aplikasi Mobile ke Server (API), ikuti langkah-langkah berikut:

## 1. Konfigurasi `src/api.js`
Buka file `src/api.js` dan ubah `BASE_URL` sesuai dengan IP komputer/server backend Anda.
```javascript
// Ganti dengan IP komputer backend Anda
const BASE_URL = 'http://192.168.1.XX:5001/api'; 
```

## 2. Aktifkan API di `ProductListScreen.js`
Buka `src/screens/ProductListScreen.js`:
1.  Hapus/Komentari baris dummy data:
    ```javascript
    // const [products, setProducts] = useState(dummyProducts);
    const [products, setProducts] = useState([]); 
    ```
2.  Uncomment (aktifkan kembali) pemanggilan `fetchProducts`:
    ```javascript
    useEffect(() => {
        fetchProducts(); // Hapus tanda komentar //
        getUserData();
    }, []);
    ```
3.  Uncomment fungsi `fetchProducts`:
    ```javascript
    const fetchProducts = async () => { ... }
    ```

## 3. Aktifkan API di `ProductDetailScreen.js`
Buka `src/screens/ProductDetailScreen.js`:
1.  Uncomment pemanggilan `fetchProduct`:
    ```javascript
    useEffect(() => {
        fetchProduct(); // Hapus tanda komentar //
        // ... hapus logika dummy data ...
    }, [productId]);
    ```
2.  Uncomment fungsi `fetchProduct`:
    ```javascript
    const fetchProduct = async () => { ... }
    ```

## 4. Aktifkan API di `LoginScreen.js`
Buka `src/screens/LoginScreen.js`:
1.  Hapus bagian "MOCK LOGIN".
2.  Uncomment bagian API Call:
    ```javascript
    const response = await api.post('/auth/login', { email, password });
    // ... simpan token ...
    ```

## 5. Aktifkan API di `RegisterScreen.js`
Buka `src/screens/RegisterScreen.js`:
1.  Hapus bagian "MOCK REGISTER".
2.  Uncomment bagian API Call:
    ```javascript
    await api.post('/auth/register', { name, email, password });
    ```

---
**Catatan:** Pastikan Backend sudah berjalan (`npm start`) sebelum mencoba menghubungkan kembalo.
