function obterDados() {
    fetch(`/tipoVinho/listar/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                exibirLista(res)
                localStorage.vinhos = JSON.stringify(res)
                console.log(res)
            }).catch(function () {
            })
        }
    }).catch(function (erro) {
        console.log('Erro ao exibir kpi ' + erro)
    })
}

function exibirLista(dadosVinho) {
    tbody.innerHTML = ""

    var posLocalStorage = -1

    for (var json = 0;
        json < dadosVinho.length;
        json++
    ) {
        const jsonAtual = dadosVinho[json]

        const idTipo = jsonAtual.idTipoVinho
        const nome = jsonAtual.nomeVinho
        const tempPerigoMin = parseInt(jsonAtual.metricaTemperaturaPerigoMin)
        const tempPerigoMax = parseInt(jsonAtual.metricaTemperaturaPerigoMax)
        const tempCritMin = parseInt(jsonAtual.metricaTemperaturaCriticoMin)
        const tempCritMax = parseInt(jsonAtual.metricaTemperaturaCriticoMax)

        posLocalStorage++

        tbody.innerHTML += `
            <tr>
                <th class="celula-numero">${idTipo}</th>
                    <td>${nome}</td>
                    <td>&downarrow;${tempPerigoMin}°C | &uparrow;${tempPerigoMax}°C</td>
                    <td>&downarrow;${tempCritMin}°C | &uparrow;${tempCritMax}°C</td>
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
    }
}

var idVinhoEditar = undefined

function exibirOcultarMenu(nomeMenu = '', voltar = false, pos = -1) {
    div_janela_tabela.style.display = div_janela_tabela.style.display == 'flex' ? 'none' : 'flex'

    const menu = document.getElementById(`aside_menu_${nomeMenu}`)
    menu.style.display = menu.style.display == 'none' ? 'flex' : 'none'

    if (!voltar) {
        if (pos != -1 && (nomeMenu == 'editar' || nomeMenu == 'excluir')) {
            const vinhoSelecionado = JSON.parse(localStorage.vinhos)[pos]

            const idSelecionado = vinhoSelecionado.idTipoVinho
            idVinhoEditar = idSelecionado

            const spanId = document.getElementById(`span_id_vinho_${nomeMenu}`)
            spanId.innerText = idSelecionado

            if (nomeMenu == 'editar') {
                nome_tipo.value = vinhoSelecionado.nomeVinho
                temp_perigo_min.value = vinhoSelecionado.metricaTemperaturaPerigoMin
                temp_perigo_max.value = vinhoSelecionado.metricaTemperaturaPerigoMax
                temp_critica_min.value = vinhoSelecionado.metricaTemperaturaCriticoMin
                temp_critica_max.value = vinhoSelecionado.metricaTemperaturaCriticoMax
            }
        }
    } else {
        editarTipoVinho = undefined
        obterDados()
    }
}

function atualizarMetricas() {
    const nome = nome_tipo.value
    const tempPerMin = Number(temp_perigo_min.value)
    const tempPerMax = Number(temp_perigo_max.value)
    const tempCritMin = Number(temp_critica_min.value)
    const tempCritMax = Number(temp_critica_max.value)

    fetch("/tipoVinho/atualizar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idVinho: idVinhoEditar,
            nome: nome,
            tempPerMin: tempPerMin,
            tempPerMax: tempPerMax,
            tempCritMin: tempCritMin,
            tempCritMax: tempCritMax
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                alert('Vinho atualizado com sucesso')
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    setTimeout(function () {
        exibirOcultarMenu('editar', true)
    }, 1000)
}

function adicionarTipoVinho() {
    const nome = add_nome_tipo.value
    const tempPerMin = Number(add_temp_perigo_min.value)
    const tempPerMax = Number(add_temp_perigo_max.value)
    const tempCritMin = Number(add_temp_critica_min.value)
    const tempCritMax = Number(add_temp_critica_max.value)

    fetch("/tipoVinho/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresa: sessionStorage.ID_USUARIO,
            nome: nome,
            tempPerMin: tempPerMin,
            tempPerMax: tempPerMax,
            tempCritMin: tempCritMin,
            tempCritMax: tempCritMax
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                alert('Vinho cadastrado com sucesso')
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    setTimeout(() => {
        exibirOcultarMenu('adicionar', true)
    }, 1000)
}

function deletarVinho() {
    fetch(`/tipoVinho/deletar/${idVinhoEditar}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            alert("Tipo deletado")
        }
    }).catch(function (erro) {
        console.log('Erro ao exibir kpi ' + erro)
    })

    setTimeout(function () {
        exibirOcultarMenu('excluir', true)
    }, 1000)
}