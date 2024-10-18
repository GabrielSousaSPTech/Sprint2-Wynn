function mostrarSenha() {

    if (senha.type == 'password') {
        showHideSenha.src = './assets/icons/olho-fechado.png'
        senha.type = 'text'
    } else {
        showHideSenha.src = './assets/icons/olho-aberto.png'
        senha.type = 'password'

    }
}

