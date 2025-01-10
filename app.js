const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cryptoRoutes = require("./routes/cryptoRoutes");
const fetchPrices = require("./jobs/fetchPrices");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Validate environment variables
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in the environment variables");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Use the crypto routes
app.use("/", cryptoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initial price fetch
(async () => {
  try {
    await fetchPrices();
    console.log("Initial price fetch complete.");
  } catch (err) {
    console.error("Error fetching prices:", err);
  }
})();

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error disconnecting from MongoDB", err);
  } finally {
    process.exit(0);
  }
});
