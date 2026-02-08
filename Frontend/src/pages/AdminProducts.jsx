import { useEffect, useState } from "react";
import api from "../api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setError("");
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      await api.post("/products", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Produk berhasil ditambahkan");

      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
      });

      fetchProducts();
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Gagal menambahkan produk";
      setError(message);
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Produk berhasil dihapus");
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus produk");
    }
  };

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
        Admin Products
      </h1>

      {error && (
        <div style={{ 
          padding: 12, 
          marginBottom: 16, 
          backgroundColor: "#fee", 
          color: "#c00",
          borderRadius: 6 
        }}>
          {error}
        </div>
      )}

      {/* FORM CREATE */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16 }}>Tambah Produk</h3>

        <input
          name="name"
          placeholder="Nama produk"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <input
          name="price"
          type="number"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <input
          name="image"
          placeholder="URL gambar (opsional)"
          value={form.image}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <button 
          type="submit" 
          disabled={submitting}
          style={{ 
            padding: "10px 20px", 
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1
          }}
        >
          {submitting ? "Menambahkan..." : "Tambah Produk"}
        </button>
      </form>

      {/* LIST PRODUK */}
      <h3>Daftar Produk</h3>
      <p style={{ marginBottom: 16 }}>Total produk: {products.length}</p>

      {products.length === 0 ? (
        <p style={{ color: "#666" }}>Belum ada produk.</p>
      ) : (
        <ul style={{ marginTop: 16, listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product._id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                marginBottom: 8,
                borderRadius: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong>{product.name}</strong> <br />
                Rp {product.price.toLocaleString("id-ID")} <br />
                <small style={{ color: "#666" }}>{product.description}</small>
              </div>
              <button 
                onClick={() => handleDelete(product._id)}
                style={{ 
                  backgroundColor: "#dc3545", 
                  color: "white", 
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 4,
                  cursor: "pointer"
                }}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProducts;