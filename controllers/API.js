const express = require('express');
var router = express.Router();
const Sach = require("../models/sach.model"); 
const NguoiDung = require("../models/nguoidung.model");
const BinhLuan = require("../models/binhluan.model");

router.get("/sach",async (req, res)=>{
    try{
        var sachs = await Sach.find({});
        res.send(sachs);
    }
    catch(error){
        console.log("Lỗi: " + error);
    }
})

router.get("/allSach", async(req, res)=>{
    var sachs = await Sach.find({});
    res.send(sachs);
});

router.post("/bl", async(req, res)=>{
    var binhLuan = new BinhLuan();
    binhLuan.maSach = req.body.maSach;

    var query = BinhLuan.where({maSach: binhLuan.maSach});
    query.find((error, doc)=>{
        if(doc){
            var binhluans = doc;
            res.status(200).send(binhluans);
        }
        else{
           res.status(404).send();
        }
    })
});

router.post("/dangKy", async(req, res)=>{
    var nguoiDung = new NguoiDung();
    nguoiDung.tenNguoiDung = req.body.tenNguoiDung;
    nguoiDung.matKhau = req.body.matKhau;
    nguoiDung.email = req.body.email;
    
    var query = NguoiDung.where({tenNguoiDung: nguoiDung.tenNguoiDung});
    query.findOne((error, doc)=>{
        if(error){
            return handleError(error);
        }
        if(doc){
            res.status(409).send();
        }
        else{
            nguoiDung.save((err)=>{
                if(err){
                    return handleError(err);
                };
                res.status(201).send();
            });
        }
    })
       
});

router.post("/dangNhap", async(req, res)=>{
    var nguoiDung = new NguoiDung();
    nguoiDung.tenNguoiDung = req.body.tenNguoiDung;
    nguoiDung.matKhau = req.body.matKhau;

    var query = NguoiDung.where({tenNguoiDung: nguoiDung.tenNguoiDung}, {matKhau: nguoiDung.matKhau});
    query.findOne((error, doc)=>{
        if(error){
            return handleError(error);
        }
        if(doc){
            var nguoiDungs = doc;
            res.status(200).send(nguoiDungs);
        }
        else{
            res.status(600).send();
        }
    })
});

router.post("/chitietsach", async(req, res)=>{
    var sach = new Sach();
    sach._id = req.body._id;

    var query = Sach.where({_id: sach._id});
    query.findOne((error, doc)=>{
        if(error){
            return handleError(error);
        }
        if(doc){
            var sachs = doc;
            res.status(200).send(sachs);
        }
        else{
            res.status(404).send();
        }
    })
})

router.post("/addBL", async(req, res)=>{
    var bl = new BinhLuan();
    bl.ndBL = req.body.ndBL;
    bl.tenNguoiDung = req.body.tenNguoiDung;
    bl.maSach = req.body.maSach;

    bl.save((err) =>{
        if(!err){
            res.status(200).send();
        };
        res.status(404).send();
    });
    
})

module.exports = router;
