require("dotenv").config();
require("./db").connect();

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// import routing
const adminRoute = require("./routes/admin.routes");
const userRoute = require("./routes/user.routes");

// management
const supplierRoute = require("./routes/managements/supplier.routes");
const positionRoute = require("./routes/managements/position.routes");
const typeRoute = require("./routes/managements/type.routes");
const unitRoute = require("./routes/managements/unit.routes");
const empRoute = require("./routes/managements/emp.routes");
const cusRoute = require("./routes/managements/customer.routes");
const categRoute = require("./routes/managements/category.routes");
const productRoute = require("./routes/managements/product.routes");

// report
const empReport = require("./routes/reports/emp-rep.routes");
const impReport = require("./routes/reports/imp-rep.routes");
const saleReport = require("./routes/reports/sale-rep.routes");
const orderReport = require("./routes/reports/order-rep.routes")
const productReport = require("./routes/reports/rep-product.routes");
const incomeRoute = require("./routes/reports/income-rep.routes");
const expanseRoute = require("./routes/reports/expanse-rep.routes");

// order and import
const orderRoute = require("./routes/import-order/order.routes");
const orderDetail = require("./routes/import-order/orderDetail.routes");
const importRoute = require("./routes/import-order/import.routes");

// service
const saleRoute = require("./routes/services/sale.routes");
const saleDetail = require("./routes/services/saleDetail.routes");
const userCart = require("./routes/services/cart.routes");

app.use('/images', express.static(path.join(__dirname, 'public/images')));

const Index = path.join(__dirname, "./views/index.html");

app.get("/", (req, res) => {
    res.sendFile(Index);
});

app.use("/admin", adminRoute);
app.use("/customer", userRoute);

// data management
app.use("/api", supplierRoute);
app.use("/api", positionRoute);
app.use("/api", typeRoute);
app.use("/api", unitRoute);
app.use("/api", empRoute);
app.use("/api", cusRoute);
app.use("/api", categRoute);
app.use("/api", productRoute);

// report
app.use("/api", empReport);
app.use("/api", impReport);
app.use("/api", saleReport);
app.use("/api", orderReport);
app.use("/api", productReport);
app.use("/api", incomeRoute);
app.use("/api", expanseRoute);

// order and import
app.use("/api", orderRoute);
app.use("/api", orderDetail);
app.use("/api", importRoute);

// service
app.use("/api", saleRoute);
app.use("/api", saleDetail);
app.use("/api", userCart);

module.exports = app;
