const mongoose = require("mongoose");
const NguoiDung = require("../models/nguoidung.model");

var HoaDonSchema = new mongoose.Schema({
  maNguoiDung: { type: mongoose.Schema.Types.ObjectId, ref: NguoiDung },
  ngayPhatSinh: { type: String, required: true },
  tienThanhToan: { type: String, required: true },
});

// module.exports = mongoose.model('HoaDon', HoaDonSchema);
