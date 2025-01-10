const express = require("express");
const mongoose = require("mongoose");
const cryptoRoutes = require("./routes/cryptoRoutes");
const fetchPrices = require("./jobs/fetchPrices");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());

// Use the crypto routes
app.use("/", cryptoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start fetching prices immediately
fetchPrices();
