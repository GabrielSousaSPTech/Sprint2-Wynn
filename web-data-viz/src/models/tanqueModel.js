var database = require("../database/config")

function obterTanquesEmpresa(idEmpresa) {
    
    var instrucaoSql = `
        select
	        idTanque as id,
            nomeVinho as tipo,
            statusTanque as atv
	        	from tbTanque
                join tbTipoVinho on fkTipoVinho = idTipoVinho
                where fkEmpresa = ${idEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterTanquesEmpresa
};