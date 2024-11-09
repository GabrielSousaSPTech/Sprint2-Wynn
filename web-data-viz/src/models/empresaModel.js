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

function cadastrar(nome, cnpj, email, senha, chaveAtivacao, telefone, cep, logradouro, bairro, cidade, uf, numLog, complemento, autorizacao) {
  var instrucaoSql = `INSERT INTO tbEmpresa 
  (nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, chaveAtivacaoEmpresa, telEmpresa, cepLogradouroEmpresa, logradouroEmpresa, bairroLogradouroEmpresa, cidadeLogradouroEmpresa, ufLogradouroEmpresa, numLogradouroEmpresa, compLogradouroEmpresa, autorizacaoEmpresa) 
  VALUES ('${nome}',  '${cnpj}', '${email}', '${senha}', '${chaveAtivacao}', '${telefone}', '${cep}', '${logradouro}', '${bairro}', '${cidade}', 
  '${uf}', '${numLog}', '${complemento}', ${autorizacao})`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
