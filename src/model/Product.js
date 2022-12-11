const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ma_dm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category product is required'],
  },
  ten_sp: {
    type: String,
    trim: true,
    minlength: 3,
    required: [true, 'Name product is required'],
  },
  gia_sp: {
    type: Number,
    required: [true, 'Price product is required'],
  },
  avatar: {
    type: String,
    required: [true, 'Image product is required'],
  },
  trang_thai: {
    type: Boolean,
    default: true,
  },
  khuyen_mai: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
