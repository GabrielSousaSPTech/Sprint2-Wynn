

function obterKPI(idTanque, limite) {

    fetch(`/dashboard/obterMinMaxTemperatura/${idTanque}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                console.log(res)
                document.getElementById('display_temperaturaMin').innerHTML = `<i class="fa-solid fa-arrow-down"></i> ${Number(res[0].minima)}°`
                document.getElementById('display_temperaturaMax').innerHTML = `<i class="fa-solid fa-arrow-up"></i> ${Number(res[0].maxima)}°`

            })
        }
    })

    fetch(`/dashboard/obterKPI/${idTanque}/${limite}`).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (res) {
                console.log(res)
                document.getElementById('display_temperatura').innerText = `${Number(res.Temperatura)}°`
                grafico_co2.innerText = `${Number(res.co2)}%`
            }).catch(function () {
                display_temperatura.innerText = '0'
                grafico_co2.innerText = '0'
            })
        }
    }).catch(function (erro) {
        console.log('Erro ao exibir kpi ' + erro)
    })
}