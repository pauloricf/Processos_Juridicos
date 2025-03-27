const express = require("express");
const routes = express.Router();
const reportController = require("../controllers/reportController");

routes.get("/reports", reportController.getReports);

module.exports = routes;
