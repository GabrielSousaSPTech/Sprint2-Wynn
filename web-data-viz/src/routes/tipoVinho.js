var express = require("express");
var router = express.Router();

var tipoVinhoController = require("../controllers/tipoVinhoController");

router.get("/listar/:idEmpresa", function (req, res) {
    tipoVinhoController.obterTiposVinho(req, res);
})

router.put("/atualizar", function (req, res) {
    tipoVinhoController.atualizarMetricas(req, res);
})

router.post("/cadastrar", function (req, res) {
    tipoVinhoController.adicionarTipoVinho(req, res);
})

router.delete("/deletar/:idTipo", function (req, res) {
    tipoVinhoController.deletarVinho(req, res);
});
module.exports = router;