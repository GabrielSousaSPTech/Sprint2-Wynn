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
            
            <div class = "containerTanque" onclick = "obterKPI(${item.idTanque})">
                <img class="iconeTanque"  src="../assets/icons/fermentacao (ok).png"/>
                Tanque ${item.idTanque}</div>
        `
    });
}

function obterKPI(idTanque, limite){
    display_temperatura.innerText = ''
                grafico_co2.innerText = ' '
    fetch(`/dashboard/obterKPI/${idTanque}/${limite}`).then(function(resposta){
        if(resposta.ok){
            resposta.json().then(function (res){
                console.log(res)      
                    display_temperatura.innerText = res.Temperatura
                    grafico_co2.innerText = res.co2        
            }).catch(function(){
                display_temperatura.innerText = '0'
                grafico_co2.innerText = '0'
            })
        }
    }).catch(function(erro){
        console.log('Erro ao exibir kpi '+ erro)
    })
}