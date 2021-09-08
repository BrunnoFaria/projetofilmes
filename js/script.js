
let nome = document.getElementById("nome_filme");
let url = document.getElementById("url_filme");
let sinopse = document.getElementById("sinopse_filme");

nome.addEventListener("blur", () => {
    validarInput(nome);
})
url.addEventListener("blur", () => {
    validarInput(url);
})
sinopse.addEventListener("blur", () => {
    validarInput(sinopse);

})

function validarInput(campo) {
    let erros = 0;
    let novoValor = campo.value.trim();
    campo.value = novoValor;
    if (campo.value == "") {
        campo.style.borderColor = "red";
        campo.nextElementSibling.innerHTML = "Por favor, preencha este campo.";
        erros++;
    } else {
        campo.style.borderColor = "green";
        campo.nextElementSibling.innerHTML = "";
    }

    if (erros > 0) {
        return false;
    } else {
        return true;
    }
}

function validarFormulario() {
    let arrayInputs = document.getElementsByName("entradaDados");

    for (let input of arrayInputs) {
        let result = validarInput(input);
        if (result == false) {
            return;
        }
    }
    modificarDivs()
    criarCard(nome.value, url.value, sinopse.value);
    limparFormulario();
}

function limparFormulario() {
    nome.value = "";
    url.value = "";
    sinopse.value = "";

    let arrayInputs = document.getElementsByName("entradaDados");

    for(let input of arrayInputs) {
        input.style.boderColor = "";
    }
}

function criarCard(nome, url, sinopse) {
    let card = `
          <img src="${url}" alt="">
            <div class="caixa-sinopse"> 
                <h3>${nome}</h3>                       
                <p>${sinopse}</p>
            </div>
           `;

    
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = card;

    document.getElementById("container-cards").appendChild(div);
    
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    validarFormulario();
});

function modificarDivs() {
    let container = document.getElementById("container-cards");
    let containerForm = document.getElementById("container-form");

         container.style.flex = "1";
        containerForm.style.maxWidth = "40%";
    container.style.overflowY = "scroll";
    
}

