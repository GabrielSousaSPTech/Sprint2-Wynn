var dashboardModel = require("../models/dashboardModel")

function obterDadosKpi(req,res){
    var idTanque = req.params.idTanque
    var limite = req.params.limite
    dashboardModel.obterDadosKpi(idTanque, limite).then(function (resposta){
        console.log('NO CONTROLLER '+ resposta.length)
        if(resposta.length>0){
            res.json({
                Temperatura: resposta[0].Temperatura,
                co2: resposta[0].co2
            })
        }else {
            res.send('Tanque ainda não obteve medições de Temperatura')
        }
    }).catch(function (erro){
        res.status(403).send('Erro ao acessar o banco de dados'+ erro)
    })
}


function obterDadosGraficoTemperatura(req, res){
    var idTanque = req.params.idTanque
    
    dashboardModel.obterDadosGraficoTemperatura(idTanque).then(function (resposta){
        res.status(201).json(resposta)
    }).catch(function (erro){
        res.status(403).send('Erro ao acessar o banco de dados'+ erro)
    })
}

function obterDadosGraficoCO2(req, res){
    var idTanque = req.params.idTanque

    dashboardModel.obterDadosGraficoCO2(idTanque).then(function (resposta){
        if(resposta.length>0){
            res.status(201).json(resposta)
        }else {
            res.status(402).send('Tanque ainda não obteve medições de CO2')
        }
    }).catch(function (erro){
        res.status(403).send('Erro ao acessar o banco de dados'+ erro)
    })
}

function obterTanque(req, res){
    var idEmpresa = req.params.fkEmpresa
    dashboardModel.obterTanque(idEmpresa).then(function (resposta){
        res.status(201).json(resposta)
    }).catch(function (erro){
        res.status(403).send('Erro ao acessar o banco de dados'+ erro)
    })
}

function obterMinMaxTemperatura (req, res){
    var idTanque = req.params.idTanque
    dashboardModel.obterMinMaxTemperatura(idTanque).then(function (resposta){
        res.status(201).json(resposta)
    })
}

module.exports = {
    obterDadosKpi,
    obterDadosGraficoTemperatura,
    obterDadosGraficoCO2,
    obterTanque,
    obterMinMaxTemperatura
}