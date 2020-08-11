const mongoose = require('mongoose');
const QuanTriVien = require('./quantrivien.model');
const Sach = require('./sach.model');

var CauHoiSchema = new mongoose.Schema({
    maSach: {type: mongoose.Schema.Types.ObjectId, ref:Sach},
    cauTraLoi: {type: String, require:true},
    cauHoi: {type: String, require:true},     
    gia: {type: String, require:true}         
});

module.exports = mongoose.model('CauHoi', CauHoiSchema);
