const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get('nome');
const cardName = document.getElementById('card-name');
cardName.textContent = nome; // Definindo o texto dentro do elemento h5
const email = urlParams.get('email');
const cardEmail = document.getElementById('card-email');
cardEmail.textContent = email;
cardEmail.style.display = 'none'


// Criando campos de formulário input hidden para armazenar os valores de 'nome' e 'email'
const inputNome = document.createElement('input');
inputNome.type = 'hidden';
inputNome.name = 'card-name'; // Defina o nome do campo do formulário
inputNome.value = nome; // Defina o valor do campo do formulário
cardName.parentNode.appendChild(inputNome); // Adicionando o campo de formulário como irmão de cardName

const inputEmail = document.createElement('input');
inputEmail.type = 'hidden';
inputEmail.name = 'card-email'; // Defina o nome do campo do formulário
inputEmail.value = email; // Defina o valor do campo do formulário
cardEmail.parentNode.appendChild(inputEmail); // Adicionando o campo de formulário como irmão de cardEmail
