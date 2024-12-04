var tipoVinhoModel = require("../models/tipoVinhoModel")

function obterTiposVinho(req, res) {
    const idEmpresa = req.params.idEmpresa

    tipoVinhoModel.obterTiposVinho(idEmpresa).then(function (resposta) {
        console.log(resposta)
        console.log('NO CONTROLLER ' + resposta.length)
        if (resposta.length > 0) {
            res.status(200).json(resposta)

        } else {
            res.send('Tanque ainda não obteve medições de Temperatura')
        }
    }).catch(function (erro) {
        res.status(403).send('Erro ao acessar o banco de dados' + erro)
    })
}

function atualizarMetricas(req, res) {
    const idVinho = req.body.idVinho;
    const nome = req.body.nome
    const tempPerMin = req.body.tempPerMin;
    const tempPerMax = req.body.tempPerMax;
    const tempCritMin = req.body.tempCritMin;
    const tempCritMax = req.body.tempCritMax;

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    tipoVinhoModel.atualizarMetricas(idVinho, nome, tempPerMin, tempPerMax, tempCritMin, tempCritMax)
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

function adicionarTipoVinho(req, res) {
    const idEmpresa = req.body.idEmpresa
    const nome = req.body.nome;
    const tempPerMin = req.body.tempPerMin;
    const tempPerMax = req.body.tempPerMax;
    const tempCritMin = req.body.tempCritMin;
    const tempCritMax = req.body.tempCritMax;

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    tipoVinhoModel.adicionarTipoVinho(idEmpresa, nome, tempPerMin, tempPerMax, tempCritMin, tempCritMax)
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

function deletarVinho(req, res) {
    const idTipo = req.params.idTipo

    tipoVinhoModel.deletarVinho(idTipo).then(function (resposta) {
        console.log(resposta)
        res(resposta)
    }).catch(function (erro) {
        res.status(403).send('Erro ao acessar o banco de dados' + erro)
    })
}
module.exports = {
    obterTiposVinho,
    atualizarMetricas,
    adicionarTipoVinho,
    deletarVinho
};