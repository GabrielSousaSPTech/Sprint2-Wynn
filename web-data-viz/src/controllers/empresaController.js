var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var nomeEmpresa = req.body.nomeEmpresaServer
  var cnpjEmpresa = req.body.cnpjEmpresaServer
  var emailEmpresa = req.body.emailEmpresaServer
  var senhaEmpresa = req.body.senhaEmpresaServer
  var chaveAtivacaoEmpresa = req.body.chaveAtivacaoServer
  var telefoneEmpresa = req.body.telefoneEmpresaServer
  var cepEmpresa = req.body.cepEmpresaServer
  var logEmpresa = req.body.logradouroEmpresaServer
  var bairroEmpresa = req.body.bairroEmpresaServer
  var cidadeEmpresa = req.body.cidadeEmpresaServer
  var ufEmpresa = req.body.ufEmpresaServer
  var numLogEmpresa = req.body.numLogradouroEmpresaServer
  var complementoEmpresa = req.body.complementoEmpresaServer
  var autorizacaoEmpresa = req.body.autorizacaoEmpresaServer

  empresaModel.cadastrar(nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, chaveAtivacaoEmpresa, telefoneEmpresa, autorizacaoEmpresa, cepEmpresa, logEmpresa, bairroEmpresa, cidadeEmpresa, ufEmpresa, numLogEmpresa, complementoEmpresa)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    )

}
module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
