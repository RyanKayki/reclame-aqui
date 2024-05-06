  // listarUsuarios(): Esta função é responsável por fazer uma requisição à API para obter a lista de usuários cadastrados. Em seguida, ela popula uma tabela HTML com os dados retornados pela API, incluindo opções para editar, excluir e alterar o status de cada usuário.

  async function listarUsuarios() {
    const tabela = document.getElementById("dados_tabela")
    apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/getall'
    const response = await fetch(apiUrl)

    if (!response.ok) {
      alert('Usuários não cadastrados!')
    }
    else {
      const data = await response.json()
      for (const item of data) {
        
        const linha = document.createElement("tr") //cria uma nova linha
        const id = document.createElement("td") //cria uma nova coluna
        const email = document.createElement("td")
        const nome = document.createElement("td")
        const senha = document.createElement("td")
        const ativo = document.createElement("td")
        const editar = document.createElement("td")
    
        id.textContent = item.id
        email.textContent = item.email
        nome.textContent = item.nome
        senha.textContent = item.senha

        if (item.ativo == true) {
          ativo.innerHTML = `<button onclick='alterarStatus(${item.id})'>Ativo</button>`
        } else {
          ativo.innerHTML = `<button onclick='alterarStatus(${item.id})'>Desativado</button>`
        }

        editar.innerHTML = `<button onclick='editaUsuario("${item.email}")'>Editar</button>`


        linha.appendChild(id) //adiciona a coluna id como filha do elemento de linha
        linha.appendChild(email)
        linha.appendChild(nome)
        linha.appendChild(senha)
        linha.appendChild(ativo)
        linha.appendChild(editar)

        tabela.appendChild(linha) //adiciona a linha como filha do elemento dados_tabela
      }
    }
  }

  // alterarStatus(id): Essa função é chamada quando o status de um usuário é alterado. Ela envia uma solicitação à API para atualizar o status do usuário com o ID fornecido.

  async function alterarStatus(id) {
    const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/status_usuario/' + id
    const response = await fetch(apiUrl)
    if (response.status == 201) {
      console.log('Status alterado!')
    }
    location.reload() //atualiza a página atual no navegador
  }

  // enviarDados(event): Esta função é chamada quando os dados de um novo usuário são enviados por meio de um formulário. Ela envia os dados para a API através de uma solicitação POST para cadastrar o novo usuário.

  async function enviarDados(event) {
    event.preventDefault()//método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.

    const formData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML 
    const response = await fetch('https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/novo', {
      method: 'POST',
      body: formData
    })

    if (response.status == 201) {
      const resultado = document.getElementById('resultado');
      resultado.textContent = "Usuário cadastrado com sucesso!";
      setTimeout(function () {
        window.location.href = "/reclame-aqui/acesso.html"
        
      }, 2000)
      return true
    } else if (response.status == 409) {
      const resultado = document.getElementById('resultado');
      resultado.textContent = "Usuário já tem cadastro!";
      return false
    } else {
      alert('Falha ao cadastrar! Fale com o suporte')
      return false
    }
  }

  // validasenha(): Esta função é utilizada para validar o senha inserido em um campo de formulário. Ela verifica se o senha possui apenas números e se possui 11 caracteres.

  function validasenha() {
    const senha = document.getElementById('senha').value
    const confirmarSenha = document.getElementById("confirmar_senha").value;
    const resultado = document.getElementById('resultado');

    // Verifica se todos os caracteres são números
    regex = /^\d+$/ //expressão regular utilizada para verificar se uma string contém apenas dígitos numéricos. Leia mais: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    if (!regex.test(senha)) { //O método test() da expressão regular é usado para verificar se a string senha corresponde à expressão regular regex. Ele retorna true se houver uma correspondência e false se não houver correspondência.
      resultado.textContent = "Informe somente números";
      return false
    }

    // Verifica se a string possui 11 caracteres
    if (senha.length < 8) {
      resultado.textContent = "O senha precisa ter pelo menos 8 caracterez";
      return false
    }
    if (senha !== confirmarSenha) {
      resultado.textContent = "As senhas precisam ser iguais.";
  } else {
      resultado.textContent = "";
  }

    // Retorna true se o senha for válido
    return true
  }

  async function verificarUsuario() {
    try {
      const email_usuario = document.getElementById('email').value.trim();
      const resultado = document.getElementById('resultado');
      const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/' + email_usuario;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        const resultado1 = document.getElementById('resultado');
        resultado1.textContent = "Usuário não encontrado!";
      } else {
        const data = await response.json();
        const nome = data.nome;
        const email = data.email;
        const ativo = data.ativo;
        
        if (ativo) {
          document.body.style.backgroundColor = "green";
          // Exibição instantânea do resultado
          if (email.includes("@reclame.com")) {
            resultado.textContent = "Olá ADM " + nome + "! Bem Vindo!";
          } else {
            resultado.textContent = "Olá " + nome + "! Bem Vindo!";
          }
          // Redirecionamento com timeout
          setTimeout(function () {
            if (email.includes("@reclame.com")) {
              window.location.href = '/../reclame-aqui/adm/home/index.html?nome=' + encodeURIComponent(nome) + "&email=" + encodeURIComponent(email);
            } else {
              window.location.href = '/../reclame-aqui/usuario/home/index.html?nome=' + encodeURIComponent(nome) + "&email=" + encodeURIComponent(email);
            }
          }, 2000);
          const cardname = document.getElementById('card-name');
          cardname.textContent = nome
          document.getElementById("senha").value = senha
        } else {
          document.body.style.backgroundColor = "red";
          resultado.textContent = nome + " seu acesso está BLOQUEADO! Procure a administração.";
        }
      }
    } catch (error) {
      console.error("API com problemas!");
    }
  }  


  // editaUsuario(senha): Esta função é chamada quando o usuário seleciona a opção de editar um usuário. Ela redireciona o usuário para uma página de edição com o senha do usuário como parâmetro na URL.

  async function editaUsuario(email) {
    const urlEditar = `edicao.html?email=${email}`
    window.location.href = urlEditar
  }

  // editarUsuario(senha): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o senha fornecido.

  async function editarUsuario(id) {
    try {
      const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/' + id
      const response = await fetch(apiUrl)

      if (!response.ok) {
        alert('Usuário não encontrado!')
      }
      else {
        const data = await response.json()
        const nome = data.nome
        const senha = data.senha
        const id = data.id

        // Preenchendo os campos do formulário com os dados do usuário
        document.getElementById("email").value = id
        document.getElementById("nome").value = nome
        document.getElementById("senha").value = senha
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }

  // alterarDados(event): Esta função é chamada quando os dados de um usuário são alterados em um formulário de edição. Ela envia os dados atualizados para a API através de uma solicitação PUT para atualizar o usuário


  // excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.

  async function excluir(id){
    const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/' + id
    const response = await fetch(apiUrl,{method:'DELETE'})

    if (response.status == 200) {
      alert('Usuário deletado com sucesso!')
      window.location.href = "/adm/gestao.html"
      return true
    } else {
      alert('Falha ao excluir! Fale com o suporte')
      return false
    }
  }

  // reclamacao


  async function listarReclamacoes() {
    const dadosTabela = document.getElementById("reclame-body");
    const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/getallreclamacoes';
    const response = await fetch(apiUrl);
  
    if (!response.ok) {
        alert('Reclamação não cadastrada!');
    } else {
        const data = await response.json();
        for (const item of data) {
            const linha = document.createElement("tr"); //cria uma nova linha
            const id = document.createElement("td"); //cria uma nova coluna
            const setor = document.createElement("td");
            const assunto = document.createElement("td");
            const status = document.createElement("td");
            const acao = document.createElement("td");
            const ajudar = document.createElement("td");
  
            id.textContent = item.id;
            setor.textContent = item.setor;
            assunto.textContent = item.assunto;
  
            if (item.ativo == true) {
                status.innerHTML = `<span class="status-not-responded">Não Respondido</span>`;
            } else {
                status.innerHTML = `<span>Respondido</span>`;
            }

            // Adicionando "Não Respondido" na coluna correspondente
  
            acao.innerHTML = `<button onclick='excluir(${item.id})'>Excluir</button>`;
            ajudar.innerHTML = `<button onclick='verMais(${item.id})'>Ajudar</button>`; 
  
            linha.appendChild(id);
            linha.appendChild(setor);
            linha.appendChild(assunto);
            linha.appendChild(status);
            linha.appendChild(acao);
            linha.appendChild(ajudar);
            dadosTabela.appendChild(linha);
        }
    }
}


  
  
  listarReclamacoes();
  

  async function verMais(id) {
    try {
        // Extrair o parâmetro 'nome' da URL
        const parametrosURL = new URLSearchParams(window.location.search);

        // Redirecionar para a próxima página com o nome e o id como parâmetros
        window.location.href = `../adm/versolicitacao.html?id=${id}`;
    } catch (error) {
        console.error("Erro ao redirecionar com o nome:", error.message);
    }
}
  // alterarStatus(id): Essa função é chamada quando o status de um usuário é alterado. Ela envia uma solicitação à API para atualizar o status do usuário com o ID fornecido.
  
  
  // enviarDados(event): Esta função é chamada quando os dados de um novo usuário são enviados por meio de um formulário. Ela envia os dados para a API através de uma solicitação POST para cadastrar o novo usuário.
  
  async function enviarreclama(event) {
    event.preventDefault(); // Método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
    const formData = new FormData(document.getElementById('formulario')); // Cria um novo objeto FormData e preenche-o com os dados do formulário HTML 
    const response = await fetch('https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/nova_reclamacao', {
      method: 'POST',
      body: formData
    });
  
    if (response.status == 201) {
      alert('Reclamacao cadastrada com sucesso!');
      window.location.href = '../usuario/home/index.html?nome=' + encodeURIComponent(nome) + "&email=" + encodeURIComponent(email);
      return true;
    } else if (response.status == 409) {
      alert('Vocë ja tem essa reclamacao cadastrada!');
      return false;
    } else if (response.status == 400) {
      alert('Preencha o campo setor!');
      return false;
    } else {
      alert('Falha ao cadastrar reclamacao! Fale com o suporte');
      return false;
    }
  }
  
  // validareclama(): Esta função é utilizada para validar o reclama inserido em um campo de formulário. Ela verifica se o reclama possui apenas números e se possui 11 caracteres.
  
  
  // verificarreclamacao(): Essa função verifica se um usuário com o reclama fornecido está cadastrado no sistema. Ela faz uma solicitação à API para obter informações sobre o usuário e exibe uma mensagem dependendo do status do usuário (ativo ou bloqueado).
  
  
  // editareclamacao(reclama): Esta função é chamada quando o usuário seleciona a opção de editar um usuário. Ela redireciona o usuário para uma página de edição com o reclama do usuário como parâmetro na URL.
  
  async function editareclamacao(reclama) {
    const urlEditar = `edicao.html?reclama=${reclama}`
    window.location.href = urlEditar //permite redirecionar o navegador para o URL fornecido
  }
  
  // editarreclamacao(reclama): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o reclama fornecido.
  
  async function editarreclamacao(reclama) {
    try {
      const reclama_reclamacao = reclama
      const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/' + reclama_reclamacao
      const response = await fetch(apiUrl)
  
      if (!response.ok) {
        alert('Usuário não encontrado!')
      }
      else {
        const data = await response.json()
        const assunto = data.assunto
        const reclama = data.reclama
        const id = data.id
  
        document.getElementById("assunto").value = assunto
        document.getElementById("reclama").value = reclama
        document.getElementById("id").value = id
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }
  
  // alterarDados(event): Esta função é chamada quando os dados de um usuário são alterados em um formulário de edição. Ela envia os dados atualizados para a API através de uma solicitação PUT para atualizar o usuário.
  
  async function alterarDados(event){
    event.preventDefault() 
  
    const id = document.getElementById("id").value
    const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/editar_reclamacao/' + id
    const formData = new FormData(document.getElementById('formulario'))
    const response = await fetch(apiUrl, {
      method: 'PUT',
      body: formData
    })
  
    if (response.status == 201) {
      alert('Usuário alterado com sucesso!')
      window.location.href = "/adm/gestao.html"
      return true
    } else {
      alert('Falha ao alterar! Fale com o suporte')
      return false
    }
  }
  
  // excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.
  
  async function confirmarExclusao() {
    return new Promise((resolve, reject) => {
        const confirmacao = confirm("Tem certeza que deseja excluir?");
        if (confirmacao) {
            resolve(true); // Confirmação positiva
        } else {
            reject(false); // Confirmação negativa
        }
    });
}

async function excluir(id) {
    try {
        const confirmado = await confirmarExclusao(); // Espera pela confirmação
        if (confirmado) {
            const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/deletar_reclamacao/' + id;
            const response = await fetch(apiUrl, { method: 'DELETE' });

            if (response.status == 200) {
                alert('A reclamação do ID ' + id + ' foi excluida');
                location.reload(); // recarrega a página
                return true;
            } else {
                alert('Falha ao excluir! Fale com o suporte');
                return false;
            }
        } else {
            alert('Exclusão cancelada pelo usuário.');
            return false;
        }
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return false;
    }
}
