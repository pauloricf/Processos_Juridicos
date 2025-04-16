const express = require("express");
const routes = express.Router();
const authController = require("../controllers/authController");

routes.post("/login", authController.login);
routes.post("/reset-password/:id", authController.resetPassword);

module.exports = routes;
