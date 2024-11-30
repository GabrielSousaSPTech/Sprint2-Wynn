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