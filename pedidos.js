import { binarySearch } from "./search/binary-search.js";
import { bubbleSort } from "./sort/bubble-sort.js";
import { Queue } from "./structs/queue.js";
import { Stack } from "./structs/stack.js";

// inicia as estruturas
const fila = new Queue();
const pilha = new Stack();

// função de renderização do html
function render() {
  const ulFila = document.getElementById("filaList");
  const arrayFila = fila.toArray();

  ulFila.innerHTML = arrayFila
    .map((p, i) => `<li>${i + 1}º - ${p.nome}: ${p.itens}</li>`)
    .join("");

  const ulPilha = document.getElementById("pilhaList");
  const arrayPilha = pilha.toArray();

  // mostra o último entregue primeiro
  ulPilha.innerHTML = [...arrayPilha].map((p) => `<li>${p.nome}</li>`).join("");
}

// lancar pedido novo na fila
window.novoPedido = function () {
  const nome = document.getElementById("cliente").value;
  const itens = document.getElementById("itens").value;

  if (nome && itens) {
    const pedido = {
      nome: nome,
      itens: itens,
      status: "Em preparo",
    };

    fila.enqueue(pedido); // coloca o pedido na fila

    // limpa os inputs
    document.getElementById("cliente").value = "";
    document.getElementById("itens").value = "";

    render(); // renderiza a fila atualizada
  } else {
    alert("Preencha nome do cliente e itens do pedido.");
  }
};

// entregua o pedido (remove da fila e adiciona na pilha)
window.entregar = function () {
  if (!fila.isEmpty()) {
    const pedido = fila.dequeue();
    pedido.status = "Entregue"; // Atualiza status
    pilha.push(pedido); // adiciona o pedido na pilha
    render();
  } else {
    alert("Fila vazia! Ninguém para atender.");
  }
};

// buscar pedido pelo nome
window.procurarPedido = function () {
  const nomeBusca = document.getElementById("searchCliente").value.trim();
  const resultsEl = document.getElementById("searchResults");

  if (!nomeBusca) {
    resultsEl.innerHTML = "<div>Digite um nome para buscar.</div>";
    return;
  }

  // Prepara os dados para busca
  const arrayFila = fila.toArray();
  const arrayPilha = pilha.toArray();

  // procura na fila primeiro
  // mapeia apenas os nomes
  const nomesFila = arrayFila.map((p) => p.nome);
  // ordena (Bubble) e busca (Binary)
  const indexFila = binarySearch(bubbleSort([...nomesFila]), nomeBusca);

  if (indexFila !== -1) {
    // se achou busca o objeto para mostrar o status
    const pedidoOriginal = arrayFila.find((p) => p.nome === nomeBusca);
    resultsEl.innerHTML = `
        <div style="color: #ffeaa7; font-weight: bold; border: 1px solid yellow; padding: 10px; margin-top: 5px;">
            Cliente encontrado na FILA:<br>
            Nome: ${pedidoOriginal.nome}<br>
            Itens: ${pedidoOriginal.itens}<br>
            Status: ${pedidoOriginal.status}
        </div>`;
  } else {
    // se não achou na fila procura na pilha
    const nomesPilha = arrayPilha.map((p) => p.nome);
    // ordena (Bubble) e busca (Binary)
    const indexPilha = binarySearch(bubbleSort([...nomesPilha]), nomeBusca);

    if (indexPilha !== -1) {
      const pedidoOriginal = arrayPilha.find((p) => p.nome === nomeBusca);
      resultsEl.innerHTML = `
            <div style="color: #00cec9; font-weight: bold; border: 1px solid cyan; padding: 10px; margin-top: 5px;">
                Cliente encontrado no HISTÓRICO de entregas:<br>
                Nome: ${pedidoOriginal.nome}<br>
                Itens: ${pedidoOriginal.itens}<br>
                Status: ${pedidoOriginal.status}
            </div>`;
    } else {
      resultsEl.innerHTML = `<div style="color: #d63031; margin-top: 10px;">O cliente "${nomeBusca}" não tem nenhum pedido registrado.</div>`;
    }
  }
};
