const mongoose = require('mongoose');
const MaQuanTriVien = require('./quantrivien.model');
var CauHoiSchema = new mongoose.Schema({
    maSach: {type: String, require:true},
    maQuanTriVien: {type: mongoose.Schema.Types.ObjectId, ref:MaQuanTriVien},           
});

module.exports = mongoose.model('CauHoi', CauHoiSchema);