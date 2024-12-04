var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT
                            medidaLM35 as temperatura,
                            medidaMQ2 as umidade,
                            DATE_FORMAT(dataHoraSensor,'%H:%i:%s') as momento_grafico,
                            metricaTemperaturaPerigoMin AS temperaturaMinPerigo,
                            metricaTemperaturaPerigoMax AS temperauraPerigoMax,
                            metricaTemperaturaCriticoMin AS temperaturaCriticoMin,
                            metricaTemperaturaCriticoMax AS temperaturaCriticoMax,
                            metricaCO2PerigoMin AS CO2PerigoMin,
                            metricaCO2CriticoMin AS CO2CriticoMin
                        FROM
                            tbTanque
                        JOIN
                            tbEmpresa
                            on fkEmpresa = idEmpresa
                        JOIN
                            tbTipoVinho
                            on fkTipoVinho = idTipoVinho
                        JOIN
                            tbMedida
                            on fkTanque = idTanque
                        where
                            idTanque = ${idAquario}
                        ORDER BY idMedidaSensor DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
                            medidaLM35 as temperatura,
                            medidaMQ2 as umidade,
                            DATE_FORMAT(dataHoraSensor,'%H:%i:%s') as momento_grafico, 
                            fkTanque as fk_aquario,
                            metricaTemperaturaPerigoMin AS temperaturaMinPerigo,
                            metricaTemperaturaPerigoMax AS temperauraPerigoMax,
                            metricaTemperaturaCriticoMin AS temperaturaCriticoMin,
                            metricaTemperaturaCriticoMax AS temperaturaCriticoMax,
                            metricaCO2PerigoMin AS CO2PerigoMin,
                            metricaCO2CriticoMin AS CO2CriticoMin
                        FROM
                            tbTanque
                        JOIN
                            tbEmpresa
                            on fkEmpresa = idEmpresa
                        JOIN
                            tbTipoVinho
                            on fkTipoVinho = idTipoVinho
                        JOIN
                            tbMedida
                            on fkTanque = idTanque
                        WHERE fkTanque = ${idAquario} 
                        ORDER BY idMedidaSensor DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarMedidasTanque(idTanque) {
    var instrucaoSql = `
        DELETE FROM tbMedida
            WHERE fkTanque = ${idTanque};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    deletarMedidasTanque
}
