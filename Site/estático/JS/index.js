function simularPerda() {
    containerFormulario.style = "display:none;"
    containerFormularioResposta.style = "display: flex"
    var p = Number(producao.value)
    var d = Number(desperdicio.value)
    var pr = Number(preco.value)

    var rendimentoAnual = p / 0.75 * pr
    var desperdicioAnual = d / 0.75 * pr
    var diferencaRendimento = rendimentoAnual - desperdicioAnual
    var prejuizo = rendimentoAnual - diferencaRendimento

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

function simulacaoNovamente() {
    containerFormulario.style = "display:flex;"
    containerFormularioResposta.style = "display: none"

    producao.value = ""
    desperdicio.value = ""
    preco.value = ""
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

new Chart(ctx4, {
    type: 'doughnut',
    data: {
        labels: ['CO2', 'outros',],
        datasets: [{
            label: 'CO2',
            data: [72, 28],
            borderWidth: 1,
            cutout: '70%',
            circumference: 180,
            rotation: 270
        }]
    },
    options: {
        aspectRatio: 2
    }

});

