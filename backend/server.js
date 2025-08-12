const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

mongoose.connect("mongodb://localhost:27017/mini-ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(8000, () => console.log("Server running on port 8000"));