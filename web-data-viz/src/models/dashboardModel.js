var database = require("../database/config");

function obterDadosKpi(fkTanque, limite){
    var instrucaoSql = `
        SELECT 
            medidaLM35 AS Temperatura,
            medidaMQ2 as co2
        FROM tbMedida 
        WHERE fkTanque = ${fkTanque}
        ORDER BY idMedidaSensor DESC
        LIMIT ${limite};
    `
    return database.executar(instrucaoSql)
}

function obterTempoFermentacao(fkTanque){
    var instrucaoSql = `
        SELECT 
           dataHoraSensor
        FROM tbMedida 
        WHERE fkTanque = ${fkTanque}
        ORDER BY idMedidaSensor
        LIMIT ${limite};
    `
    return database.executar(instrucaoSql)
}

function obterMinMaxTemperatura(fkTanque){
    var instrucaoSql = `
        SELECT 
            MIN(medidaLM35) AS minima,
            MAX(medidaLM35) AS maxima
            FROM tbMedida 
            WHERE fkTanque = ${fkTanque};
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
                SELECT idTanque FROM tbTanque WHERE fkEmpresa = ${fkEmpresa};
    `

    return database.executar(instrucaoSql)
}

function obterComecoFermentacao(fkTanque){
    var instrucaoSql = `
    SELECT 
        dataHoraSensor
    FROM tbMedida 
    WHERE fkTanque = ${fkTanque}
    ORDER BY idMedidaSensor 
    LIMIT 1;
`

return database.executar(instrucaoSql)
}

module.exports = {
    obterDadosKpi,
    obterDadosGraficoTemperatura,
    obterDadosGraficoCO2,
    obterTanque,
    obterMinMaxTemperatura,
    obterTempoFermentacao,
    obterComecoFermentacao
}