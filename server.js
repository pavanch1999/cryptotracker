import express from 'express';
import connectDB from './config/db.js';
import cryptoRoutes from './controller/userController.js';
import cors from 'cors';
import startPolling from './polltime.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/crypto', cryptoRoutes);
startPolling();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
