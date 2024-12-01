var database = require("../database/config")

function obterTiposVinho() {

    var instrucaoSql = `
        SELECT * FROM tbTipoVinho;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarMetricas(
    idTipoVinho, tempPerMin, tempPerMax, tempCritMin, tempCritMax,
    co2PerMin, co2PerMax, co2CritMin, co2CritMax
) {

    var instrucaoSql = `
        UPDATE tbTipoVinho
	        SET metricaTemperaturaPerigoMin = ${tempPerMin}, metricaTemperaturaPerigoMax = ${tempPerMax},
			        metricaTemperaturaCriticoMin = ${tempCritMin}, metricaTemperaturaCriticoMax = ${tempCritMax},
				        metricaCO2PerigoMin = ${co2PerMin}, metricaCO2PerigoMax = ${co2PerMax},
					        metricaCO2CriticoMin = ${co2CritMin}, metricaCO2CriticoMax = ${co2CritMax}
						     WHERE idTipoVinho = ${idTipoVinho};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarTipoVinho(
    nome, tempPerMin, tempPerMax, tempCritMin, tempCritMax,
    co2PerMin, co2PerMax, co2CritMin, co2CritMax
) {
    var instrucaoSql = `
        INSERT INTO tbTipoVinho VALUES
	        (default, '${nome}', ${tempPerMin}, ${tempPerMax}, ${tempCritMin}, ${tempCritMax}, ${co2PerMin}, ${co2PerMax}, ${co2CritMin}, ${co2CritMax});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterTiposVinho,
    atualizarMetricas,
    adicionarTipoVinho
};

