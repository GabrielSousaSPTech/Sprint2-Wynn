function obterDados() {
    fetch(`/tipoVinho/listar`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                exibirLista(res)
                localStorage.dados = JSON.stringify(res)
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
    console.log(dadosVinho)
    var posLocalStorage = -1

    for (var json = 0;
        json < dadosVinho.length;
        json++
    ) {
        var jsonAtual = dadosVinho[json]
        var idTipo = jsonAtual.idTipoVinho
        var nome = jsonAtual.nomeVinho
        var tempPerigoMin = parseInt(jsonAtual.metricaTemperaturaPerigoMin)
        var tempPerigoMax = parseInt(jsonAtual.metricaTemperaturaPerigoMax)
        var tempCritMin = parseInt(jsonAtual.metricaTemperaturaCriticoMin)
        var tempCritMax = parseInt(jsonAtual.metricaTemperaturaCriticoMax)
        var co2PerigoMin = parseInt(jsonAtual.metricaCO2PerigoMin)
        var co2PerigoMax = parseInt(jsonAtual.metricaCO2PerigoMax)
        var co2CritMin = parseInt(jsonAtual.metricaCO2CriticoMin)
        var co2CritMax = parseInt(jsonAtual.metricaCO2CriticoMax)

        posLocalStorage++

        tbody.innerHTML += `
            <tr>
                <th class="celula-numero">${idTipo}</th>
                    <td>${nome}</td>
                    <td>&downarrow;${tempPerigoMin}°C | &uparrow;${tempPerigoMax}°C</td>
                    <td>&downarrow;${tempCritMin}°C | &uparrow;${tempCritMax}°C</td>
                    <td>&downarrow;${co2PerigoMin}% | &uparrow;${co2PerigoMax}%</td>
                    <td>&downarrow;${co2CritMin}% | &uparrow;${co2CritMax}%</td>
                    <td class="tabela-icone">
                        <button class="botao-tabela" onclick="exibirOcultarMenu('editar', ${posLocalStorage})">
                            <img src="../assets/icons/icon_gear.png">
                        </button>
                        </td>
                    <td class="tabela-icone">
                        <button onclick="deletarVinho(${idTipo})" class="botao-tabela">
                            <img src="../assets/icons/icon_trashcan.png">
                        </button>
                    </td>
            </tr>
        `
    }
}

var atualizacaoIdTipoVinho = 0


function exibirOcultarMenu(nome = '', idTanque = undefined) {
    div_janela_tabela.style.display = div_janela_tabela.style.display == 'flex' ? 'none' : 'flex'


    const menu = document.getElementById(`aside_menu_${nome}`)
    menu.style.display = menu.style.display == 'none' ? 'flex' : 'none'

    if (idTanque != undefined) {
        var listaTipoVinhos = JSON.parse(localStorage.dados)
        var tipoVinhoAtual = listaTipoVinhos[idTanque]
        var idTipoVinhoAtual = tipoVinhoAtual.idTipoVinho
        atualizacaoIdTipoVinho = idTipoVinhoAtual


        span_id_tanque.innerText = idTipoVinhoAtual

        temp_perigo_min.value = tipoVinhoAtual.metricaTemperaturaPerigoMin
        temp_perigo_max.value = tipoVinhoAtual.metricaTemperaturaPerigoMax
        temp_critica_min.value = tipoVinhoAtual.metricaTemperaturaCriticoMin
        temp_critica_max.value = tipoVinhoAtual.metricaTemperaturaCriticoMax
        co2_perigo_min.value = tipoVinhoAtual.metricaCO2PerigoMin
        co2_perigo_max.value = tipoVinhoAtual.metricaCO2PerigoMax
        co2_critica_min.value = tipoVinhoAtual.metricaCO2CriticoMin
        co2_critica_max.value = tipoVinhoAtual.metricaCO2CriticoMax

    } else {
        obterDados()
    }
}

function atualizarMetricas() {
    var tempPerMin = Number(temp_perigo_min.value)
    var tempPerMax = Number(temp_perigo_max.value)
    var tempCritMin = Number(temp_critica_min.value)
    var tempCritMax = Number(temp_critica_max.value)
    var co2PerMin = Number(co2_perigo_min.value)
    var co2PerMax = Number(co2_perigo_max.value)
    var co2CritMin = Number(co2_critica_min.value)
    var co2CritMax = Number(co2_critica_max.value)

    fetch("/tipoVinho/atualizar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idTipoVinhoServer: atualizacaoIdTipoVinho,
            tempPerMinServer: tempPerMin,
            tempPerMaxServer: tempPerMax,
            tempCritMinServer: tempCritMin,
            tempCritMaxServer: tempCritMax,
            co2PerMinServer: co2PerMin,
            co2PerMaxServer: co2PerMax,
            co2CritMinServer: co2CritMin,
            co2CritMaxServer: co2CritMax
        }),
    })
        .then(function (resposta) {
            console.log(resposta);

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            //   finalizarAguardar();
        });
}

function adicionarTipoVinho() {
    var nome = add_nome_tipo.value
    var tempPerMin = Number(add_temp_perigo_min.value)
    var tempPerMax = Number(add_temp_perigo_max.value)
    var tempCritMin = Number(add_temp_critica_min.value)
    var tempCritMax = Number(add_temp_critica_max.value)
    var co2PerMin = Number(add_co2_perigo_min.value)
    var co2PerMax = Number(add_co2_perigo_max.value)
    var co2CritMin = Number(add_co2_critica_min.value)
    var co2CritMax = Number(add_co2_critica_max.value)

    fetch("/tipoVinho/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            tempPerMinServer: tempPerMin,
            tempPerMaxServer: tempPerMax,
            tempCritMinServer: tempCritMin,
            tempCritMaxServer: tempCritMax,
            co2PerMinServer: co2PerMin,
            co2PerMaxServer: co2PerMax,
            co2CritMinServer: co2CritMin,
            co2CritMaxServer: co2CritMax
        }),
    })
        .then(function (resposta) {
            console.log(resposta);

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            //   finalizarAguardar();
        });
}

function deletarVinho(idTipo) {
    fetch(`/tipoVinho/deletar/${idTipo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        console.log(resposta)
        alert("Tipo deletado")
    }).catch(function (erro) {
        console.log('Erro ao exibir kpi ' + erro)
    })

    setTimeout(function() {
        obterDados()
    }, 1000)  

}