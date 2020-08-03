const express = require('express');
var router = express.Router();
const NguoiDung = require("../models/nguoidung.model");

router.get('/nguoidung', (req,res)=>{
    res.render('nguoidung/tablenguoidung', {viewTitle: "Người Dùng"});
});

router.get('/ndAddOrEdit', (req, res) => {
    res.render('nguoidung/ndAddOrEdit', { viewTitle: "Thêm người dùng" });
});

// router.post('/', (req, res) => {

//     if (req.body._id == '') {
//         insertRecord(req, res);
//     }
//     else {
//         updateRecord(req, res);
//     }
// });


function insertRecord(req, res) {
    var nguoidung = new NguoiDung();
    nguoidung.username = req.body.username;
    nguoidung.password = req.body.password;
    nguoidung.email = req.body.email;
    nguoidung.save((err, doc) => {
        if (!err)
            res.redirect('nguoidung/tablenguoidung');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("nguoidung/tablenguoidung", {
                    viewTitle: "Thêm người dùng",
                    sach: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


function updateRecord(req, res) {
    NguoiDung.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        console.log(doc);
        if (!err) { res.redirect('nguoidung/tablenguoidung'); }
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
    NguoiDung.find((err, docs) => {
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