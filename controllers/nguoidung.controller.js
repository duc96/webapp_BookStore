const express = require('express');
var router = express.Router();
const NguoiDung = require("../models/nguoidung.model");

router.get('/', (req, res) => {

    NguoiDung.find((err, docs) => {
        if (!err) {
            res.render('nguoidung/tablenguoidung', {nguoidungs: docs});        
        }
        else {
            console.log('Lỗi sách, tìm lại đi :' + err);
        }
    });
});

module.exports = router;