function obterVinhos() {
    fetch(`/tipoVinho/listar/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
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
    var posLocalStorage = -1

    dados.forEach(tanque => {
        const id = tanque.id
        const nome = tanque.nome
        const tipo = tanque.tipo
        const status = tanque.atv

        const statusFormatado = status.charAt(0).toUpperCase() + status.slice(1)

        posLocalStorage++

        tbody_lista.innerHTML += `
            <tr>
                <th class="celula-numero">${id}</th>
                <td class="celula-nome">${nome}</td>
                <td>${tipo}</td>
                <td class="celula-status ${status}"><span>${statusFormatado}</span></td>
                <td class="tabela-icone">
                    <button class="botao-tabela" onclick="exibirOcultarMenu('editar', false, ${posLocalStorage})">
                        <img src="../assets/icons/icon_gear.png">
                    </button>
                </td>
                <td class="tabela-icone">
                    <button class="botao-tabela" onclick="exibirOcultarMenu('excluir', false, ${posLocalStorage})">
                        <img src="../assets/icons/icon_trashcan.png">
                    </button>
                </td>
            </tr>
        `
    });
}

var idTanqueEditar = undefined

function exibirOcultarMenu(nomeMenu = '', voltar = false, pos = -1) {
    div_janela_tabela.style.display = div_janela_tabela.style.display == 'flex' ? 'none' : 'flex'

    const menu = document.getElementById(`aside_menu_${nomeMenu}`)
    menu.style.display = menu.style.display == 'none' ? 'flex' : 'none'

    if (!voltar) {
        if (pos != -1 && (nomeMenu == 'editar' || nomeMenu == 'excluir')) {
            const tanqueSelecionado = JSON.parse(localStorage.tanques)[pos]
            const idSelecionado = tanqueSelecionado.id
    
            idTanqueEditar = idSelecionado
    
            const spanId = document.getElementById(`span_id_tanque_${nomeMenu}`)
            spanId.innerText = idSelecionado
    
            if (nomeMenu == 'editar') {
                input_editar_nome_tanque.value = tanqueSelecionado.nome
                select_editar_tipo_vinho.value = tanqueSelecionado.fk
                select_editar_atividade.value = tanqueSelecionado.atv
            }
        }
    } else {
        idTanqueEditar = undefined
        obterTanques()
    }
}


var operacao = ''

function atualizarTanque() {
    operacao = 'atualizado'

    const nome = input_editar_nome_tanque.value
    const idVinho = Number(select_editar_tipo_vinho.value)
    const atvTanque = select_editar_atividade.value


    fetch('/tanque/atualizar', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idTanque: idTanqueEditar,
            nome: nome,
            idVinho: idVinho,
            status: atvTanque
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            if (atvTanque == 'ativo') {
                atualizarTanquesSessao()
            } else {
                alert('Tanque atualizado com sucesso')
            }
        }
    }).catch(function (erro) {
        console.log(erro)
    })

    setTimeout(() => {
        exibirOcultarMenu('editar', true)
    }, 1000)
}

function excluirTanque() {
    operacao = 'excluído'

    fetch(`/tanque/excluir/${idTanqueEditar}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        console.log(resposta)

        if (resposta.ok) {
            atualizarTanquesSessao()
            obterTanques()
        }
    }).catch(function (erro) {
        console.log('Erro ao exibir kpi ' + erro)
    })

    setTimeout(function () {
        exibirOcultarMenu('excluir', true)
    }, 1000)
}

function adicionarTanque() {
    operacao = 'adicionado'

    const nome = input_adicionar_nome_tanque.value
    const idVinho = Number(select_adicionar_tipo_vinho.value)
    const atvTanque = select_adicionar_atividade.value

    fetch('/tanque/adicionar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeTanque: nome,
            idEmpresa: sessionStorage.ID_USUARIO,
            idVinho: idVinho,
            status: atvTanque
        })
    }).then(function (resposta) {
        console.log(resposta)

        if (resposta.ok) {
            atualizarTanquesSessao()
        }
    }).catch(function (erro) {
        console.log(erro)
    })

    setTimeout(() => {
        exibirOcultarMenu('adicionar', true)
    }, 1000)
}

function atualizarTanquesSessao() {
    fetch(`/aquarios/listar/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                sessionStorage.AQUARIOS = JSON.stringify(res)

                alert(`Tanque ${operacao} com sucesso.`)
            }).catch(function (err) {
                console.log(err)
            })
        }
    }).catch(function (erro) {
        console.log(erro)
    })
}