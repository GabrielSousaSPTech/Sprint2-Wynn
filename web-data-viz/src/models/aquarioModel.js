var database = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT
                        idTanque as id,
                          nomeVinho as descricao,
                          fkEmpresa as fk_empresa
                      FROM
                          tbTanque
                      JOIN
                        tbEmpresa
                          on fkEmpresa = idEmpresa
                      JOIN
                        tbTipoVinho
                          on fkTipoVinho = idTipoVinho
                      where
                        fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {

  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar
}
