const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

app.listen(1996, () => {
  console.log("Express server started at port : 1996");
});
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

app.get("/", function (req, res) {
  res.render("login", { layout: false, title: "Tạo QTV" });
});
app.get("/main", function (req, res) {
  res.render("main", { layout: false });
});
app.get("/forgotpassword", function (req, res) {
  res.render("forgotpassword", { layout: false });
});
app.get("/repassword", function (req, res) {
  res.render("repassword", { layout: false });
});

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "hbs");

app.use(express.static("public"));
// app.use('*/css', express.static('public/css'));
// app.use('*/js', express.static('public/js'));
// app.use('*/images', express.static('public/images'));

let dev_db_url =
  "mongodb+srv://tranvanduc22111996:tranvanduc22111996@cluster0.9j7ev.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(
  dev_db_url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("Ket noi that bai, ly do: " + err);
    } else {
      console.log("Ket noi thanh cong");
    }
  }
);

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("erro", console.error.bind(console, "Mongoose fail:"));

const sachController = require("./controllers/sach.controler");
app.use("/sach", sachController);

const HDController = require("./controllers/hoadon.controller");
app.use("/hoadon", HDController);

const NDController = require("./controllers/nguoidung.controller");
app.use("/nguoidung", NDController);

const APIController = require("./controllers/API");
app.use(APIController);

const QTVController = require("./controllers/quantrivien.controller");
app.use(QTVController);
