const mongoose = require('mongoose');
const NguoiDung = require("./nguoidung.model");

var HoaDonFinalSchema = new mongoose.Schema({
    tenNguoiDung: {type: String, ref: NguoiDung},
    hoaDon: {type: mongoose.Schema.Types.Array, require: true}        
});

module.exports = mongoose.model('HoaDonFinal', HoaDonFinalSchema);