
// ANALISAR A NECESSIDADE DO ''usuarioController.js'' PARA O NOSSO PROJETO

var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var operacao = req.body.operacaoServer

    if (email == undefined) {
        res.status(400).send("Seu email está incorreto!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está incorreto!");
    } else {

        usuarioModel.autenticar(operacao, email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (operacao != 'Administrador') {

                        if (resultadoAutenticar.length == 1) {

                            const idEmpresa = operacao == 'Empresa' ? resultadoAutenticar[0].id : resultadoAutenticar[0].fkEmpresa


                            aquarioModel.buscarAquariosPorEmpresa(idEmpresa)
                                .then((resultadoAquarios) => {
                                    if (resultadoAquarios.length > 0) {
                                        res.json({
                                            id: resultadoAutenticar[0].id,
                                            email: resultadoAutenticar[0].email,
                                            nome: resultadoAutenticar[0].nome,
                                            aquarios: resultadoAquarios
                                        });
                                    } else {
                                        res.status(204).json({ aquarios: [] });
                                    }
                                })

                        } else if (resultadoAutenticar.length == 0) {
                            res.status(403).send("Email e/ou senha inválido(s)");
                        } else {
                            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                        }

                    } else {
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome
                        })
                    }


                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dataNascimento = req.body.dataNascimentoServer;
    var telefone = req.body.telefoneServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está incorreto!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está incorreto!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está incorreto!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está incorreto!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, dataNascimento, telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}




// aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
//                             .then((resultadoAquarios) => {
//                                 if (resultadoAquarios.length > 0) {
//                                     res.json({
//                                         id: resultadoAutenticar[0].id,
//                                         email: resultadoAutenticar[0].email,
//                                         nome: resultadoAutenticar[0].nome,
//                                         senha: resultadoAutenticar[0].senha,
//                                         aquarios: resultadoAquarios
//                                     });
//                                 } else {
//                                     res.status(204).json({ aquarios: [] });
//                                 }
//                             })