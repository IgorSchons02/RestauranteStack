import { HashTable } from "./structs/hash-table.js";
import { criarBST, inserirBST, listarBST } from "./structs/bst-cardapio.js";

// cria a hash table do cardapio
const cardapio = new HashTable(50);

// Dados iniciais para teste
cardapio.set("batata frita", 12.5);
cardapio.set("refrigerante", 6.0);

// renderiza o cardapio
window.render = function (listaOrdenada = null) {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";

  const resultDiv = document.getElementById("searchResult");

  if (listaOrdenada === null && resultDiv) resultDiv.innerHTML = "";

  let itensParaMostrar = [];

  if (listaOrdenada) {
    // ordena BST
    itensParaMostrar = listaOrdenada; // manda a lista ordenada para mostrar
    ul.innerHTML += `
      <li class="list-group-item bg-success bg-opacity-25 text-white text-center fw-bold border-success">
         Ordenado por Preço (Menor para Maior)
      </li>`;
  } else {
    // senao foi ordenada mostra a lista normal
    const todos = cardapio.toObject();
    itensParaMostrar = Object.keys(todos).map((key) => ({
      nome: key,
      preco: todos[key],
    }));
  }

  // gera o html da lista
  if (itensParaMostrar.length === 0) {
    ul.innerHTML = `
        <li class="list-group-item bg-transparent text-center text-muted py-4">
           O cardápio está vazio.
        </li>`;
  } else {
    itensParaMostrar.forEach((item) => {
      // botao de remover só aparece na lista padrão (nao bst ordenada)
      const botaoRemover = !listaOrdenada
        ? `<button onclick="remover('${item.nome}')" class="btn btn-sm btn-outline-danger border-0" title="Remover item">
                 ✖
               </button>`
        : "";

      ul.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-secondary text-white py-3">
              
              <div class="d-flex align-items-center">
                  <span class="fw-bold fs-5 me-3 text-capitalize text-info">${
                    item.nome
                  }</span>
                  
                  <span class="badge rounded-pill bg-success bg-opacity-75">
                    R$ ${item.preco.toFixed(2)}
                  </span>
              </div>

              <div>
                  ${botaoRemover}
              </div>
          </li>`;
    });
  }
};

// adicionar prato
window.adicionar = function () {
  const nomePrato = document.getElementById("nomePrato");
  const precoPrato = document.getElementById("precoPrato");

  const nome = nomePrato.value.trim().toLowerCase(); // deixa o nomePrato em minusculo
  const precoStr = precoPrato.value.replace(",", ".");
  const preco = parseFloat(precoStr);

  if (nome && !isNaN(preco)) {
    cardapio.set(nome, preco);

    nomePrato.value = "";
    precoPrato.value = "";

    render();
  } else {
    alert("Por favor, preencha um nome válido e um preço numérico.");
  }
};

// remover prato
window.remover = function (nome) {
  const removeu = cardapio.remove(nome);
  if (removeu) {
    render();
  } else {
    alert("Erro ao remover. O item pode não existir mais.");
  }
};

// pesquisa o prato pelo nome
window.pesquisar = function () {
  const nomePrato = document.getElementById("searchPrato");
  const nome = nomePrato.value.trim().toLowerCase();
  const divResult = document.getElementById("searchResult");

  if (!nome) {
    divResult.innerHTML = "";
    return;
  }

  // busca na hash table
  const preco = cardapio.get(nome);

  if (preco !== null && preco !== undefined) {
    divResult.innerHTML = `
        <div class="alert alert-success d-flex align-items-center" role="alert">    
        <div>
                <strong>Prato Encontrado:</strong><br>
                <span class="text-capitalize">${nome}</span> — <span class="badge bg-success">R$ ${preco.toFixed(
      2
    )}</span>
            </div>
        </div>`;
  } else {
    divResult.innerHTML = `
        <div class="alert alert-danger d-flex align-items-center" role="alert">
            <div>
                <strong>Não encontrado:</strong><br>
                O prato "${nome}" não está no cardápio.
            </div>
        </div>`;
  }
};

// ordenar o cardapio usando BST
window.ordenarBST = function () {
  const todos = cardapio.toObject();
  const nomes = Object.keys(todos);

  if (nomes.length === 0) {
    alert("O cardápio está vazio, nada para ordenar.");
    return;
  }

  // cria a árvore
  const arvore = criarBST();

  // popula a arvore com os dados atuais da Hash Table
  for (const nome of nomes) {
    inserirBST(arvore, nome, todos[nome]);
  }

  // gera a lista ordenada
  const listaOrdenada = listarBST(arvore);

  // renderiza passando a lista ordenada
  render(listaOrdenada);
};

// Renderiza a lista inicial ao carregar a página
render();
