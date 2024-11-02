
function checarCredenciais() {
    const email = emailLogin.value
    const senha = senhaLogin.value

    const verificacaoEmail = email != '';
    const verificacaoSenha = senha != '';
    var fraseErroDeLogin = ''
    var isEmail = false
    for (var indiceEmail = 0; indiceEmail < email.length; indiceEmail++) {
        if (email[indiceEmail] == '@') {
            isEmail = true
            indiceEmail = email.length-1
        }
    }
        if(isEmail){

            if (verificacaoEmail && verificacaoSenha) {
                fetch("/usuarios/autenticar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        emailServer: email,
                        senhaServer: senha
                    })
                }).then(function (resposta) {
                    console.log("ESTOU NO THEN DO entrar()! " + resposta.data)
            
                    if (resposta.ok) {
                        console.log(resposta);
            
                        resposta.json().then(json => {
                            console.log(json);
                            console.log(JSON.stringify(json));
                            sessionStorage.EMAIL_USUARIO = json.email;
                            sessionStorage.NOME_USUARIO = json.nome;
                            sessionStorage.ID_USUARIO = json.id;
                            // sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)
                        
                            
                            setTimeout(function () {
                                
                                window.location = "./dashboard/dashboard.html";
                            }, 1000); // apenas para exibir o loading
            
                        });
            
                    } else {
            
                        console.log("Houve um erro ao tentar realizar o login!");
            
                        resposta.text().then(texto => {
                            console.error(texto);
                            finalizarAguardar(texto);
                        });
                    }
            
                }).catch(function (erro) {
                    console.log(erro);
                })
            
                return false;
                
                
            } else {
                    fraseErroDeLogin = 'Usuário ou senha inválido(s)'
                }
        }else{
            fraseErroDeLogin = 'Digite um E-mail'
        }

    respostaVerificacao.innerText = fraseErroDeLogin
}

// function entrar() {
//     aguardar();

//     var emailVar = email_input.value;
//     var senhaVar = senha_input.value;

//     if (emailVar == "" || senhaVar == "") {
//         cardErro.style.display = "block"
//         mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
//         finalizarAguardar();
//         return false;
//     }
//     else {
//         setInterval(sumirMensagem, 5000)
//     }

//     console.log("FORM LOGIN: ", emailVar);
//     console.log("FORM SENHA: ", senhaVar);

//     fetch("/usuarios/autenticar", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             emailServer: emailVar,
//             senhaServer: senhaVar
//         })
//     }).then(function (resposta) {
//         console.log("ESTOU NO THEN DO entrar()!")

//         if (resposta.ok) {
//             console.log(resposta);

//             resposta.json().then(json => {
//                 console.log(json);
//                 console.log(JSON.stringify(json));
//                 sessionStorage.EMAIL_USUARIO = json.email;
//                 sessionStorage.NOME_USUARIO = json.nome;
//                 sessionStorage.ID_USUARIO = json.id;
//                 sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)

//                 setTimeout(function () {
//                     window.location = "./dashboard/cards.html";
//                 }, 1000); // apenas para exibir o loading

//             });

//         } else {

//             console.log("Houve um erro ao tentar realizar o login!");

//             resposta.text().then(texto => {
//                 console.error(texto);
//                 finalizarAguardar(texto);
//             });
//         }

//     }).catch(function (erro) {
//         console.log(erro);
//     })

//     return false;
// }

// function sumirMensagem() {
//     cardErro.style.display = "none"
// }