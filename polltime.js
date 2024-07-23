import connectDB from "./config/db.js";
import { fetchMultipleCoinsData } from "./fetchapi.js";
import Stock from "./model/stockModel.js";
import mongoose from "mongoose";

const insertCryptoData = async () => {
  try {
    const apiData = await fetchMultipleCoinsData();
    const cryptos = apiData.map(data => {
      const [name, price] = data.split(' ');
      return {
        name,
        price: parseFloat(price)
      };
    });

    await Stock.insertMany(cryptos);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const startPolling = async () => {
  await connectDB();

  setInterval(async () => {
    await insertCryptoData();
  }, 10000);
};

export default startPolling;
