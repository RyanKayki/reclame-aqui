async function redirecionarComNome() {
    try {
        // Extrair os parâmetros 'nome' e 'email' da URL
        const parametrosURL = new URLSearchParams(window.location.search);
        const nome = parametrosURL.get('nome');
        const email = parametrosURL.get('email');

        // Verificar se o nome foi encontrado na URL
        if (!nome) {
            throw new Error('Nome não encontrado na URL');
        }

        // Redirecionar para a próxima página com o nome e o email como parâmetros
        window.location.href = '../../usuario/solicitar.html?nome=' + encodeURIComponent(nome) + "&email=" + encodeURIComponent(email);
    } catch (error) {
        console.error("Erro ao redirecionar com o nome:", error.message);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get('nome');
const cardName = document.getElementById('card-name');
cardName.textContent += nome; // Definindo o texto dentro do elemento h5


async function listarReclamacoes() {
    const dadosContainer = document.getElementById("reclamacoes-container");
    const dadosmensagem = document.getElementById("mensagem-reclamacoes-vazias");
    const dadosanimation = document.getElementById("animation-vazias");
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/getallreclamacoes' // Corrigindo a construção da URL
    const response = await fetch(apiUrl);

    if (!response.ok) {
        alert('Reclamações não cadastradas!');
    } else {
        const data = await response.json();
        if (data.length === 0) {
            dadosanimation.style.display = 'block';
        } else {
            dadosmensagem.innerHTML = "As reclamação Registrada Estão Aqui!";
            dadosanimation.style.display = 'none';
        }

        // Limpa o conteúdo anterior do contêiner de reclamações
        dadosContainer.innerHTML = "";
        var contador = 0;

        var novaDiv = document.createElement("div");
        novaDiv.classList.add("dish-container");
        dadosContainer.appendChild(novaDiv);

        for (const item of data) {
            const divSolicitacao = document.createElement("div");
            divSolicitacao.classList.add("dish");

            const dataHora = `Dia: ${item.dia}/${item.mes}/${item.ano}`;
            const hora = `As: ${item.hora}:${item.minuto}`;

            divSolicitacao.innerHTML = `
                <h3 class="dish-title">${item.assunto}</h3>
                <span class="dish-description">${item.setor} - ${dataHora} - ${hora}</span>
                <p class="card-text">
                    <div class="form-floating mb-2">
                        <p class="form-control">${item.reclama}</p>
                    </div>
                </p>
                <div class="button-container">
                    <button style="width: 90px; background-color: red; color: white; padding: 5px; border-radius: 30px;" onclick='excluir(${item.id})'>Excluir</button>
                    <button style="width: 90px; background-color: black; color: white; padding: 5px; border-radius: 30px;" onclick='verMais(${item.id})'>Ver Mais</button>
                </div>
            `;

            novaDiv.appendChild(divSolicitacao);
            contador++;
            if (contador < 6) {
                dadosContainer.style.paddingLeft = '0px';
            }
            else {
                dadosContainer.style.paddingLeft = '90px';
            }
        }
    }
}

listarReclamacoes();



        async function editarreclamacao(reclama) {
            try {
                const reclama_reclamacao = reclama;
                const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/' + reclama_reclamacao;
                const response = await fetch(apiUrl);
    
                if (!response.ok) {
                    alert('Usuário não encontrado!');
                } else {
                    const data = await response.json();
                    const assunto = data.assunto;
                    const reclama = data.reclama;
                    const id = data.id;
    
                    document.getElementById("assunto").value = assunto;
                    document.getElementById("reclama").value = reclama;
                    document.getElementById("id").value = id;
                }
            } catch (error) {
                console.error("API com problemas!");
            }
        }
    
        async function alterarDados(event){
            event.preventDefault();
    
            const id = document.getElementById("id").value;
            const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/editar_reclamacao/' + id;
            const formData = new FormData(document.getElementById('formulario'));
            const response = await fetch(apiUrl, {
                method: 'PUT',
                body: formData
            });
    
            if (response.status == 201) {
                alert('Usuário alterado com sucesso!');
                window.location.href = "/adm/edicao.html";
                return true;
            } else {
                alert('Falha ao alterar! Fale com o suporte');
                return false;
            }
        }
    
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
        
        async function excluir(id){
            try {
                const confirmado = await confirmarExclusao(); // Espera pela confirmação
                if (confirmado) {
                    const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/deletar_reclamacao/' + id;
                    const response = await fetch(apiUrl,{method:'DELETE'});
            
                    if (response.status == 200) {
                        alert('Usuário deletado com sucesso!');
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
        
    
    
        async function verMais(id) {
    try {
        // Extrair o parâmetro 'nome' da URL
        // Redirecionar para a próxima página com o nome e o id como parâmetros
        window.location.href = `/reclame-aqui/adm/versolicitacao.html?id=${id}`;
    } catch (error) {
        console.error("Erro ao redirecionar com o nome:", error.message);
    }
}