const Category = require('../model/Category');
const Product = require('../model/Product');
//[GET]
class AdminController {
  getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      console.log(products);
      if (!products) {
        return res.status(404).json({ message: 'Products not found' });
      }
      return res.json({
        status: 200,
        data: products,
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
}

module.exports = new AdminController();
