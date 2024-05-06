async function listarReclamacoes() {
    const dadosContainer = document.getElementById("reclamacoes-container");
    const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/getallreclamacoes';
    const response = await fetch(apiUrl);
 
    if (!response.ok) {
        alert('Reclamações não cadastradas!');
    } else {
        const data = await response.json();
        for (const item of data) {
            const divSolicitacao = document.createElement("div"); // Cria uma nova div para cada solicitação
            divSolicitacao.classList.add("boxpost"); // Adiciona a classe CSS para estilização
            
            // Ajuste para acessar o campo de data e hora corretamente
            const dataHora = `Dia: ${item.dia}/${item.mes}/${item.ano}`;
            const hora = `As: ${item.hora}:${item.minuto}`;
            // Cria o conteúdo HTML para cada solicitação
            divSolicitacao.innerHTML = `
                <h2>${item.assunto}</h2>
                <h1>Setor: ${item.setor}</h1>
                <span>${dataHora}</span>
                <p>${hora}</p>
                <p class="card-text">
                    <div class="form-floating mb-2">
                        <p class="form-control" style="height: 200px;">${item.reclama}</p>
                    </div>
                </p>
                <button class="btn btn-danger" style="width: 90px;" onclick='excluir(${item.id})'>Excluir</button>
                <button class="btn btn-dark" style="width: 90px;" onclick='verMais(${item.id})'>Ver Mais</button>

                
            `;
 
            dadosContainer.appendChild(divSolicitacao);
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

    async function excluir(id){
        const apiUrl = 'https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/deletar_reclamacao/' + id;
        const response = await fetch(apiUrl,{method:'DELETE'});

        if (response.status == 200) {
            alert('Usuário deletado com sucesso!');
            return true;
        } else {
            alert('Falha ao excluir! Fale com o suporte');
            return false;
        }
    }


    function verMais(id) {
    window.location.href = `/reclame-aqui/adm/versolicitacao.html?id=${id}`;
}
