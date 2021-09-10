let nome = document.getElementById("nome_filme");
let url = document.getElementById("url_filme");
let sinopse = document.getElementById("sinopse_filme");
var antigos = [];

/* Função pra ser chamada na criação dos cards quando o usuário cadastrar um novo filme */
function addAoJSON(nome,url,sinopse) {
    if (localStorage.length > 0) {
      // zerando o array para inserir os filmes que estão vindo do local storage
        antigos = [];
        let auxiliar = JSON.parse(localStorage.getItem('dadosLocais'));
        
        // Inserindo os filmes do local storage no array
        for (elemento of auxiliar) {
            antigos.push(elemento);
        }

        let novoFilme = { nome : nome, url: url, sinopse : sinopse };
        antigos.push(novoFilme);
        localStorage.setItem('dadosLocais', JSON.stringify(antigos));
    } else {
        let novoFilme = [{nome : nome, url: url, sinopse : sinopse}];
        localStorage.setItem('dadosLocais',JSON.stringify(novoFilme));
    }
    console.log(localStorage.getItem('dadosLocais'));
}
/* Função pra ser chamada quando o usuário recarregar ou voltar a página depois de já ter cadastrado pelo menos um filme. */
function pegaDoJSON() {
    let umNovoArq;
    umNovoArq = localStorage.getItem('dadosLocais');
    umNovoArq = JSON.parse(umNovoArq); // Converte o JSON novamente em Array de Objetos
    return umNovoArq;
}

nome.addEventListener("blur", () => {
    validarInput(nome);
})
url.addEventListener("blur", () => {
    validarInput(url);
})
sinopse.addEventListener("blur", () => {
    validarInput(sinopse);
})

//verifição dos inputs
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
    /* modificarDivs(); */
    addAoJSON(nome.value, url.value, sinopse.value); // Chama a função de salvar no local storage o JSON
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
    /* Modificações feitas pra usar JSON do Local Storage */
    /* Pega a DIV pai pra inserir os cards lá dentro */
    let divPai = document.querySelector('#container-cards');

    /* Cria a estrutura HTML pra preencher */
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    let img = document.createElement("img");
    img.setAttribute("src",url);
    img.setAttribute("alt",nome);
    let divCaixaSinopse = document.createElement("div");
    divCaixaSinopse.classList.add("caixa-sinopse");
    let h3 = document.createElement("h3");
    let h3Titulo = document.createTextNode(nome);
    h3.appendChild(h3Titulo);
    let p = document.createElement("p");
    let pTexto = document.createTextNode(sinopse);
    p.appendChild(pTexto);

    /* Preenche usando o appendChild */
    divCard.appendChild(img); // adiciona a imagem a div card
    divCaixaSinopse.appendChild(h3); // adiciona o título (nome) à caixa-sinopse
    divCaixaSinopse.appendChild(p); // adiciona a descrição (sinopse) à caixa-sinopse
    divCard.appendChild(divCaixaSinopse);

    divPai.appendChild(divCard); // adiciona a div criada dinamicamente à div pai (presente no HTML)
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    validarFormulario();
});

/* function modificarDivs() {
    let container = document.getElementById("container-cards");
    let containerForm = document.getElementById("container-form");

    container.style.flex = "1";
    containerForm.style.maxWidth = "40%";
    container.style.overflowY = "scroll";
} */
// estrutura localStorage
window.onload = function() {
    if (localStorage.length >= 1) {
        let prosCards = pegaDoJSON();
        /* modificarDivs(); */

        prosCards.forEach(elemento => {
            criarCard(elemento.nome,elemento.url,elemento.sinopse)
        });

    } else {
        console.log("Não tem nada salvo no seu navegador!")
    }
}

/* Adições do JS para mostrar o conteudo de sobre nós */
 let sobre = document.getElementById("sobre-nos");
 let sobreMenu = document.getElementById("sobre-menu");
 let span = document.getElementsByClassName("fechar")[0];

 sobreMenu.onclick = function () {
   sobre.style.display = "block";
 }

 span.onclick = function () {
     sobre.style.display = "none";
 }

 window.onclick = function(evento) {
     if (evento.target == sobre) {
         sobre.style.display = "none";
     }
 }