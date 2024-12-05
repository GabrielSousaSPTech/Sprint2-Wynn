var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT idEmpresa, nomeEmpresa, cnpjEmpresa, chaveAtivacaoEmpresa FROM tbEmpresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

async function cadastrar(nome, cnpj, email, senha, chaveAtivacao, telefone, autorizacao, cep, logradouro, bairro, cidade, uf, numLog, complemento, tipoEndereco) {

  var instrucaoSql = `INSERT INTO tbEmpresa 
  (nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, chaveAtivacaoEmpresa, telEmpresa, autorizacaoEmpresa) 
  VALUES ('${nome}',  '${cnpj}', '${email}', MD5('${senha}'), '${chaveAtivacao}', '${telefone}', ${autorizacao});`;


  var resultadoQuery = await database.executar(instrucaoSql)

  var resultadoCadastroEndereco = await cadastrarEndereco(cep, logradouro, bairro, cidade, uf, numLog, complemento)

  var resultadoAssociativaEnderecoEmpresa = await cadastrarEnderecoEmpresa(resultadoQuery.insertId, resultadoCadastroEndereco.insertId, tipoEndereco)
  return resultadoQuery, resultadoCadastroEndereco, resultadoAssociativaEnderecoEmpresa;
}

async function cadastrarEndereco(cep, logradouro, bairro, cidade, uf, numLog, complemento) {
  var instrucaoSql = `INSERT Endereco (cep, logradouro, bairro, cidade, uf, numero, complemento)
                      VALUES ('${cep}', '${logradouro}', '${bairro}', '${cidade}', '${uf}', '${numLog}', '${complemento}')`
  return database.executar(instrucaoSql)
}

async function obterUltimoIdInserido(fkEmpresa, fkEndereco){
  var selecionarId = `SELECT idEnderecoEmpresa FROM tbEnderecoEmpresa WHERE fkEmpresa = ${fkEmpresa} AND fkEndereco = ${fkEndereco} ORDER BY idEnderecoEmpresa DESC LIMIT 1`
  return database.executar(selecionarId)
}

async function cadastrarEnderecoEmpresa(fkEmpresa, fkEndereco, tipoEndereco){

  
  var id = 1
  var ultimoId = await obterUltimoIdInserido(fkEmpresa, fkEndereco)
    if(ultimoId.length>0){
        id = Number(ultimoId[0].idEnderecoEmpresa)+1
    }

  var instrucaoSql = `INSERT INTO tbEnderecoEmpresa(idEnderecoEmpresa, fkEmpresa, fkEndereco, tipoEndereco) VALUES
    (${id}, ${fkEmpresa}, ${fkEndereco}, '${tipoEndereco}')`

  return database.executar(instrucaoSql)
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar, cadastrarEnderecoEmpresa };
