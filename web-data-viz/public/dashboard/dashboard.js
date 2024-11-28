function obterTanque(idEmpresa){
    fetch(`/dashboard/obterTanque/${idEmpresa}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok){
            resposta.json().then(function (res){
                plotarTanque(res)
            })
        }
    })
}

function plotarTanque(resposta){
    const containerTanque = document.getElementById('btnTanque')

    resposta.forEach(function (item) {
        containerTanque.innerHTML += `
            <span>Tanque ${item.idTanque}</span><br>
        `
    });
}