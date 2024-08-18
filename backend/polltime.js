
import { fetchMultipleCoinsData } from "./fetchapi.js";
import Stock from "../model/stockModel.js";

const insertCryptoData = async () => {
  try {
    const apiData = await fetchMultipleCoinsData();
    await Stock.create({
      btcprice:apiData[0] ,
      dogeprice: apiData[1],
      ethprice: apiData[2],
      shibprice: apiData[3],
      solprice: apiData[4],
    });
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const startPolling = async () => {
  // await connectDB();

  setInterval(async () => {
    await insertCryptoData();
  }, 5000);
};

export default startPolling;
