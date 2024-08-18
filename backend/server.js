import express from 'express';
import connectDB from '../config/db.js';

import cors from 'cors';
import startPolling from './polltime.js';
import Stock from '../model/stockModel.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
startPolling();
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const changeStream = Stock.watch();

  changeStream.on('change', (change) => {
    // Ensure the event data is formatted correctly for SSE
    if (change.fullDocument) {
      res.write(`data: ${JSON.stringify(change.fullDocument)}\n\n`);
    }
  });

  req.on('close', () => {
    changeStream.close();
  });

  changeStream.on('error', (error) => {
    console.error('Change stream error:', error);
    res.end(); // Close the connection on error
  });
});
app.get('/latest-stocks', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
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
