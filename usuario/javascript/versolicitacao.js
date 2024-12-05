async function mostrarReclamacaoPorId(id) {
    try {
        const apiUrl = `https://88b7c53b-f8c2-4a85-8211-2fd5dc7fc089-00-wqhmyve1zz6r.picard.replit.dev/getreclama?id=${id}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Reclamação não encontrada!');
        } else {
            const data = await response.json();
            const dataFormatada = `${data.dia}/${data.mes}/${data.ano}`;
            const horaFormatada = `As: ${data.hora}:${data.minuto}`;

            document.getElementById("reclame-assunto").textContent = data.assunto;
            document.getElementById("reclame-reclama").textContent = data.reclama;
            document.getElementById("resposta-empresa").textContent = data.resposta_reclamacao;
            document.getElementById("reclame-data").innerHTML += `${dataFormatada}`;
            document.getElementById("reclame-hora").innerHTML += `${horaFormatada}`;
            document.getElementById("reclame-setor").innerHTML += `${data.setor}`;
            document.getElementById("card-name").innerHTML += `${data.nome}`;

            const statusElement = document.getElementById("reclame-status");

            if (data.ativo) {
                statusElement.innerHTML = `<p class="border border-danger text-white bg-danger rounded-2 text-center m-0 flex-grow-1"
                style="height: 80%;">😕 Não respondida</p>`;
            } else {
                statusElement.innerHTML = `<p class="border border-success text-white bg-success rounded-2 text-center m-0 flex-grow-1"
                style="height: 80%;">😁 Respondida</p>`;
            }
            if (data.resposta_reclamacao) {
                document.getElementById("resposta-empresa").textContent = data.resposta_reclamacao;
            } else {
                document.getElementById("resposta-empresa").textContent = "Sem resposta ainda.";
            }            
        }
    } catch (error) {
        console.error("Erro ao buscar reclamação:", error.message);
        alert('Erro ao buscar reclamação: ' + error.message);
    }
}

// Função para obter o ID da reclamação da URL
function getReclamacaoIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função principal para carregar os detalhes da reclamação quando a página é carregada
async function carregarDetalhesReclamacao() {
    const reclamacaoId = getReclamacaoIdFromURL();
    if (reclamacaoId) {
        await mostrarReclamacaoPorId(reclamacaoId);
    } else {
        alert('ID da reclamação não encontrado na URL!');
    }
}

carregarDetalhesReclamacao();

