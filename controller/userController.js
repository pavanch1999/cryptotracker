import Stock from '../model/stockModel.js';

const getCryptoData = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await Stock.find({name}).sort({ timestamp: -1 }).limit(20);
    res.json(data);
    // console.log(res.json(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default getCryptoData;