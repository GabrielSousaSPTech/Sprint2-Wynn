var tipoVinhoModel = require("../models/tipoVinhoModel")

function obterTiposVinho(req,res){
    tipoVinhoModel.obterTiposVinho().then(function (resposta){
        console.log(resposta)
        console.log('NO CONTROLLER '+ resposta.length)
        if(resposta.length>0){
            res.status(200).json(resposta)
            
        }else {
            res.send('Tanque ainda não obteve medições de Temperatura')
        }
    }).catch(function (erro){
        res.status(403).send('Erro ao acessar o banco de dados'+ erro)
    })
}

module.exports = {
    obterTiposVinho
};