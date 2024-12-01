var express = require("express");
var router = express.Router();

var tipoVinhoController = require("../controllers/tipoVinhoController");

router.get("/listar", function (req, res) {
    tipoVinhoController.obterTiposVinho(req, res);
})

router.put("/atualizar", function (req, res) {
    tipoVinhoController.atualizarMetricas(req, res);
})

module.exports = router;