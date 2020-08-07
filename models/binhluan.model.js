const mongoose = require('mongoose');
const Sach = require('./sach.model');
const NguoiDung = require('./nguoidung.model');

var BinhLuanSchema = new mongoose.Schema({
    maSach: {type: mongoose.Schema.Types.ObjectId, ref:Sach},
    tenNguoiDung: {type: String, require:true},               
    ndBL: {type: String, require: true}                
});

module.exports = mongoose.model('BinhLuan', BinhLuanSchema);
