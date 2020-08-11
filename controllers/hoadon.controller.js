const express = require('express');
var router = express.Router();
const HoaDon = require("../models/hoadon.model");

router.get('/', (req, res) => {
    HoaDon.find((err, docs) => {
        if (!err) {
            res.render("sach/tablesach", {
                hoadons: docs
            });
        }
        else {
            console.log('Lỗi sách, tìm lại đi :' + err);
        }
    });
});

module.exports = router;