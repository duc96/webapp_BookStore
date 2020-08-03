const express = require('express');
var router = express.Router();
const Sach = require("../models/sach.model");
const CauHoi = require("../models/cauhoi.model");

router.get('/cauhoi', (req,res)=>{
    res.render('sach/chitietsach');
});

router.get('/addOrEdit', (req, res) => {
    res.render('sach/addOrEdit', { viewTitle: "Thêm sách" });
});

router.get('/chitietsach', function (req, res) {
    res.render('sach/chitietsach', { layout: false });
});

router.post('/', (req, res) => {

    if (req.body._id == '') {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
});


function insertRecord(req, res) {
    var sach = new Sach();
    sach.tenSach = req.body.tenSach;
    sach.maNhan = req.body.maNhan;
    sach.tenLoai = req.body.tenLoai;
    sach.tacGia = req.body.tacGia;
    sach.nhaXuatBan = req.body.nhaXuatBan;
    sach.namXuatBan = req.body.namXuatBan;
    sach.taiBan = req.body.taiBan;
    sach.save((err, doc) => {
        if (!err)
            res.redirect('sach/tablesach');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("sach/tablesach", {
                    viewTitle: "Thêm Sách",
                    sach: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Sach.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        console.log(doc);
        if (!err) { res.redirect('sach/tablesach'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("sach/addOrEdit", {
                    viewTitle: 'Cập nhật sách',
                    sach: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


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


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    
    Sach.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("sach/chitietsach");
        }
    });
});

router.get('/update/:id', (req, res) => {
    Sach.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("sach/addOrEdit", {
                viewTitle: "Cập nhật sách",
                sach: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Sach.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/sach/tablesach');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;