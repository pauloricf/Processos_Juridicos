const express = require("express");
const upload = require("../services/fileUploadService");
const { anexarDocumento, getDocumentsByProcessId, deleteDocument } = require("../controllers/documentController");

const router = express.Router();

router.post(
  "/upload",
  (req, res, next) => {
    console.log("Requisição recebida");
    next();
  },
  upload.single("document"),
  anexarDocumento
);

router.get("/documents/:id", getDocumentsByProcessId);
router.delete("/documents/:id", deleteDocument);

module.exports = router;
