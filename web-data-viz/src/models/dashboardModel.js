var database = require("../database/config");

function obterDadosKpi(fkTanque){
    var instrucaoSql = `
        SELECT 
            medidaLM35 AS Temperatura,
            medidaMQ2 as co2
        FROM tbMedida 
        WHERE fkTanque = ${fkTanque}
        ORDER BY idMedidaSensor DESC
        LIMIT 1;
    `

    return database.executar(instrucaoSql)
}

function obterDadosGraficoTemperatura(fkTanque){
    var instrucaoSql = `
    SELECT medidaLM35, hour(dataHoraSensor) FROM tbMedida WHERE fkTanque = ${fkTanque};
    `
    return database.executar(instrucaoSql)
}

function obterDadosGraficoCO2(fkTanque){
    var instrucaoSql = `
    SELECT medidaMQ2, hour(dataHoraSensor) FROM tbMedida WHERE fkTanque = ${fkTanque};
    `
    return database.executar(instrucaoSql)
}

function obterTanque(fkEmpresa){
    var instrucaoSql = `
        SELECT idTanque, medidaLM35, medidaMQ2 FROM tbTanque
        JOIN tbMedida ON fkTanque = idTanque
        WHERE fkEmpresa = ${fkEmpresa}
        GROUP BY idTanque
    `

    return database.executar(instrucaoSql)
}

module.exports = {
    obterDadosKpi,
    obterDadosGraficoTemperatura,
    obterDadosGraficoCO2,
    obterTanque
}