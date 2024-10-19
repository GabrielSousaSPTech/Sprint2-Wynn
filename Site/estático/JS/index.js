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
        displayTempFermentacao.innerHTML = `
        <span>14</span>h<span>|20</span>h
        `
        displayTemperatura.innerHTML = `
        <h3>
            <span class="minima_temperatura">18,9°<i class="fa-solid fa-arrow-down"></i></span>
            23,2°
            <span class="maxima_temperatura">24,0°<i class="fa-solid fa-arrow-up"></i></span>
        </h3>
        `
        mostrarGraficosTempRose();
    } else if (tipoVinho == "branco") {
        divTanques.innerHTML = `<span>7-8`;
        h2Tipo.innerText = "BRANCO";
        statush2.innerText = "TIPO-BRANCO";
        displayTempFermentacao.innerHTML = `
        <span>10</span>h<span>|08</span>h
        `
    } else if (tipoVinho == "frisante") {
        divTanques.innerHTML = `<span>9-10`;
        h2Tipo.innerText = "FRISANTE";
        statush2.innerText = "TIPO-FRISANTE";
        displayTempFermentacao.innerHTML = `
        <span>06</span>h<span>|12</span>h
        `
    } else {
        divTanques.innerHTML = `<span>1-4`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TIPO-TINTO";
        displayTempFermentacao.innerHTML = `
        <span>30</span>h<span>|23</span>h<span>|18</span>h<span>|30</span>h
        `
        displayTemperatura.innerHTML = `
        <h3>
            <span class="minima_temperatura">25,3°<i class="fa-solid fa-arrow-down"></i></span>
            28,3°
            <span class="maxima_temperatura">30,2°<i class="fa-solid fa-arrow-up"></i></span>
        </h3>
        `
        mostrarGraficosTempTinto();
        mostrarGraficosCO2Tinto();
        mostrarGraficosTempCO2Tinto();
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
        displayTempFermentacao.innerHTML = `<span>23</span>h`;
        displayTemperatura.innerHTML = `
        <h3>
            <span class="minima_temperatura">26,2°<i class="fa-solid fa-arrow-down"></i></span>
            27,6°
            <span class="maxima_temperatura">28,7°<i class="fa-solid fa-arrow-up"></i></span>
        </h3>
    `
        mostrarGraficoTemp('tanque2');
        mostrarGraficoCO2('tanque2');
        mostrarGraficoTempCO2('tanque2');
    } else if (nTanque == "3") {
        divTanques.innerHTML = `<span>03/</span>10`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TANQUE-03";
        displayTempFermentacao.innerHTML = `<span>18</span>h`;
        displayTemperatura.innerHTML = `
        <h3>
            <span class="minima_temperatura">27,2°<i class="fa-solid fa-arrow-down"></i></span>
            27,4°
            <span class="maxima_temperatura">28,7°<i class="fa-solid fa-arrow-up"></i></span>
        </h3>
    `
        mostrarGraficoTemp('tanque3');
        mostrarGraficoCO2('tanque3');
        mostrarGraficoTempCO2('tanque3');
    } else if (nTanque == "4") {
        divTanques.innerHTML = `<span>04/</span>10`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TANQUE-04";
        displayTempFermentacao.innerHTML = `<span>30</span>h`;
        displayTemperatura.innerHTML = `
        <h3>
            <span class="minima_temperatura">25,3°<i class="fa-solid fa-arrow-down"></i></span>
            28,8°
            <span class="maxima_temperatura">28,8°<i class="fa-solid fa-arrow-up"></i></span>
        </h3>
    `
        mostrarGraficoTemp('tanque4');
        mostrarGraficoCO2('tanque4');
        mostrarGraficoTempCO2('tanque4');
    } else if (nTanque == "5") {
        divTanques.innerHTML = `<span>05/</span>10`;
        h2Tipo.innerText = "ROSE";
        statush2.innerText = "TANQUE-05";
        displayTempFermentacao.innerHTML = `<span>14</span>h`;
        displayTemperatura.innerHTML = `
                                <h3>
                                    <span class="minima_temperatura">18,9°<i class="fa-solid fa-arrow-down"></i></span>
                                    22,5°
                                    <span class="maxima_temperatura">23,1°<i class="fa-solid fa-arrow-up"></i></span>
                                </h3>
        `
        mostrarGraficoTemp('tanque5');
    } else if (nTanque == "6") {
        divTanques.innerHTML = `<span>06/</span>10`;
        h2Tipo.innerText = "ROSE";
        statush2.innerText = "TANQUE-06";
        displayTempFermentacao.innerHTML = `<span>20</span>h`;
        displayTemperatura.innerHTML = `
                                <h3>
                                    <span class="minima_temperatura">19,8°<i class="fa-solid fa-arrow-down"></i></span>
                                    23,9°
                                    <span class="maxima_temperatura">24,0°<i class="fa-solid fa-arrow-up"></i></span>
                                </h3>
        `
        mostrarGraficoTemp('tanque6');
    } else if (nTanque == "7") {
        divTanques.innerHTML = `<span>07/</span>10`;
        h2Tipo.innerText = "BRANCO";
        statush2.innerText = "TANQUE-07";
        displayTempFermentacao.innerHTML = `<span>10</span>h`;
    } else if (nTanque == "8") {
        divTanques.innerHTML = `<span>08/</span>10`;
        h2Tipo.innerText = "BRANCO";
        statush2.innerText = "TANQUE-08";
        displayTempFermentacao.innerHTML = `<span>08</span>h`;
    } else if (nTanque == "9") {
        divTanques.innerHTML = `<span>09/</span>10`;
        h2Tipo.innerText = "FRISANTE";
        statush2.innerText = "TANQUE-09";
        displayTempFermentacao.innerHTML = `<span>06</span>h`;
    } else if (nTanque == "10") {
        divTanques.innerHTML = `<span>10/</span>10`;
        h2Tipo.innerText = "FRISANTE";
        statush2.innerText = "TANQUE-10";
        displayTempFermentacao.innerHTML = `<span>12</span>h`;
    } else {
        divTanques.innerHTML = `<span>01/</span>10`;
        h2Tipo.innerText = "TINTO";
        statush2.innerText = "TANQUE-01";
        displayTempFermentacao.innerHTML = `<span>30</span>h`;
        displayTemperatura.innerHTML = `
                                <h3>
                                    <span class="minima_temperatura">27,5°<i class="fa-solid fa-arrow-down"></i></span>
                                    29,6°
                                    <span class="maxima_temperatura">30,2°<i class="fa-solid fa-arrow-up"></i></span>
                                </h3>
        `
        mostrarGraficoTemp('tanque1');
        mostrarGraficoCO2('tanque1');
        mostrarGraficoTempCO2('tanque1');
    }

}
// Chart Js

const remToPx = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

var chartTemp = document.getElementById('chart_temp').getContext('2d');
var currentChartTemp;

function criarGraficoTemp(data) {
    if (currentChartTemp) {
        currentChartTemp.destroy();
    }

    currentChartTemp = new Chart(chartTemp, {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: remToPx(1.1)
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function mostrarGraficoTemp(tanque) {
    var data;
    switch (tanque) {
        case 'tanque1':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-1', data: [27.5, 28.5, 30.2, 29.3, 28.7, 29.6], borderWidth: 2 },
                    { label: 'Limite Máximo', data: [32, 32, 32, 32, 32, 32], borderWidth: 1 },
                    { label: 'Limite Mínimo', data: [24, 24, 24, 24, 24, 24], borderWidth: 1 }
                ]
            };
            break;
        case 'tanque2':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-2', data: [26.2, 26.5, 27.2, 26.3, 28.7, 27.6], borderWidth: 2 },
                    { label: 'Limite Máximo', data: [32, 32, 32, 32, 32, 32], borderWidth: 1 },
                    { label: 'Limite Mínimo', data: [24, 24, 24, 24, 24, 24], borderWidth: 1 }
                ]
            };
            break;
        case 'tanque3':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-3', data: [28.5, 27.8, 27.2, 28.6, 28.7, 27.4], borderWidth: 2 },
                    { label: 'Limite Máximo', data: [32, 32, 32, 32, 32, 32], borderWidth: 1 },
                    { label: 'Limite Mínimo', data: [24, 24, 24, 24, 24, 24], borderWidth: 1 }
                ]
            };
            break;
        case 'tanque4':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-4', data: [25.9, 26.0, 25.4, 25.3, 26.7, 28.8], borderWidth: 2 },
                    { label: 'Limite Máximo', data: [32, 32, 32, 32, 32, 32], borderWidth: 1 },
                    { label: 'Limite Mínimo', data: [24, 24, 24, 24, 24, 24], borderWidth: 1 }
                ]
            };
            break;
        case 'tanque5':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-5', data: [19.3, 20.7, 21.4, 23.1, 18.9, 22.5], borderWidth: 2 },
                    { label: 'Limite Máximo', data: [25, 25, 25, 25, 25, 25], borderWidth: 1 },
                    { label: 'Limite Mínimo', data: [18, 18, 18, 18, 18, 18], borderWidth: 1 }
                ]
            };
            break;
        case 'tanque6':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-6', data: [24.0, 19.8, 20.5, 21.2, 22.7, 23.9], borderWidth: 2 },
                    { label: 'Limite Máximo', data: [25, 25, 25, 25, 25, 25], borderWidth: 1 },
                    { label: 'Limite Mínimo', data: [18, 18, 18, 18, 18, 18], borderWidth: 1 }
                ]
            };
            break;
    }
    criarGraficoTemp(data);
}

function mostrarGraficosTempTinto() {
    var data = {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [
            { label: 'Tanque-1', data: [27.5, 28.5, 30.2, 29.3, 28.7, 29.6], borderWidth: 2 },
            { label: 'Tanque-2', data: [26.2, 26.5, 27.2, 26.3, 28.7, 27.6], borderWidth: 2 },
            { label: 'Tanque-3', data: [28.5, 27.8, 27.2, 28.6, 28.7, 27.4], borderWidth: 2 },
            { label: 'Tanque-4', data: [25.9, 26.0, 25.4, 25.3, 26.7, 28.8], borderWidth: 2 },
            { label: 'Limite Máximo', data: [32, 32, 32, 32, 32, 32], borderWidth: 1 },
            { label: 'Limite Mínimo', data: [24, 24, 24, 24, 24, 24], borderWidth: 1 }
        ]
    }
    criarGraficoTemp(data);
}

function mostrarGraficosTempRose() {
    var data = {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [
            { label: 'Tanque-5', data: [19.3, 20.7, 21.4, 23.1, 18.9, 22.5], borderWidth: 2 },
            { label: 'Tanque-6', data: [24.0, 19.8, 20.5, 21.2, 22.7, 23.9], borderWidth: 2 },
            { label: 'Limite Máximo', data: [25, 25, 25, 25, 25, 25], borderWidth: 1 },
            { label: 'Limite Mínimo', data: [18, 18, 18, 18, 18, 18], borderWidth: 1 }
        ]
    }
    criarGraficoTemp(data);
}

mostrarGraficosTempTinto();


var chartCO2 = document.getElementById('chart_co2').getContext('2d');
var currentChartCO2;

function criarGraficoCO2(data) {
    if (currentChartCO2) {
        currentChartCO2.destroy();
    }

    currentChartCO2 = new Chart(chartCO2, {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: remToPx(1.1)
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function mostrarGraficoCO2(tanque) {
    var data;
    switch (tanque) {
        case 'tanque1':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-1', data: [70, 70, 69, 68, 66, 65], borderWidth: 2 }
                ]
            };
            break;
        case 'tanque2':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-2', data: [80, 82, 79, 79, 78, 78], borderWidth: 2 }
                ]
            };
            break;
        case 'tanque3':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-3', data: [90, 88, 90, 89, 91, 90], borderWidth: 2 }
                ]
            };
            break;
        case 'tanque4':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Tanque-4', data: [72, 71, 70, 69, 67, 66], borderWidth: 2 }
                ]
            };
            break;
    }
    criarGraficoCO2(data);
}

function mostrarGraficosCO2Tinto() {
    var data = {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [
            { label: 'Tanque-1', data: [70, 70, 69, 68, 66, 65], borderWidth: 2 },
            { label: 'Tanque-2', data: [80, 82, 79, 79, 78, 78], borderWidth: 2 },
            { label: 'Tanque-3', data: [90, 88, 90, 89, 91, 90], borderWidth: 2 },
            { label: 'Tanque-4', data: [72, 71, 70, 69, 67, 66], borderWidth: 2 }
        ]
    };
    criarGraficoCO2(data);
}

mostrarGraficosCO2Tinto();

var chartTempCO2 = document.getElementById('chart_temp_co2').getContext('2d');
var currentChartTempCO2;

function criarGraficoTempCO2(data) {
    if (currentChartTempCO2) {
        currentChartTempCO2.destroy();
    }

    currentChartTempCO2 = new Chart(chartTempCO2, {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: remToPx(1.1)
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function mostrarGraficoTempCO2(tanque) {
    var data;
    switch (tanque) {
        case 'tanque1':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Temp-1', data: [27.5, 28.5, 30.2, 29.3, 28.7, 29.6], borderWidth: 2 },
                    { label: 'CO2-1', data: [70, 70, 69, 68, 66, 65], borderWidth: 2 }
                ]
            };
            break;
        case 'tanque2':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Temp-2', data: [26.2, 26.5, 27.2, 26.3, 28.7, 27.6], borderWidth: 2 },
                    { label: 'CO2-2', data: [80, 82, 79, 79, 78, 78], borderWidth: 2 }
                ]
            };
            break;
        case 'tanque3':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Temp-3', data: [28.5, 27.8, 27.2, 28.6, 28.7, 27.4], borderWidth: 2 },
                    { label: 'CO2-3', data: [90, 88, 90, 89, 91, 90], borderWidth: 2 }
                ]
            };
            break;
        case 'tanque4':
            data = {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [
                    { label: 'Temp-4', data: [25.9, 26.0, 25.4, 25.3, 26.7, 28.8], borderWidth: 2 },
                    { label: 'CO2-4', data: [72, 71, 70, 69, 67, 66], borderWidth: 2 }
                ]
            };
            break;
    }
    criarGraficoTempCO2(data);
}

function mostrarGraficosTempCO2Tinto() {
    var data = {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [
            { label: 'Temp-1', data: [27.5, 28.5, 30.2, 29.3, 28.7, 29.6], borderWidth: 2 },
            { label: 'CO2-1', data: [70, 70, 69, 68, 66, 65], borderWidth: 2 },
            { label: 'Temp-2', data: [26.2, 26.5, 27.2, 26.3, 28.7, 27.6], borderWidth: 2 },
            { label: 'CO2-2', data: [80, 82, 79, 79, 78, 78], borderWidth: 2 },
            { label: 'Temp-3', data: [28.5, 27.8, 27.2, 28.6, 28.7, 27.4], borderWidth: 2 },
            { label: 'CO2-3', data: [90, 88, 90, 89, 91, 90], borderWidth: 2 },
            { label: 'Temp-4', data: [25.9, 26.0, 25.4, 25.3, 26.7, 28.8], borderWidth: 2 },
            { label: 'CO2-4', data: [72, 71, 70, 69, 67, 66], borderWidth: 2 }
        ]
    };
    criarGraficoTempCO2(data);
}

mostrarGraficosTempCO2Tinto()

const displayCO2tinto = document.getElementById('display_co2_tinto');

const data = {
    /* labels: ['CO2', 'Outros'], */
    datasets: [{
        data: [62, 38],
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

new Chart(displayCO2tinto, config);

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