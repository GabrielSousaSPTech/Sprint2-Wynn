function continuarCadastro(){
    const nomeEmpresa = input_nome_empresa.value; 
    const cnpjEmpresa = input_cnpj_empresa.value;
    const emailEmpresa = input_email_empresa.value;
    const senhaEmpresa = input_senha_cadastro_empresa.value;
    const confirmarSenha = input_confirmar_senha_cadastro_empresa.value;
    var fraseDeSaida = ''
    var isEmail = false
    const camposPreenchidos = nomeEmpresa !='' && cnpjEmpresa !='' && emailEmpresa !='' && senhaEmpresa !='' && confirmarSenha !=''

    console.log(nomeEmpresa)
    console.log(cnpjEmpresa)
    console.log(emailEmpresa)
    console.log(senhaEmpresa)
    console.log(confirmarSenha)
    var cnpjsemPonto = cnpjEmpresa.replaceAll('.', '');
    var cnpjSemTraco = cnpjsemPonto.replaceAll('-', '');
    var cnpjFormatada = cnpjSemTraco.replaceAll('/', '');
    if(camposPreenchidos){
        if(cnpjFormatada.length == 14){
            for (var indiceEmail = 0; indiceEmail < emailEmpresa.length; indiceEmail++) {
                if (emailEmpresa[indiceEmail] == '@') {
                    isEmail = true
                    indiceEmail = emailEmpresa.length-1
                }
            }

            if(isEmail){
                if(senhaEmpresa == confirmarSenha){
                    containerCadastro.style.display = 'none'
                    containerEndereco.style.display = 'flex'
                }else{

                    fraseDeSaida = 'As  Senhas não coincidem'
                }
            }else {
                fraseDeSaida = 'Email inválido'
            }
        }else {
            fraseDeSaida = 'CNPJ Inválido'
        }
        

    }else {
        fraseDeSaida = 'Preencha os Campos'
    }
    erroDeCadastro.innerHTML = fraseDeSaida
}



function cadastrarEmpresa(){
    const nomeEmpresa = input_nome_empresa.value; 
    const cnpjEmpresa = input_cnpj_empresa.value;
    const emailEmpresa = input_email_empresa.value;
    const senhaEmpresa = input_senha_cadastro_empresa.value;
    const confirmarSenha = input_confirmar_senha_cadastro_empresa.value;
    const cep = input_cep.value;
    const logradouro = input_logradouro.value;
    const numLogradouro = input_num_logradouro.value;
    const complemento = input_complemento.value;
    const bairro = input_bairro.value;
    const cidade = input_cidade.value;
    const uf = input_uf.value; 
    var fraseDeSaida = ''
    var isEmail = false
    const camposPreenchidos = nomeEmpresa !='' && cnpjEmpresa !='' && emailEmpresa !='' && senhaEmpresa !='' && confirmarSenha !='' 
    && cep !='' && logradouro !='' && numLogradouro !='' && complemento !='' && bairro != '' && cidade != '' && uf != ''
    
    if(camposPreenchidos) {
        var cepFormatado = cep.replace('-', '');
        
        if(cepFormatado.length == 8){
            window.location.href = './login.html'
        }else {
            fraseDeSaida = 'Cep inválido'
        }
    }else {
        fraseDeSaida = 'Preencha os Campos'
    }
    
    
    
    erroDeCadastro.innerHTML = fraseDeSaida

}