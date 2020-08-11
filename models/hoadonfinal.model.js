const mongoose = require("mongoose");
const NguoiDung = require("./nguoidung.model");

var HoaDonSchema = new mongoose.Schema({
  tenNguoiDung: { type: String, ref: NguoiDung },
  hoaDonFinals: { type: mongoose.Schema.Types.Array, require: true },
  giaTien: { type: Number },
});

module.exports = mongoose.model("HoaDon", HoaDonSchema);
