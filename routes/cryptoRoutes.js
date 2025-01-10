const express = require("express");
const router = express.Router();
const CryptoPrice = require("../models/CryptoPrice");

// /stats API
router.get("/stats", async (req, res) => {
  try {
    const coin = req.query.coin;
    if (!coin) {
      return res.status(400).json({ error: "Coin parameter is required" });
    }

    const latestData = await CryptoPrice.findOne({ coinId: coin }).sort({
      timestamp: -1,
    });

    if (!latestData) {
      return res.status(404).json({ error: "No data found for this coin" });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData["24hChange"],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// /deviation API
router.get("/deviation", async (req, res) => {
  try {
    const coin = req.query.coin;
    if (!coin) {
      return res.status(400).json({ error: "Coin parameter is required" });
    }

    const prices = await CryptoPrice.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select("price -_id"); // Only fetch the price field

    if (prices.length === 0) {
      return res.status(404).json({ error: "No data found for this coin" });
    }

    const priceArray = prices.map((doc) => doc.price);
    const deviation = calculateStandardDeviation(priceArray);

    res.json({ deviation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to calculate standard deviation
function calculateStandardDeviation(prices) {
  const n = prices.length;
  const mean = prices.reduce((sum, price) => sum + price, 0) / n;
  const variance =
    prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / n;
  return Math.sqrt(variance);
}

module.exports = router;
