var express = require("express");
var router = express.Router();

var tanqueController = require("../controllers/tanqueController");

router.get("/listar/:idEmpresa", function (req, res) {
    tanqueController.obterTanquesEmpresa(req, res);
})

module.exports = router;