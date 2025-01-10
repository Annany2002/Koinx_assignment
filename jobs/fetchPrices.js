const cron = require("node-cron");
const axios = require("axios");
const mongoose = require("mongoose");
const CryptoPrice = require("../models/CryptoPrice");
require("dotenv").config();

const coinIds = ["bitcoin", "matic-network", "ethereum"];

const fetchPrices = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: coinIds.join(","),
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
      }
    );

    const data = response.data;

    for (const coinId of coinIds) {
      const priceData = {
        coinId,
        price: data[coinId].usd,
        marketCap: data[coinId].usd_market_cap,
        "24hChange": data[coinId].usd_24h_change,
      };

      await CryptoPrice.create(priceData);
    }

    console.log("Prices fetched and stored successfully!");
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
};

// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", fetchPrices);

module.exports = fetchPrices;
