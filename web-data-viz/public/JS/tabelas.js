function exibirOcultarMenu(nome = '', idTanque = undefined) {
    div_janela_tabela.style.display = div_janela_tabela.style.display == 'flex' ? 'none' : 'flex'

    const menu = document.getElementById(`aside_menu_${nome}`)
    menu.style.display = menu.style.display  == 'none' ? 'flex' : 'none'

    if(idTanque != undefined) {
        span_id_tanque.innerText = idTanque
    }
}