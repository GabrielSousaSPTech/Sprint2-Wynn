var database = require("../database/config")

function obterTanquesEmpresa(idEmpresa) {

    const instrucaoSql = `
        select
            idTanque as id,
            nomeTanque as nome,
            nomeVinho as tipo,
            fkTipoVinho as fk,
            statusTanque as atv
                from tbTanque
                join tbTipoVinho on fkTipoVinho = idTipoVinho
                    where fkEmpresa = ${idEmpresa}
                    order by idTanque;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarTanque(nome, idEmpresa, idVinho, status) {
    const instrucaoSql = `
        INSERT INTO tbTanque (nomeTanque ,fkEmpresa, fkTipoVinho, statusTanque) VALUE 
            ('${nome}', ${idEmpresa}, ${idVinho}, '${status}');
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterTanquesEmpresa,
    adicionarTanque
};