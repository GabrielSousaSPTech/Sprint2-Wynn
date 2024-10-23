function mostrarSenha(botaoClicado) {
    // O PARAMETRO DA FUNÇÂO É O ELEMENTO HTML DO BOTÃO QUE FOI CLICADO, ELE È PEGO POIS COLOCAMOS LA NO ONCLICK O THIS DENTRO DO PARAMETRO, QUE FAZ SE REFERIR AO ELEMENTO CLICADO
    var iconOlho = botaoClicado.querySelector('.showHideSenha')
    //  PEGA O ELEMENTO PAI DO BOTÃO, QUE NO CASO È O SPAN, QUE ESTÀ ENGLOBANDO O BOTÃO E O INPUT
    var elementoPai = botaoClicado.parentNode;
    // AQUI EU PEGO O ELEMENTO PAI E VERIFICO SE TEM UM INPUT DENTRO DELE, QUE NO CASO VAI TER NOS SPANS DE SENHA
    var inputSenha = elementoPai.querySelector('input')
    // PUXANDO O INPUT QUE ESTÀ NO SPAN PAI, COLOCO inputSenha.type E ATUALIZO O TIPO DO INPUT CONFORME ESTÁ EM PASSWORD OU TEXT
    if (inputSenha.type == 'password') {
        iconOlho.src = './assets/icons/olho-aberto.png'
        inputSenha.type = 'text'
    } else {  
        iconOlho.src = './assets/icons/olho-fechado.png'
        inputSenha.type = 'password'
    }
}