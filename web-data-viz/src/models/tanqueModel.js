var database = require("../database/config")

function obterTanquesEmpresa(idEmpresa) {

    const instrucaoSql = `
        select
            idTanque as id,
            nomeTanque as nome,
            nomeVinho as tipo,
            fkTipoVinho as fk,
            statusTanque as atv
                from tbTanque as t
                join tbTipoVinho on fkTipoVinho = idTipoVinho
                    where t.fkEmpresa = ${idEmpresa}
                    order by idTanque;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarTanque(idTanque, nome, idVinho, status) {
    const instrucaoSql = `
        update tbTanque
            set nomeTanque = '${nome}',
            fkTipoVinho = ${idVinho},
            statusTanque = '${status}'
                where idTanque = ${idTanque};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirTanque(id) {
    const instrucaoSql = `
        delete from tbTanque
            where idTanque = ${id};
    `

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
    atualizarTanque,
    excluirTanque,
    adicionarTanque
};