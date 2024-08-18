import mongoose from "mongoose";




const Schema = mongoose.Schema;

const stockSchema = new Schema({
  btcprice: {
    type: String,
    required: true
  },
  dogeprice: {
    type: String,
    required: true
  },
  ethprice: {
    type: String,
    required: true
  },
  shibprice: {
    type: String,
    required: true
  },
  solprice: {
    type: String,
    required: true
  },
},{
    timestamps:true,
});

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;
