var tanqueModel = require("../models/tanqueModel")

function obterTanquesEmpresa(req,res){
    const idEmpresa = req.params.idEmpresa

    tanqueModel.obterTanquesEmpresa(idEmpresa).then(function (resposta){
        
        if(resposta.length>0){
            res.status(200).json(resposta)
            
        }else {
            res.send('Nenhum tanque cadastrado')
        }
    }).catch(function (erro){
        res.status(403).send('Erro ao acessar o banco de dados ' + erro)
    })
}

function atualizarTanque(req, res) {
    const idTanque = req.body.idTanque
    const nome = req.body.nome
    const idVinho = req.body.idVinho
    const status = req.body.status

    tanqueModel.atualizarTanque(idTanque, nome, idVinho, status).then(function (resposta) {
        res.status(200).send(resposta)
    }).catch(function (erro) {
        console.log(erro)
        res.status(403).send('Erro ao acessar o banco de dados ' + erro)
    })
}

function adicionarTanque(req, res) {
    const nomeTanque = req.body.nomeTanque
    const idEmpresa = req.body.idEmpresa
    const idVinho = req.body.idVinho
    const status = req.body.status

    tanqueModel.adicionarTanque(nomeTanque, idEmpresa, idVinho, status).then(function (resposta) {
        res.status(200).send(resposta)
    }).catch(function (erro) {
        console.log(erro)
        res.status(403).send('Erro ao acessar o banco de dados ' + erro)
    })
}

module.exports = {
    obterTanquesEmpresa,
    atualizarTanque,
    adicionarTanque
};