var database = require("../database/config")

function obterTiposVinho() {
    
    var instrucaoSql = `
        SELECT * FROM tbTipoVinho;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarMetricas () {

    var instrucaoSql = `
        SELECT * FROM tbTipoVinho;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterTiposVinho,
    atualizarMetricas
};

