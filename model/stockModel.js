import mongoose from "mongoose";




const Schema = mongoose.Schema;

const stockSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
},{
    timestamps:true,
});

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;
