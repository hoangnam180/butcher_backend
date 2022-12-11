const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  ten_dm: {
    type: String,
    trim: true,
    minlength: 3,
    required: [true, 'Trường này không được để trống'],
  },
});

const Category = mongoose.model('Category', categoriesSchema);
module.exports = Category;
