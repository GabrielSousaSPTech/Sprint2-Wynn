function obterDados() {
    fetch(`/tipoVinho/listar`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                exibirLista(res)
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


        tbody.innerHTML += `
            <tr>
                <th class="celula-numero">${idTipo}</th>
                    <td>${nome}</td>
                    <td>&downarrow;${tempPerigoMin}°C | &uparrow;${tempPerigoMax}°C</td>
                    <td>&downarrow;${tempCritMin}°C | &uparrow;${tempCritMax}°C</td>
                    <td>&downarrow;${co2PerigoMin}% | &uparrow;${co2PerigoMax}%</td>
                    <td>&downarrow;${co2CritMin}% | &uparrow;${co2CritMax}%</td>
                    <td class="tabela-icone">
                        <button class="botao-tabela" onclick="exibirOcultarMenu('editar', ${idTipo})">
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
            idTipoVinhoServer: 1,
            tempPerMinServer: tempPerMin,
            tempPerMaxServer:tempPerMax,
            tempCritMinServer:tempCritMin,
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