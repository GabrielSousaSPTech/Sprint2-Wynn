function obterComecoFermentacao(idTanque) {

    fetch(`/dashboard/obterComecoFermentacao/${idTanque}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                if (res.length > 0) {

                    medirTempoFermentacao(res[0].dataHoraSensor)
                } else {
                    document.getElementById('tempo-fermentacao').innerText = 'Tanque Inativo'
                }
            })
        }
    })

}

function medirTempoFermentacao(dataComecoFermentacao) {
    const date = new Date(dataComecoFermentacao)
    const dataAtual = new Date();
    const tempoDecorridoMs = dataAtual - date;
    const segundos = Math.floor(tempoDecorridoMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);


    const restoMinutos = minutos % 60;
    const restoSegundos = segundos % 60;
    const restoHoras = horas % 24;

    function formatarTempo(horas, minutos, segundos) {
        const horasFormatadas = horas.toString().padStart(2, '0');
        const minutosFormatados = minutos.toString().padStart(2, '0');
        const segundosFormatados = segundos.toString().padStart(2, '0');
        return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
    }


    /*  document.getElementById('tempo-fermentacao').innerText = `${dias > 0 ? dias + " Dias" : ''}  ${restoHoras}:${restoMinutos}:${restoSegundos}S`; */
    document.getElementById('tempo-fermentacao').innerText = formatarTempo(horas, restoMinutos, restoSegundos);
}

var temporizador
function exibirTemporizador(idTanque) {

    if (temporizador != undefined) {
        clearInterval(temporizador)
    }
    temporizador = setInterval(() => {
        obterComecoFermentacao(idTanque)
        obterKPI(idTanque, 1);

    }, 1000)

}

