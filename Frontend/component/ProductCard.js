import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "10px",
      margin: "10px"
    }}>
      <h3>{item.name}</h3>
      <p>Rp {item.price}</p>

      <Link to={`/products/${item._id}`}>
        <button>Detail</button>
      </Link>
    </div>
  );
}
