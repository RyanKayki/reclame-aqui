async function alterarDados(event) {
    event.preventDefault()

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/editar/' + email
    const formData = new FormData(document.getElementById('formulario'))

    formData.append('senha', senha)

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
            const titulo = document.createElement("td");
            const assunto = document.createElement("td");
            const dataHora = document.createElement("td"); // Adicionado campo para data e hora
            const status = document.createElement("td");
            const acao = document.createElement("td");
            const ajudar = document.createElement("td");
  
            id.textContent = item.id;
            setor.textContent = item.setor;
            titulo.textContent = item.titulo;
            assunto.textContent = item.assunto;
            dataHora.textContent = item.data_hora; // Exibindo data e hora diretamente
  
            if (item.ativo == true) {
                status.innerHTML = `<span class="status-not-responded">Não Respondido</span>`;
            } else {
                status.innerHTML = `<span>Respondido</span>`;
            }
  
            acao.innerHTML = `<button onclick='excluir(${item.id})'>Excluir</button>`;
            ajudar.innerHTML = `<button onclick='ajudar(id)'>Ajudar</button>`; 
  
            linha.appendChild(id);
            linha.appendChild(setor);
            linha.appendChild(titulo);
            linha.appendChild(assunto);
            linha.appendChild(dataHora); // Adicionando a coluna de data e hora
            linha.appendChild(status);
            linha.appendChild(acao);
            linha.appendChild(ajudar);
  
            dadosTabela.appendChild(linha);
        }
    }
}

listarReclamacoes();
