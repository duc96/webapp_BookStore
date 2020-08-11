const express = require('express');
var router = express.Router();
const HoaDon = 

router.get('/', (req, res) => {
    res.render('hoadon/tablehoadon');
});

router.get('/', (req, res) => {
    Sach.find((err, docs) => {
        if (!err) {
            res.render("sach/tablesach", {
                sachs: docs
            });
        }
        else {
            console.log('Lỗi sách, tìm lại đi :' + err);
        }
    });
});

module.exports = router;