import express from 'express';
import connectDB from '../config/db.js';
import getCryptoData from '../controller/userController.js';
import cors from 'cors';
import startPolling from './polltime.js';
import Stock from '../model/stockModel.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
startPolling();
app.get('/latest-stocks', async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 }).limit(20);
    res.json(stocks);
    console.log("fetching from db");
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
