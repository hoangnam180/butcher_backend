const Bill = require('../model/Bill');
const Category = require('../model/Category');
const Product = require('../model/Product');
//[GET]
class AdminController {
  getProducts = async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 11;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const skip = (page - 1) * limit;
      const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .populate('ma_dm');
      if (!products) {
        return res.status(404).json({ message: 'Products not found' });
      }
      const total = await Product.countDocuments();
      return res.json({
        status: 200,
        data: products,
        total,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      if (!categories) {
        return res.status(404).json({ message: 'Categories not found' });
      }
      return res.json({
        status: 200,
        data: categories,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.find({ ma_dm: id }).populate('ma_dm');
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json({
        status: 200,
        data: product,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  createBill = async (req, res) => {
    try {
      const { nguoi_nhan, sdt, dia_chi, tong_tien, ghi_chu, gio_hang } =
        req.body;
      if (!nguoi_nhan || !sdt || !dia_chi || !tong_tien || !gio_hang) {
        return res.status(400).json({ message: 'Bad request' });
      }
      const bill = await Bill.create({
        nguoi_nhan,
        sdt,
        dia_chi,
        tong_tien,
        ghi_chu,
        gio_hang,
      });
      return res.json({
        status: 200,
        data: bill,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}

module.exports = new AdminController();
