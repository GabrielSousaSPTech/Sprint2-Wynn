var express = require('express');
var router = express.Router();

var dashboardController = require('../controllers/dashboardController');


router.get('/obterKPI/:idTanque/:limite', function (req, res){
    dashboardController.obterDadosKpi(req, res)
})

router.get('/obterGraficoTemperatura/:idTanque', function(req, res){
    dashboardController.obterDadosGraficoTemperatura(req, res)
})


router.get('/obterGraficoCo2/:idTanque', function(req, res){
    dashboardController.obterDadosGraficoCO2(req, res)
})
router.get('/obterMinMaxTemperatura/:idTanque', function(req, res){
    dashboardController.obterMinMaxTemperatura(req, res)
})

router.get('/obterTanque/:fkEmpresa', function (req, res){
    dashboardController.obterTanque(req, res);
})

module.exports = router