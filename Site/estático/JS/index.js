function simularPerda() {


    var p = Number(producao.value)
    var d = Number(desperdicio.value)
    var pr = Number(preco.value)

    var rendimentoAnual = p / 0.75 * pr
    var desperdicioAnual = d / 0.75 * pr
    var diferencaRendimento = rendimentoAnual - desperdicioAnual
    var prejuizo = rendimentoAnual - diferencaRendimento


    if (p == 0 || d == 0 || pr == 0) {

        respostaVerificacao.innerText = 'Preencha os Campos'
    } else {
        containerFormulario.style = "display:none;"
        containerFormularioResposta.style = "display: flex"

        containerFormularioResposta.innerHTML = ""

        containerFormularioResposta.innerHTML +=
            `<h2>Simulação concluída com sucesso!</h2>
        <p>Segundo estudos, 5 a 10% da produção de vinho perdem seu valor todos os anos,devido a desvios que surgem durante a fermentação alcoólica. Isso significa que, para uma vinícola, 5 a 10% de sua produção não será vendida ao preço ideal. Ou seja de <span>${rendimentoAnual.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span> que deveria estar rendendo anualmente, a sua vinícola está rendendo <span>${diferencaRendimento.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span> causando um prejuízo de <span> ${prejuizo.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span>!
        </p>
        
        <p>Com um sistema de monitoramento de temperatura e gases, permitirá a você um maior controle no processo de fermentação, te auxiliando em uma maior padronização do seu vinho!</p>
        
        <div class="containerBotaoFormularioResposta">
        <a href="./index.html" class="btnFormularioResposta">Entre em contato com Nossa equipe!</a>
        <span onclick = "simulacaoNovamente()">Simular Novamente</span>
        <img class="icon" src="./assets/icons/iconVinho 2.png" alt="">
        </div>
        `
    }
}

function simulacaoNovamente() {
    containerFormulario.style = "display:flex;"
    containerFormularioResposta.style = "display: none"

    producao.value = ""
    desperdicio.value = ""
    preco.value = ""
}

// Página de Dashboard.

//opções Dashboard
function mudarDashboardGeral() {
    const divSelectTipoVinho = document.getElementById('select-tipo-vinho');

    divSelectTipoVinho.innerHTML = `
             <p>Escolher Tipo de Vinho</p>
                                <select id="select-tipo" onchange="mudarTipoVinho()">
                                    <option value="tinto">Tinto</option>
                                    <option value="rose">Rose</option>
                                    <option value="branco">branco</option>
                                    <option value="frisante">Frisante</option>
                                </select>
        `
    mudarTipoVinho();
}

function mudarDashboardIndividual() {
    const divSelectTipoVinho = document.getElementById('select-tipo-vinho');

    divSelectTipoVinho.innerHTML = `
              <p>Escolher Tanque</p>
                                <select id="select-n-tanque" onchange="mudarTanque()">
                                    <option value="1">I - Tinto</option>
                                    <option value="2">II - Tinto</option>
                                    <option value="3">III - Tinto</option>
                                    <option value="4">IV - Tinto</option>
                                    <option value="5">V - Rose</option>
                                    <option value="6">VI - Rose</option>
                                    <option value="7">VII - Branco</option>
                                    <option value="8">VIII - Branco</option>
                                    <option value="9">IX - Frisante</option>
                                    <option value="10">X - Frisante</option>
                                </select>
        `
    mudarTanque();
}

function mudarTipoVinho() {
    const tipoVinho = document.getElementById("select-tipo").value;
    const divTanques = document.getElementById("tanques");
    const h2tanque = document.getElementById("h2tanque");
    const h2Tipo = document.getElementById("h2tipo");
    const statush2 = document.getElementById("status-h2");

    const displayCO2 = document.getElementById("display_CO2");
    const displayTemperatura = document.getElementById("display_temperatura");

    const displayTempFermentacao = document.getElementById("tempo-fermentacao");
    const displayGraficoDuplo = document.getElementById("display_grafico_duplo");
    const displayGraficoTemp = document.getElementById("display_grafico_temp");
    const displayGraficoCO2 = document.getElementById("display_grafico_co2");

    h2tanque.innerText = "TANQUES";

    if (tipoVinho == "rose") {
        divTanques.innerHTML = `<span>5-6`;
        h2Tipo.innerText = "ROSE";
        statush2.innerText = "TIPO-ROSE";
    } else if (tipoVinho == "branco") {
        divTanques.innerHTML = `<span>7-8`;
        h2Tipo.innerText = "BRANCO";
        statush2.innerText = "TIPO-BRANCO";
    } else if (tipoVinho == "frisante") {
        divTanques.innerHTML = `<span>9-10`;
        h2Tipo.innerText = "FRISANTE";
        statush2.innerText = "TIPO-FRISANTE";
    } else {
        divTanques.innerHTML = `<span>1-4`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TIPO-TINTO";
    }

}

function mudarTanque() {
    const nTanque = document.getElementById("select-n-tanque").value;
    const divTanques = document.getElementById("tanques");
    const h2tanque = document.getElementById("h2tanque");
    const h2Tipo = document.getElementById("h2tipo");
    const statush2 = document.getElementById("status-h2");

    const displayCO2 = document.getElementById("display_CO2");
    const displayTemperatura = document.getElementById("display_temperatura");

    const displayTempFermentacao = document.getElementById("tempo-fermentacao");
    const displayGraficoDuplo = document.getElementById("display_grafico_duplo");
    const displayGraficoTemp = document.getElementById("display_grafico_temp");
    const displayGraficoCO2 = document.getElementById("display_grafico_co2");

    h2tanque.innerText = "TANQUE";

    if (nTanque == "2") {
        divTanques.innerHTML = `<span>02/</span>10`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TANQUE-02";
    } else if (nTanque == "3") {
        divTanques.innerHTML = `<span>03/</span>10`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TANQUE-03";
    } else if (nTanque == "4") {
        divTanques.innerHTML = `<span>04/</span>10`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TANQUE-04";
    } else if (nTanque == "5") {
        divTanques.innerHTML = `<span>05/</span>10`;
        h2Tipo.innerText = "ROSE";
        statush2.innerText = "TANQUE-05";
    } else if (nTanque == "6") {
        divTanques.innerHTML = `<span>06/</span>10`;
        h2Tipo.innerText = "ROSE";
        statush2.innerText = "TANQUE-06";
    } else if (nTanque == "7") {
        divTanques.innerHTML = `<span>07/</span>10`;
        h2Tipo.innerText = "BRANCO";
        statush2.innerText = "TANQUE-07";
    } else if (nTanque == "8") {
        divTanques.innerHTML = `<span>08/</span>10`;
        h2Tipo.innerText = "BRANCO";
        statush2.innerText = "TANQUE-08";
    } else if (nTanque == "9") {
        divTanques.innerHTML = `<span>09/</span>10`;
        h2Tipo.innerText = "FRISANTE";
        statush2.innerText = "TANQUE-09";
    } else if (nTanque == "10") {
        divTanques.innerHTML = `<span>10/</span>10`;
        h2Tipo.innerText = "FRISANTE";
        statush2.innerText = "TANQUE-10";
    } else {
        divTanques.innerHTML = `<span>01/</span>10`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TANQUE-01";
    }

}
// Chart Js

const ctx1 = document.getElementById('grafico1');

new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [{
            label: 'Temperatura',
            data: [27.5, 28.5, 30.2, 29.3, 28.7, 29.6],
            borderWidth: 3
        },
        {
            label: 'Limite Máximo',
            data: [35, 35, 35, 35, 35, 35],
            borderWidth: 1
        },
        {
            label: 'Limite Mínimo',
            data: [24, 24, 24, 24, 24, 24],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

const ctx2 = document.getElementById('grafico2');

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [{
            label: 'CO2',
            data: [80, 82, 79, 76, 74, 72],
            borderWidth: 3
        },
        {
            label: 'Média',
            data: [77, 77, 77, 77, 77, 77],
            borderWidth: 1
        }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

const ctx3 = document.getElementById('grafico3');

new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [{
            label: 'Temperatura',
            data: [27.5, 28.5, 30.2, 29.3, 28.7, 29.6],
            borderWidth: 1
        },
        {
            label: 'CO2',
            data: [80, 82, 79, 76, 74, 72],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

const ctx4 = document.getElementById('grafico4');

const data = {
    /* labels: ['CO2', 'Outros'], */
    datasets: [{
        data: [72, 28],
        borderWidth: 1,
        cutout: '70%',
        circumference: 200,
        rotation: 260,
    },
    ]
};


const doughnutLabel = {
    id: 'doughnutLabel',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = 'bold 4rem sans-serif';
        ctx.fillStyle = 'darkred';
        ctx.textAlign = 'center';
        ctx.textBaseLine = 'middle';
        ctx.fillText(data.datasets[0].data[0], xCoor, yCoor);
    }
}
// config 
const config = {
    type: 'doughnut',
    data,
    options: {
        aspectRatio: 2
    },
    plugins: [doughnutLabel]
};

new Chart(ctx4, config);

// H-Menu
const hamburgerMenu = document.getElementById('h-menu');
const line1 = document.getElementById('line-1');
const line2 = document.getElementById('line-2');
const line3 = document.getElementById('line-3');

function mostrarMenu() {
    if (hamburgerMenu.classList.contains('change-menu')) {
        hamburgerMenu.classList.remove('change-menu');
        line1.classList.remove('change-menu');
        line2.classList.remove('change-menu');
        line3.classList.remove('change-menu');
    } else {
        hamburgerMenu.classList.add('change-menu');
        line1.classList.add('change-menu');
        line2.classList.add('change-menu');
        line3.classList.add('change-menu');
    }
}