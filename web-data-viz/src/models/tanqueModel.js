var database = require("../database/config")

function obterTanquesEmpresa(idEmpresa) {

    const instrucaoSql = `
        select
            idTanque as id,
            nomeVinho as tipo,
            fkTipoVinho as fk,
            statusTanque as atv
                from tbTanque
                join tbTipoVinho on fkTipoVinho = idTipoVinho
                    where fkEmpresa = 1
                    order by idTanque;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarTanque(idEmpresa, idVinho, status) {
    const instrucaoSql = `
        INSERT INTO tbTanque (fkEmpresa, fkTipoVinho, statusTanque) VALUE 
            (${idEmpresa}, ${idVinho}, '${status}');
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterTanquesEmpresa,
    adicionarTanque
};