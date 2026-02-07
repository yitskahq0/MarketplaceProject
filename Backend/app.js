const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors());
app.use(express.json());

//CRUD product
const productRoutes = require("./routes/products");

app.use("/api/products", productRoutes);

// routes
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Kita Berjalan ");
});

//middleware auth TEST
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Akses ke route terlindungi berhasil", user: req.user });
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
