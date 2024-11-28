var dashboardModel = require("../models/dashboardModel")

function obterDadosKpi(req,res){
    var idTanque = req.params.idTanque
    dashboardModel.obterDadosKpi(idTanque).then(function (resposta){
        if(resposta.length>0){
            res.json({
                Temperatura: resposta[0].Temperatura,
                co2: resposta[0].co2
            })
        }else {
            res.status(402).send('Tanque ainda não obteve medições de Temperatura')
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

module.exports = {
    obterDadosKpi,
    obterDadosGraficoTemperatura,
    obterDadosGraficoCO2,
    obterTanque
}