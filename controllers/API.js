const express = require("express");
var router = express.Router();
const Sach = require("../models/sach.model");
const NguoiDung = require("../models/nguoidung.model");
const BinhLuan = require("../models/binhluan.model");
const CauHoi = require("../models/cauhoi.model");
const HoaDon = require("../models/hoadonfinal.model");

router.get("/allSach", async (req, res) => {
  var sachs = await Sach.find({});
  res.send(sachs);
});

router.post("/bl", async (req, res) => {
  var binhLuan = new BinhLuan();
  binhLuan.maSach = req.body.maSach;

  var query = BinhLuan.where({ maSach: binhLuan.maSach });
  query.find((error, doc) => {
    if (doc) {
      var binhluans = doc;
      res.status(200).send(binhluans);
    } else {
      res.status(404).send();
    }
  });
});

router.post("/cauhois", async (req, res) => {
  var cauhoi = new CauHoi();
  cauhoi.maSach = req.body.maSach;
  var query = CauHoi.where({ maSach: cauhoi.maSach });
  query.find((error, doc) => {
    if (error) {
      return handleError(error);
    }
    console.log(doc);
    if (doc) {
      var cauhois = doc;
      res.status(200).send(cauhois);
    } else {
      res.status(404).send();
    }
  });
});

router.post("/getCTL", async (req, res) => {
  var cauHoi = new CauHoi();
  cauHoi.cauHoi = req.body.cauHoi;
  cauHoi.maSach = req.body.maSach;
  var query = CauHoi.where(
    { cauHoi: cauHoi.cauHoi },
    { cauHoi: cauHoi.maSach }
  );
  query.findOne((error, doc) => {
    if (!error) {
      var cauhoi = doc;
      res.status(200).send(cauhoi);
    } else {
      res.status(404).send();
    }
  });
});

router.post("/getAllHD", async (req, res) => {
  var hoadon = new HoaDon();
  hoadon.tenNguoiDung = req.body.tenNguoiDung;
  // var query = HoaDon.where({ tenNguoiDung: hoadon.tenNguoiDung });
  console.log(req.body.tenNguoiDung + "222122");
  // query.find((error, doc) => {
  //   if (error) {
  //     return handleError(error);
  //   }
  //   console.log(doc);
  //   if (doc) {
  //     var hoadons = doc;
  //     res.status(200).send(hoadons);
  //   } else {
  //     res.status(404).send();
  //   }
  // });
  HoaDon.find(
    { tenNguoiDung: hoadon.tenNguoiDung },
    { hoaDonFinals: 1, _id: 0 },
    (err, docs) => {
      if (err) {
        return handleError(err);
      }
      if (docs) {
        var hoadons = docs;
        let hoaDonFinals1 = [];
        for (i = 0; i < docs.length; i++) {
          let dsHoaDonFinals = hoadons[i].hoaDonFinals;
          for (j = 0; j < dsHoaDonFinals.length; j++) {
            hoaDonFinals1.push(dsHoaDonFinals[j]);
          }
        }
        console.log(hoaDonFinals1);

        res.status(200).send(hoaDonFinals1);
      } else {
        res.status(404).send();
      }
    }
  );
  // query.select({ hoaDonFinals: 1, _id: 0 });
});

router.post("/dangKy", async (req, res) => {
  var nguoiDung = new NguoiDung();
  nguoiDung.tenNguoiDung = req.body.tenNguoiDung;
  nguoiDung.matKhau = req.body.matKhau;
  nguoiDung.email = req.body.email;

  var query = NguoiDung.where({ tenNguoiDung: nguoiDung.tenNguoiDung });
  query.findOne((error, doc) => {
    if (error) {
      return handleError(error);
    }
    if (doc) {
      res.status(409).send();
    } else {
      nguoiDung.save((err) => {
        if (err) {
          return handleError(err);
        }
        res.status(201).send();
      });
    }
  });
});

router.post("/hoadonfinal", async (req, res) => {
  var hoadon = new HoaDon();
  hoadon.tenNguoiDung = req.body.tenNguoiDung;
  hoadon.hoaDonFinals = req.body.hoaDon;
  hoadon.giaTien = req.body.giaTien;
  console.log(req.body.hoaDon);
  console.log(req.body.giaTien);
  hoadon.save((err) => {
    if (!err) {
      res.status(200).send();
    } else {
      console.log(err);
      res.status(404).send();
    }
  });
});

router.post("/dangNhap", async (req, res) => {
  var nguoiDung = new NguoiDung();
  nguoiDung.tenNguoiDung = req.body.tenNguoiDung;
  nguoiDung.matKhau = req.body.matKhau;

  var query = NguoiDung.where(
    { tenNguoiDung: nguoiDung.tenNguoiDung },
    { matKhau: nguoiDung.matKhau }
  );
  query.findOne((error, doc) => {
    if (error) {
      return handleError(error);
    }
    if (doc) {
      var nguoiDungs = doc;
      res.status(200).send(nguoiDungs);
    } else {
      res.status(600).send();
    }
  });
});

router.post("/chitietsach", async (req, res) => {
  var sach = new Sach();
  sach._id = req.body._id;

  var query = Sach.where({ _id: sach._id });
  query.findOne((error, doc) => {
    if (error) {
      return handleError(error);
    }
    if (doc) {
      var sachs = doc;
      res.status(200).send(sachs);
    } else {
      res.status(404).send();
    }
  });
});

router.post("/addBL", async (req, res) => {
  var bl = new BinhLuan();
  bl.ndBL = req.body.ndBL;
  bl.tenNguoiDung = req.body.tenNguoiDung;
  bl.maSach = req.body.maSach;

  bl.save((err) => {
    if (!err) {
      res.status(200).send();
    }
    res.status(404).send();
  });
});

module.exports = router;
const QuanTriVien = require("../models/quantrivien.model");
router.get("/sach", async (req, res) => {
  try {
    var sachs = await Sach.find({});
    res.send(sachs);
  } catch (error) {
    console.log("Lỗi: " + error);
  }
});

router.get("/allSach", async (req, res) => {
  var sachs = await Sach.find({});
  res.send(sachs);
});

router.post("/bl", async (req, res) => {
  var binhLuan = new BinhLuan();
  binhLuan.maSach = req.body.maSach;

  var query = BinhLuan.where({ maSach: binhLuan.maSach });
  query.find((error, doc) => {
    if (doc) {
      var binhluans = doc;
      res.status(200).send(binhluans);
    } else {
      res.status(404).send();
    }
  });
});

router.post("/dangKy", async (req, res) => {
  var nguoiDung = new NguoiDung();
  nguoiDung.tenNguoiDung = req.body.tenNguoiDung;
  nguoiDung.matKhau = req.body.matKhau;
  nguoiDung.email = req.body.email;
  nguoiDung.daLamSurvey = false;

  var query = NguoiDung.where({ tenNguoiDung: nguoiDung.tenNguoiDung });
  query.findOne((error, doc) => {
    if (error) {
      return handleError(error);
    }
    if (doc) {
      res.status(409).send();
    } else {
      nguoiDung.save((err) => {
        if (err) {
          return handleError(err);
        }
        res.status(201).send();
      });
    }
  });
});

router.post("/dangNhap", async (req, res) => {
  var nguoiDung = new NguoiDung();
  nguoiDung.tenNguoiDung = req.body.tenNguoiDung;
  nguoiDung.matKhau = req.body.matKhau;

  var query = NguoiDung.where(
    { tenNguoiDung: nguoiDung.tenNguoiDung },
    { matKhau: nguoiDung.matKhau }
  );
  query.findOne((error, doc) => {
    if (error) {
      return handleError(error);
    }
    if (doc) {
      var nguoiDungs = doc;
      res.status(200).send(nguoiDungs);
    } else {
      res.status(600).send();
    }
  });
});
//Cập nhật sở thích người dùng qua survey
router.post("/capNhatSoThich", async (req, res) => {
  var nguoiDung = new NguoiDung();
  nguoiDung.tenNguoiDung = req.body.tenNguoiDung;
  nguoiDung.tag1 = req.body.tag1;
  nguoiDung.tag2 = req.body.tag2;
  var query = NguoiDung.where({ tenNguoiDung: nguoiDung.tenNguoiDung });

  query.findOneAndUpdate(
    { $set: { tag1: nguoiDung.tag1, tag2: nguoiDung.tag2, daLamSurvey: true } },
    //call back
    (err, doc, raw) => {
      /*Do something here*/
      if (err) {
        return handleError(err);
      }
      if (doc) {
        res.status(201).send();
      } else {
        res.status(404).send();
      }
    }
  );
});
//Đổi mật khẩu
router.post("/doiMatKhau", async (req, res) => {
  var nguoiDung = new NguoiDung();
  nguoiDung.tenNguoiDung = req.body.tenNguoiDung;
  nguoiDung.matKhau = req.body.matKhau;
  let matKhauMoi = req.body.matKhauMoi;
  var query = NguoiDung.where(
    { tenNguoiDung: nguoiDung.tenNguoiDung },
    { matKhau: nguoiDung.matKhau }
  );

  query.findOneAndUpdate(
    { $set: { matKhau: matKhauMoi } },
    //call back
    (err, doc, raw) => {
      /*Do something here*/
      if (err) {
        return handleError(err);
      }
      if (doc) {
        res.status(201).send();
      } else {
        res.status(404).send();
      }
    }
  );
});
router.post("/chitietsach", async (req, res) => {
  var sach = new Sach();
  sach._id = req.body._id;

  var query = Sach.where({ _id: sach._id });
  query.findOne((error, doc) => {
    if (error) {
      return handleError(error);
    }
    if (doc) {
      var sachs = doc;
      res.status(200).send(sachs);
    } else {
      res.status(404).send();
    }
  });
});

router.post("/addBL", async (req, res) => {
  var bl = new BinhLuan();
  bl.ndBL = req.body.ndBL;
  bl.tenNguoiDung = req.body.tenNguoiDung;
  bl.maSach = req.body.maSach;

  bl.save((err) => {
    if (!err) {
      res.status(200).send();
    }
    res.status(404).send();
  });
});
//Request đăng nhập của QTV
router.post("/taoQTV", (req, res) => {
  var qtv = new QuanTriVien();
  qtv.email = req.body.emailQTV;
  qtv.matKhau = req.body.passQTV;
  var query = QuanTriVien.where({ email: qtv.email });
  query.findOne((error, doc) => {
    if (error) {
      return handleError(error);
    }
    if (doc) {
      res.status(409).send("Đã tồn tại TK trên!");
    } else {
      qtv.save((err) => {
        if (err) {
          return handleError(err);
        }
        res.status(201).send("DK thành công");
      });
    }
  });
});

router.post("/QTVDangNhap", (req, res) => {
  var qtv = new QuanTriVien();
  qtv.email = req.body.emailQTV;
  qtv.matKhau = req.body.passQTV;
  var query = QuanTriVien.where({ email: qtv.email, matKhau: qtv.matKhau });
  query.findOne((error, doc) => {
    if (error) {
      return handleError(error);
    }
    if (doc) {
      res.render("main");
    } else {
      res.send("Fail!");
    }
  });
});
module.exports = router;
