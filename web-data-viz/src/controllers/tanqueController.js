var tanqueModel = require("../models/tanqueModel")

function obterTanquesEmpresa(req,res){
    const idEmpresa = req.params.idEmpresa

    console.log('\nObtendo tanques da empresa de id: ' + idEmpresa + '\n')

    tanqueModel.obterTanquesEmpresa(idEmpresa).then(function (resposta){
        
        if(resposta.length>0){
            res.status(200).json(resposta)
            
        }else {
            res.send('')
        }
    }).catch(function (erro){
        res.status(403).send('Erro ao acessar o banco de dados ' + erro)
    })
}

module.exports = {
    obterTanquesEmpresa
};