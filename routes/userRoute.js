import express from "express"
import getStocks from "../controller/userController.js";
const router=express.Router();
router.route('/').get(getStocks)


export default router;