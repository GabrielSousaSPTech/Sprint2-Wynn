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

function atualizarMetricas(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idTipoVinho = req.body.idTipoVinhoServer;
    var tempPerMin = req.body.tempPerMinServer;
    var tempPerMax = req.body.tempPerMaxServer;
    var tempCritMin = req.body.tempCritMinServer;
    var tempCritMax = req.body.tempCritMaxServer;
    var co2PerMin = req.body.co2PerMinServer;
    var co2PerMax = req.body.co2PerMaxServer;
    var co2CritMin = req.body.co2CritMinServer;
    var co2CritMax = req.body.co2CritMaxServer;

     // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        tipoVinhoModel.atualizarMetricas(idTipoVinho, tempPerMin, tempPerMax, tempCritMin, tempCritMax, co2PerMin, co2PerMax, co2CritMin, co2CritMax)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


module.exports = {
    obterTiposVinho,
    atualizarMetricas
};