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

// order and import
const orderRoute = require("./routes/import-order/order.routes");
const importRoute = require("./routes/import-order/import.routes");

// service
const saleRoute = require("./routes/services/sale.routes");

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

// order and import
app.use("/api", orderRoute);
app.use("/api", importRoute);

// service
app.use("/api", saleRoute);

module.exports = app;
