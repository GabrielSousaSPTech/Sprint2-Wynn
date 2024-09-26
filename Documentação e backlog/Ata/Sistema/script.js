function mostrarData() {
    const data = input_data.value;
    mostrar_data.innerHTML = `<h2>${data.split('-').reverse().join('-')}</h2>`
}

var index1 = 1;

function adicionarTema() {
    const tema = input_tema.value;
    const texto = input_texto.value;

    temas.innerHTML += `<p id="tema_${index1}">
    <span> • <strong>${tema}</strong>: ${texto}</span>
    <button class="botao_apagar" onclick="apagarTema(${index1})">x</button>
</p>`

    index1++
}

function apagarTema(n) {
    console.log(n);
    const tema = document.getElementById(`tema_${n}`);
    tema.innerHTML = "";
}

var index2 = 1;

function adicionarTarefa() {
    const tarefa = input_tarefa.value;
    const dataTarefa = input_data_tarefa.value;
    const integrante = input_integrante.value;

    tarefas.innerHTML += `<p id="tarefa_${index2}" class="tarefa">
        <span>${tarefa} | ${dataTarefa.split('-').reverse().join('-')} | ${integrante} </span>
        <button class="botao_apagar" onclick="apagarLinha(${index2})">x</button>
    </p>`

    index2++
}

function apagarLinha(n) {
    console.log(n);
    const linha = document.getElementById(`tarefa_${n}`);
    linha.innerHTML = "";
}



function adicionarPO() {
    const PO = input_PO.value;
    mostrar_PO.innerHTML = `Project Onwer: <strong>${PO}</strong>`;
}

function adicionarScrumMaster() {
    const scrumMaster = input_scrum_master.value;
    mostrar_Scrum_Master.innerHTML = `Scrum Master: <strong>${scrumMaster}</strong>`;
}