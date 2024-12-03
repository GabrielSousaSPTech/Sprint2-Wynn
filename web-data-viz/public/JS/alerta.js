var alertas = [];


// ANALISAR A NECESSIDADE DO ''alerta.js'' PARA O NOSSO PROJETO


function obterdados(idAquario) {
    fetch(`/medidas/tempo-real/${idAquario}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idAquario);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idAquario} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idAquario) {
    var temp = Number(resposta[0].temperatura);

    var grauDeAviso = '';

    var limites = {
        muito_quente: Number(resposta[0].temperaturaCriticoMax),
        quente: Number(resposta[0].temperauraPerigoMax),
        ideal: resposta[0],
        frio: Number(resposta[0].temperaturaMinPerigo),
        muito_frio: Number(resposta[0].temperaturaCriticoMin)
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        grauDeAviso = 'ideal';
        grauDeAvisoCor = 'cor-alerta alerta-ideal';
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
        removerAlerta(idAquario);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`temp_aquario_${idAquario}`) != null) {
        document.getElementById(`temp_aquario_${idAquario}`).innerHTML = temp + "°C";
    }

    if (document.getElementById(`card_${idAquario}`)) {
        card = document.getElementById(`card_${idAquario}`)
        card.className = classe_temperatura;
    }
}

function exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idAquario == idAquario);

    if (indice >= 0) {
        alertas[indice] = { idAquario, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idAquario, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idAquario) {
    alertas = alertas.filter(item => item.idAquario != idAquario);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idAquario, temp, grauDeAviso, grauDeAvisoCor }) {

    var icone = "fermentacao_ok.png";
    var status = "OK";
    var corStatus = "verde";
    if (grauDeAviso == "perigo quente") {
        icone = "fermentacao_critico.png";
        status = "PERIGO";
        corStatus = "vermelho";
    } else if (grauDeAviso == "alerta quente") {
        icone = "fermentacao_acima.png";
        status = "ATENÇÃO";
        corStatus = "amarelo";
    } else if (grauDeAviso == "alerta frio") {
        icone = "fermentacao_abaixo.png";
        status = "ATENÇÃO";
        corStatus = "amarelo"
    } else if (grauDeAviso == "perigo frio") {
        icone = "fermentacao_congelado.png";
        status = "PERIGO";
        corStatus = "vermelho";
    }

    const divStatus = document.getElementById(`alerta-status${idAquario}`);
    divStatus.innerHTML = `
                            <h2>STATUS</h2>
                            <p><span class="span-alerta alerta-${corStatus}">${status}</span></p>
    `
    const imagem = document.getElementById(`icone${idAquario}`);
    imagem.src = `../css/dasboard/imgs/${icone}`;

    var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == idAquario).descricao;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${descricao} ${idAquario} está em estado de ${grauDeAviso}!</h3>
            <small>Temperatura capturada: ${temp}°C.</small>   
        </div>
    </div>
    `;
}

function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.AQUARIOS).forEach(item => {
        obterdados(item.id)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}
