var database = require("../database/config")

function autenticar(operacao, email, senha) {
    console.log('\nO model recebeu a operacao... ' + operacao + '\n')

    if (operacao == 'Funcionario') {
        var instrucaoSql = `
            SELECT
                idFuncionario as id,
                nomeFuncionario as nome,
                emailFuncionario as email,
                fkEmpresa
                    from tbFuncionario
                    where emailFuncionario = '${email}' AND senhaFuncionario = MD5('${senha}');
        `

    } else {
        var instrucaoSql = `
            SELECT 
                id${operacao} as id, 
                nome${operacao} as nome, 
                email${operacao} as email
                    FROM tb${operacao} 
                    WHERE email${operacao} = '${email}' AND senha${operacao} = MD5('${senha}');
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa, dataNascimento, telefone) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbFuncionarioEmpresa (nomeFuncionarioEmpresa, idEmpresa, dataNascFuncionarioEmpresa, foneFuncionarioEmpresa, emailFuncionarioEmpresa, senhaFuncionarioEmpresa) VALUES ('${nome}', '${fkEmpresa}', '${dataNascimento}', '${telefone}', '${email}', MD5('${senha}') );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};