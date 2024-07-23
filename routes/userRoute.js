import express from 'express';
import {getCryptoData} from "../controller/userController";

const router = express.Router();

router.get('/:name', getCryptoData);

export default router;
