
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
            indiceEmail = email.length - 1
        }
    }
    if (isEmail) {

        if (verificacaoEmail && verificacaoSenha) {
            console.log(operacaoLogin)

            fetch("/usuarios/autenticar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailServer: email,
                    senhaServer: senha,
                    operacaoServer: operacaoLogin
                })
            }).then(function (resposta) {
                console.log("ESTOU NO THEN DO entrar()! " + resposta.data)

                if (resposta.ok) {
                    console.log(resposta);

                    resposta.json().then(json => {
                        console.log(json);
                        console.log(JSON.stringify(json));
                        
                        sessionStorage.ID_USUARIO = json.id;
                        sessionStorage.NOME_USUARIO = json.nome;
                        sessionStorage.EMAIL_USUARIO = json.email;

                        if(operacaoLogin != 'Administrador') {
                            sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)
                        }


                        setTimeout(function () {
                            if(operacaoLogin != 'Administrador') {
                                window.location = "./dashboard/dashboard.html";
                            } else {
                                window.location = "./dashboard/bobia.html"
                            }
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
    } else {
        fraseErroDeLogin = 'Digite um E-mail'
    }

    respostaVerificacao.innerText = fraseErroDeLogin
}

