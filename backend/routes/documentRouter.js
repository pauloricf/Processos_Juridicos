const express =  require('express');
const upload = require('../services/fileUploadService');
const {anexarDocumento} = require('../controllers/documentController');

const router = express.Router();

router.post("/upload",  (req, res, next) => {
  console.log("Requisição recebida");
  next();
},upload.single("document"), anexarDocumento)

module.exports = router