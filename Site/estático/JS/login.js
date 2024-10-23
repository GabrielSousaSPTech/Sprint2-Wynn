
function checarCredenciais() {
    const email = emailLogin.value
    const senha = senhaLogin.value

    const verificacaoEmail = email == 'sptech@sptech';
    const verificacaoSenha = senha == 'urubu100'
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
                
                window.location.href = './dashboard.html'
            } else {
                    fraseErroDeLogin = 'Usuário ou senha inválido(s)'
                }
        }else{
            fraseErroDeLogin = 'Digite um E-mail'
        }

    respostaVerificacao.innerText = fraseErroDeLogin
}