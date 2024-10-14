function mostrarSenhaLogin(){

    if(senhaLogin.type == 'password') {
        showHideSenha.src = './assets/icons/olho-fechado.png'
        senhaLogin.type = 'text'
    } else {
        showHideSenha.src = './assets/icons/olho-aberto.png'
        senhaLogin.type = 'password'

    }
}

function checarCredenciais(){
    const email = emailLogin.value
    const senha = senhaLogin.value

    if(email == 'sptech' && senha == 'urubu100'){
        window.location.href = './dashboard.html'
    }else {
        respostaVerificacao.innerText = 'Usuário ou senha inválido(s)'
    }
}