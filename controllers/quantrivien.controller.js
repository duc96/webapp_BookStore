const express = require("express");
var router = express.Router();
const QuanTriVien = require("../models/quantrivien.model");

router.get("/", (req, res) => {
  QuanTriVien.find((err, docs) => {
    if (!err) {
      res.render("/main", { quantriviens: docs });
    } else {
      console.log("Đăng nhập thất bại" + err);
    }
  });
});

module.exports = router;
