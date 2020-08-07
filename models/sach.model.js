const mongoose = require('mongoose');

var SachSchema = new mongoose.Schema({
    tenSach: { type: String, require: true },
    maNhan: { type: String, required: true },
    tenLoai: { type: String, require: true },
    tacGia: { type: String, require: false },
    nhaXuatBan: { type: String, require: false },
    namXuatBan: { type: String, require: false },
    taiBan: { type: String, require: false },
    hinh: { type: String, require: false },
});

module.exports = mongoose.model('Sach', SachSchema);