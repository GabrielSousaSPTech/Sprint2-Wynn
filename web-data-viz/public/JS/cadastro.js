function continuarCadastro() {
  const nomeEmpresa = input_nome_empresa.value;
  const cnpjEmpresa = input_cnpj_empresa.value;
  const emailEmpresa = input_email_empresa.value;
  const senhaEmpresa = input_senha_cadastro_empresa.value;
  const confirmarSenha = input_confirmar_senha_cadastro_empresa.value;
  var fraseDeSaida = ''
  var isEmail = false
  const camposPreenchidos = nomeEmpresa != '' && cnpjEmpresa != '' && emailEmpresa != '' && senhaEmpresa != '' && confirmarSenha != ''

  console.log(nomeEmpresa)
  console.log(cnpjEmpresa)
  console.log(emailEmpresa)
  console.log(senhaEmpresa)
  console.log(confirmarSenha)
  var cnpjsemPonto = cnpjEmpresa.replaceAll('.', '');
  var cnpjSemTraco = cnpjsemPonto.replaceAll('-', '');
  var cnpjFormatada = cnpjSemTraco.replaceAll('/', '');
  if (camposPreenchidos) {
    if (cnpjFormatada.length == 14) {
      for (var indiceEmail = 0; indiceEmail < emailEmpresa.length; indiceEmail++) {
        if (emailEmpresa[indiceEmail] == '@') {
          isEmail = true
          indiceEmail = emailEmpresa.length - 1
        }
      }

      if (isEmail) {
        if (senhaEmpresa == confirmarSenha) {
          containerCadastro.style.display = 'none'
          containerEndereco.style.display = 'flex'
        } else {

          fraseDeSaida = 'As  Senhas não coincidem'
        }
      } else {
        fraseDeSaida = 'Email inválido'
      }
    } else {
      fraseDeSaida = 'CNPJ Inválido'
    }


  } else {
    fraseDeSaida = 'Preencha os Campos'
  }
  erroDeCadastro.innerHTML = fraseDeSaida
}

function criarChaveAtivacao() {
  var chaveAtivacao = Math.random()
    .toString(36)
    .substr(-8)
    .toUpperCase();
  return chaveAtivacao
}

function cadastrarEmpresa() {
  const nomeEmpresa = input_nome_empresa.value;
  const cnpjEmpresa = input_cnpj_empresa.value;
  const emailEmpresa = input_email_empresa.value;
  const senhaEmpresa = input_senha_cadastro_empresa.value;
  const telefoneEmpresa = input_telefone_empresa.value;
  const confirmarSenha = input_confirmar_senha_cadastro_empresa.value;
  const cep = input_cep.value;
  const logradouro = input_logradouro.value;
  const numLogradouro = input_num_logradouro.value;
  const complemento = input_complemento.value;
  const bairro = input_bairro.value;
  const cidade = input_cidade.value;
  const uf = select_uf.value;
  const empresaAutorizada = false
  var fraseDeSaida = ''
  var isEmail = false

  const chaveAtivacao = criarChaveAtivacao()


  if (camposPreenchidos([nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa, confirmarSenha, cep, logradouro, numLogradouro, complemento, bairro, cidade, uf, empresaAutorizada, chaveAtivacao, telefoneEmpresa])) {
    var cepFormatado = cep.replace('-', '');

    if (cepFormatado.length == 8) {
      fetch("/empresas/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
          nomeEmpresaServer: nomeEmpresa,
          cnpjEmpresaServer: cnpjEmpresa,
          emailEmpresaServer: emailEmpresa,
          senhaEmpresaServer: senhaEmpresa,
          chaveAtivacaoServer: chaveAtivacao,
          telefoneEmpresaServer: telefoneEmpresa,
          cepEmpresaServer: cep,
          logradouroEmpresaServer: logradouro,
          bairroEmpresaServer: bairro,
          cidadeEmpresaServer: cidade,
          ufEmpresaServer: uf,
          numLogradouroEmpresaServer: numLogradouro,
          complementoEmpresaServer: complemento,
          autorizacaoEmpresaServer: empresaAutorizada
        }),
      })
    } else {
      fraseDeSaida = 'Cep inválido'
    }
  } else {
    fraseDeSaida = 'Preencha os Campos'
  }
  erroDeCadastro.innerHTML = fraseDeSaida
}

function camposPreenchidos(camposParaVerificar = []) {
  for (var posicaoCampo = 0; posicaoCampo < camposParaVerificar.length; posicaoCampo++) {
    if (
      camposParaVerificar[posicaoCampo] == ''
    ) {
      return false
    }
    return true
  }
}

function verificarEmail(email) {

}

var listaEmpresasCadastradas = []

function cadastrarFuncionario() {
  const nomeFuncionario = input_nome_funcionario.value;
  const chaveAtivacaoFuncionario = input_chave_ativacao_funcionario.value;
  const emailFuncionario = input_email_funcionario.value;
  const dataNascFuncionario = input_data_nascimento_funcionario.value;
  const telefoneFuncionario = input_telefone_funcionario.value;
  const senhaFuncionario = input_senha_cadastro_funcionario.value;
  const confirmarSenha = input_confirmar_senha_cadastro_funcionario.value;

  var fraseDeSaida = ''

  if (camposPreenchidos([nomeFuncionario, chaveAtivacaoFuncionario, emailFuncionario, senhaFuncionario, confirmarSenha, dataNascFuncionario, telefoneFuncionario])) {
    for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
      if (listaEmpresasCadastradas[i].chaveAtivacaoEmpresa == chaveAtivacaoFuncionario) {
        idEmpresaVincular = listaEmpresasCadastradas[i].idEmpresa
        console.log("Código de ativação válido.");
      } else {
        fraseDeSaida = "Chave de ativação inválido";
      }
    }

    if (nomeFuncionario.length < 1) {
      return alert("Preencha o campo Nome");

    } else if (emailFuncionario.indexOf('@') == -1) {
      return alert("E-mail inválido")

    } else if (emailFuncionario[posicaoArroba + 1] == undefined) {
      return alert("E-mail incompleto")

    } else if (emailFuncionario.indexOf('.com') == -1) {
      return alert("E-mail inválido")

    } else if (telefoneFuncionario.length < 11) {
      return alert("Telefone inválido")

    } else if (senhaFuncionario.length < 6) {
      return alert("Senha deve conter mínimo de 6 caracteres")

    } else if (senhaFuncionario != confirmarSenha) {
      return alert("Senha de confirmação difere da senha")
    }

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeFuncionario,
        emailServer: emailFuncionario,
        senhaServer: senhaFuncionario,
        telefoneServer: telefoneFuncionario,
        dataNascimentoServer: dataNascFuncionario,
        idEmpresaVincularServer: idEmpresaVincular
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          // limparFormulario();
          // finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        //   finalizarAguardar();
      });

    return false;


  } else {
    fraseDeSaida = 'Preencha os Campos'
  }
  erroDeCadastro.innerHTML = fraseDeSaida
}

function listar() {
  fetch("/empresas/listar", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((empresas) => {
        empresas.forEach((empresa) => {
          listaEmpresasCadastradas.push(empresa);

          console.log("listaEmpresasCadastradas")
          console.log(listaEmpresasCadastradas[0].codigo_ativacao)
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}