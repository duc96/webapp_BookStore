const express = require('express');
var router = express.Router();
const Sach = require("../models/sach.model"); 

router.get("/sach",async (req, res)=>{
    try{
        var sachs = await Sach.find({});
        res.send(sachs);
    }
    catch(error){
        console.log("Lỗi: " + error);
    }
})

module.exports = router;
