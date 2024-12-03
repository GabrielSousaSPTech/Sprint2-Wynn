function obterVinhos() {
    fetch(`/tipoVinho/listar`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                preencherSelectTipos(res)
            }).catch(function () {
            })
        }
    }).catch(function (erro) {
        console.log('Erro ao exibir kpi ' + erro)
    })
}

function preencherSelectTipos(dados) {
    var options = ''

    dados.forEach(vinho => {
        const id = vinho.idTipoVinho
        const nome = vinho.nomeVinho

        options += `<option value="${id}">${nome}</option>`
    });

    const selects = document.getElementsByName('select_tipo_vinho')
    selects.forEach(select => {
        select.innerHTML = options
    })
}

function obterTanques() {
    fetch(`/tanque/listar/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                localStorage.tanques = JSON.stringify(res)
                listarTanques(res)
            }).catch(function (err) {
                console.log(err)
            })
        }
    }).catch(function (erro) {
        console.log(erro)
    })
}

function listarTanques(dados) {
    tbody_lista.innerHTML = ''

    dados.forEach(tanque => {
        const id = tanque.id
        const tipo = tanque.tipo
        const status = tanque.atv

        const statusFormatado = status.charAt(0).toUpperCase() + status.slice(1)

        tbody_lista.innerHTML += `
            <tr>
                <th class="celula-numero">${id}</th>
                <td>${tipo}</td>
                <td class="celula-status ${status}"><span>${statusFormatado}</span></td>
                <td class="tabela-icone">
                    <button class="botao-tabela" onclick="exibirOcultarMenu('editar', false, ${id - 1})">
                        <img src="../assets/icons/icon_gear.png">
                    </button>
                </td>
                <td class="tabela-icone">
                    <button class="botao-tabela">
                        <img src="../assets/icons/icon_trashcan.png">
                    </button>
                </td>
            </tr>
        `
    });
}

var idTanqueEditar = undefined

function exibirOcultarMenu(nomeMenu = '', voltar = false, pos = undefined) {
    div_janela_tabela.style.display = div_janela_tabela.style.display == 'flex' ? 'none' : 'flex'

    const menu = document.getElementById(`aside_menu_${nomeMenu}`)
    menu.style.display = menu.style.display == 'none' ? 'flex' : 'none'

    if (pos != undefined && nomeMenu == 'editar') {
        const tanqueSelecionado = localStorage.tanques[pos]
        const idSelecionado = tanqueSelecionado.id

        idTanqueEditar = idSelecionado

        span_id_tanque.innerText = idSelecionado
        select_editar_tipo_vinho.value = tanqueSelecionado.fkTipo
        select_editar_atividade.value = tanqueSelecionado.atv
    }

    if (voltar) {
        idTanqueEditar = undefined
        obterTanques()
    }
}

function adicionarTanque() {
    const idVinho = select_adicionar_tipo_vinho.value
    const atvTanque = select_adicionar_atividade.value

    fetch('/tanque/adicionar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresa: sessionStorage.ID_USUARIO,
            idVinho: idVinho,
            status: atvTanque
        })
    }).then(function (resposta) {
        console.log(resposta)

        if (resposta.ok) {
            alert('Tanque adicionado com sucesso.')
        }
    }).catch(function (erro) {
        console.log(erro)
    })
}