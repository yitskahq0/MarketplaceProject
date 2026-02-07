import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";   // ⭐ TAMBAHAN

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
       .then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map(p => (
        <ProductCard key={p._id} item={p} />
      ))}

    </div>
  );
}
