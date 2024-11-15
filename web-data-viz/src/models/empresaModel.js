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

async function cadastrar(nome, cnpj, email, senha, chaveAtivacao, telefone, autorizacao, cep, logradouro, bairro, cidade, uf, numLog, complemento) {

  var instrucaoSql = `INSERT INTO tbEmpresa 
  (nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, chaveAtivacaoEmpresa, telEmpresa, autorizacaoEmpresa) 
  VALUES ('${nome}',  '${cnpj}', '${email}', '${senha}', '${chaveAtivacao}', '${telefone}', ${autorizacao});`;


  var resultadoQuery = await database.executar(instrucaoSql)

  var resultadoCadastroEndereco = await cadastrarEndereco(resultadoQuery.insertId, cep, logradouro, bairro, cidade, uf, numLog, complemento)
  return resultadoQuery, resultadoCadastroEndereco;
}

async function cadastrarEndereco(fkEmpresa, cep, logradouro, bairro, cidade, uf, numLog, complemento) {
  var instrucaoSql = `INSERT Endereco (fkEmpresa, cep, logradouro, bairro, cidade, uf, numero, complemento)
                      VALUES ('${fkEmpresa}', '${cep}', '${logradouro}', '${bairro}', '${cidade}', '${uf}', '${numLog}', '${complemento}')`

  return database.executar(instrucaoSql)
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
