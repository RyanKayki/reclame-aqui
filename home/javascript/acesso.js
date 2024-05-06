function mostrarPassword() {
    var passwordContainer = document.getElementById("password-container");
    if (passwordContainer.style.display === "none") {
      passwordContainer.style.display = "block";
    }
  }

  // Adiciona um listener de evento para o campo de entrada de email
document.getElementById("email").addEventListener("focus", function() {
  // Remove o atributo 'hidden' do botão 'Continue'
  document.getElementById("emailContinueButton").removeAttribute("hidden");
});

document.getElementById("senha").addEventListener("focus", function() {
  // Remove o atributo 'hidden' do botão 'Continue'
  document.getElementById("senhaContinueButton").removeAttribute("hidden");
});

// Adiciona um listener de evento para o botão 'Continue' do email
document.getElementById("emailContinueButton").addEventListener("click", function() {
  // Adiciona o atributo 'hidden' ao botão 'Continue' do email após ser clicado
  this.setAttribute("hidden", "hidden");
});

// Adiciona um listener de evento para o botão 'Continue' do campo de senha
document.getElementById("senhaContinueButton").addEventListener("click", function() {
  // Adiciona o atributo 'hidden' ao botão 'Continue' do campo de senha após ser clicado
  this.setAttribute("hidden", "hidden");
});



  