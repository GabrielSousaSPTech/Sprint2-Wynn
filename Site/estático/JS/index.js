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