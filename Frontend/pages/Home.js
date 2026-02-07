import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to Our Marketplace</h1>
      <p>Temukan produk terbaik dengan harga terbaik</p>

      <Link to="/products">
        <button>Lihat Produk</button>
      </Link>
    </div>
  );
}
