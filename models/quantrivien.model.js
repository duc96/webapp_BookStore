const mongoose = require('mongoose');

var QuanTriVienSchema = new mongoose.Schema({
    email: {type: String, require:true},
    matKhau: {type: String, require:true},           
});

module.exports = mongoose.model('QuanTriVien', QuanTriVienSchema);