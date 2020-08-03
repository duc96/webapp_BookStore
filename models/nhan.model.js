const mongoose = require('mongoose');
const maSach = require('./sach.model');
var nhanSchema = new mongoose.Schema({
    maSach: {type: mongoose.Schema.Types.ObjectId, ref: maSach},
    maNhan: {type: String, require:true},
    tenNhan: {type: String, require:true},
    hinhNhan: {type: String, require:true},        
});

module.exports = mongoose.model('MaNhan', nhanSchema);