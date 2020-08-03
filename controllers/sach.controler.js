const express = require('express');
var router = express.Router();
const Sach = require("../models/sach.model");
const CauHoi = require("../models/cauhoi.model");

router.get('/sach', (req, res) => {
    res.render('sach/tablesach', { viewTitle: "Thêm sách" });
});

router.get('/addOrEdit', (req, res) => {
    res.render('sach/addOrEdit', { viewTitle: "Thêm sách" });
});

router.get('/chitietsach', function (req, res) {

    res.render('sach/chitietsach');

});

router.post('/', (req, res) => {

    if (req.body._id == '') {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }

});

router.get('/:id', (req, res) => {
    Sach.findById(req.params.id, (err, doc) => {
        if (!err) {
            CauHoi.find()
            .where('maSach').equals(req.params.id)
            .exec((err, docs1) => {
                if (!err) {
                    res.render("sach/chitietsach", {
                        chitietsach: doc,
                        cauhois: docs1
                    });                    
                }
                else {
                    console.log('Lỗi câu hỏi, tìm lại đi :' + err);
                }
            });
        }
    });


});

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
            res.redirect('/sach');
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
router.post('/:id', (req, res) => {

    Sach.findById(req.params.id, (err, doc) => {
        if (!err) {
            var cauhoi = new CauHoi();
            cauhoi.maSach = req.body._id;
            cauhoi.cauTraLoi = req.body.cautraloi;
            cauhoi.cauHoi = req.body.cauhoi;
            console.log(cauhoi.maSach);
            cauhoi.save((err, doc) => {

                res.redirect("/sach/" + req.body._id);
                console.log(doc);
            });
        }
    });

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

router.get('/deletecauhoi/:id', (req, res) => {
    CauHoi.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/sach/" +doc.maSach);
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;