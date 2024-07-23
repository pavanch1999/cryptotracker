import Stock from "../model/stockModel";
import asyncHandler from "../middleware/asynchandler";

const getStocks=asyncHandler (async(req,res)=>{
    const stocks= await Stock.find({});
    res.json(stocks);
});
const createStocks=asyncHandler (async(req,res)=>{
    const stock=new Stock({
        name: 'Sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numreviews : 0,
        description : 'Sample description', 
    })
    const createdStock = await stock.save();
    res.status(201).json(createdStock);

});

export {getStocks,createStocks};