const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  nguoi_nhan: {
    type: String,
    required: [true, 'Nguoi nhan is required'],
  },
  sdt: {
    type: String,
    required: [true, 'So dien thoai is required'],
  },
  dia_chi: {
    type: String,
    required: [true, 'Dia chi is required'],
  },
  tong_tien: {
    type: Number,
    required: [true, 'Tong tien is required'],
  },
  ghi_chu: {
    type: String,
  },
  trang_thai: {
    type: Boolean,
    default: false,
  },
  gio_hang: {
    type: Array,
    required: [true, 'Gio hang is required'],
  },
});

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
