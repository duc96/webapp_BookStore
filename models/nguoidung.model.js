const mongoose = require("mongoose");

var NguoiDungSchema = new mongoose.Schema({
  tenNguoiDung: { type: String },
  matKhau: { type: String },
  email: { type: String },
  sdt: { type: String },
  soDu: { type: String },
  tag1: { type: String },
  tag2: { type: String },
  daLamSurvey: { type: Boolean },
});

module.exports = mongoose.model("NguoiDung", NguoiDungSchema);
