# Marketplace Project

## Mobile App Setup
Agar aplikasi bisa berjalan di perangkat/emulator Anda, Anda harus mengganti alamat IP backend.

1.  Buka terminal (Command Prompt) dan ketik `ipconfig` untuk melihat IP address komputer Anda (contoh: `192.168.1.10`).
2.  Buka file `Mobile/src/api.js`.
3.  Cari baris `const BASE_URL` dan ganti angka IP-nya dengan IP komputer Anda.
    ```javascript
    // Contoh:
    const BASE_URL = 'http://192.168.1.10:5001/api'; 
    ```
4.  Jalankan backend: `npm start` (di folder Backend).
5.  Jalankan mobile: `npx expo start` (di folder Mobile).

## Struktur Project
- **Backend**: Express.js (API)
- **Frontend**: React + Vite (Web)
- **Mobile**: React Native + Expo (App)

## Cara Menjalankan Project

### 1. Backend (Server)
Terminal 1:
```bash
cd Backend
npm install  # Jika belum
npm run dev
```
*Server berjalan di http://localhost:5000*

### 2. Frontend (Web)
Terminal 2:
```bash
cd Frontend
npm install  # Jika belum
npm run dev
```
*Web berjalan di http://localhost:5173*

### 3. Mobile (App)
Terminal 3:
```bash
cd Mobile
npx expo start
```
*Scan QR Code menggunakan aplikasi Expo Go di HP Anda.*
