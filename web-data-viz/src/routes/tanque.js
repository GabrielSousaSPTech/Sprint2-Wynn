var express = require("express");
var router = express.Router();

var tanqueController = require("../controllers/tanqueController");

router.get("/listar/:idEmpresa", function (req, res) {
    tanqueController.obterTanquesEmpresa(req, res);
})

router.put("/atualizar", function (req, res) {
    tanqueController.atualizarTanque(req, res)
})

router.post("/adicionar", function (req, res) {
    tanqueController.adicionarTanque(req, res)
})

module.exports = router;