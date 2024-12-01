function obterDados() {
    fetch(`/tanque/listar/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (res) {
                console.log('Tanques da empresa:')
                console.log(res)
                listarTanques(res)
            }).catch(function (err) {
                console.log(err)
            })
        }
    }).catch(function (erro) {
        console.log(erro)
    })
}

function listarTanques(dados) {
    tbody_lista.innerHTML = ''

    dados.forEach(tanque => {
        const id = tanque.id
        const tipo = tanque.tipo
        const status = tanque.atv

        const statusFormatado = status.charAt(0).toUpperCase() + status.slice(1)

        tbody_lista.innerHTML += `
            <tr>
                <th class="celula-numero">${id}</th>
                <td>${tipo}</td>
                <td class="celula-status ${status}"><span>${statusFormatado}</span></td>
                <td class="tabela-icone">
                    <button class="botao-tabela" onclick="exibirOcultarMenu('editar', ${id})">
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
    });
}