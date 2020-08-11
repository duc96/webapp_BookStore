const mongoose = require('mongoose');
const HoaDon = require('./hoadon.model');
const Sach = require('./sach.model');
const CauHoi = require('./cauhoi.model');

var HoaDonChiTietSchema = new mongoose.Schema({
    maHoaDon: {type: mongoose.Schema.Types.ObjectId, ref:HoaDon },
    maSach: {type: mongoose.Schema.Types.ObjectId, ref:Sach},
    maCauHoi: {type: mongoose.Schema.Types.ObjectId, ref:CauHoi},  
});

module.exports = mongoose.model('HoaDonChiTiet', HoaDonChiTietSchema);