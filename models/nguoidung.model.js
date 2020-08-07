const mongoose = require('mongoose');

var NguoiDungSchema = new mongoose.Schema({
    tenNguoiDung: {type: String},
    matKhau: {type: String},
    email: {type: String},
    sdt: {type: String},
    soDu: {type: String},    
});

module.exports = mongoose.model('NguoiDung', NguoiDungSchema);