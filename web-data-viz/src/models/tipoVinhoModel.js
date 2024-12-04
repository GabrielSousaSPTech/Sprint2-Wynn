var database = require("../database/config")

function obterTiposVinho(idEmpresa) {

    var instrucaoSql = `
        SELECT * FROM tbTipoVinho
            WHERE fkEmpresa = ${idEmpresa}
                order by idTipoVinho;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarMetricas(
    idVinho, nome, tempPerMin, tempPerMax, tempCritMin, tempCritMax
) {

    var instrucaoSql = `
        UPDATE tbTipoVinho
	        SET nomeVinho = '${nome}', 
            metricaTemperaturaPerigoMin = ${tempPerMin}, metricaTemperaturaPerigoMax = ${tempPerMax},
			metricaTemperaturaCriticoMin = ${tempCritMin}, metricaTemperaturaCriticoMax = ${tempCritMax}
				WHERE idTipoVinho = ${idVinho};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarTipoVinho(
    idEmpresa, nome, tempPerMin, tempPerMax, tempCritMin, tempCritMax
) {
    var instrucaoSql = `
        INSERT INTO tbTipoVinho VALUE
	        (default, ${idEmpresa}, '${nome}', ${tempPerMin}, ${tempPerMax}, ${tempCritMin}, ${tempCritMax})`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarVinho(idTipo) {
    var instrucaoSql = `
        DELETE FROM tbTipoVinho 
            WHERE idTipoVinho = ${idTipo}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterTiposVinho,
    atualizarMetricas,
    adicionarTipoVinho,
    deletarVinho
};

