import promptSync from "prompt-sync";
import { binarySearch } from "./search/binary-search.js";
import { linearSearch } from "./search/linear-search.js";
import { sentinelSearch } from "./search/sentinel-search.js";
import { bubbleSort } from "./sort/bubble-sort.js";
import { insertionSort } from "./sort/insertion-sort.js";
import { HashTable } from "./structs/hash-table.js";
import { Queue } from "./structs/queue.js";
import { Stack } from "./structs/stack.js";

const prompt = promptSync();

export function iniciarPedidos() {
  const enun = `
O que você quer fazer?
[1] Registrar Pedido
[2] Entregar pedido
[3] Mostrar clientes atendidos (a-z)
[4] Procurar cliente da fila pelo nome
[5] Ver último cliente atendido
[6] Mostrar relatório dos pedidos
[7] Voltar ao Menu Principal
`.trim();

  const pedidoFila = new Queue(); // Fila de Preparo
  const pedidosEntregues = new Stack(); // Histórico
  let totalEntregues = 0;

  while (true) {
    console.log(enun);
    const acao = prompt("Ação: ");

    if (acao === "1") {
      // fazer pedido
      const nome = prompt("Nome do cliente: ");
      const itens = prompt("Itens do Pedido: ");
      const pedido = {
        // cria o pedido com as infos do user e seta o status como "Em preparo"
        nome: nome,
        itens: itens,
        status: "Em preparo",
      };

      pedidoFila.enqueue(pedido); //adiciona o pedido na fila
      console.log(
        `O pedido do cliente ${nome} foi adicionado à fila de preparo (Status: ${pedido.status}).`
      ); // avisa que o pedido foi adicionado a fila de preparo
    } else if (acao === "2") {
      // fazer a entrega de um pedido
      if (pedidoFila.isEmpty()) {
        console.log("Não há pedidos para serem entregues.");
      } else {
        const pedido = pedidoFila.dequeue(); // retira o pedido da fila

        pedido.status = "Entregue"; // altera o status do pedido para entregue
        pedidosEntregues.push(pedido); // adiciona o pedido na pilha de pedidos entregues
        totalEntregues++; // aumenta o contador de pedidos entregues

        console.log(`O pedido do cliente ${pedido.nome} saiu para entrega.`); // avisa o user que o pedido saiu para a entrega
      }
    } else if (acao === "3") {
      const atendidos = pedidosEntregues.toArray(); // converte nossa pilha em um array
      if (atendidos.length === 0) {
        console.log("Nenhum cliente foi atendido ainda.");
      } else {
        //const listaFormatada = atendidos.map(p => ${p.nome} - ${p.status}); // transforma nosso array em um array de strings
        const sorted = insertionSort([...atendidos]); // ordena o array de strings em ordem alfabetica

        console.log("Clientes atendidos (em ordem alfabética):");
        sorted.forEach((item) => console.log(item)); // joga as linhas do array na tela
      }
    } else if (acao === "4") {
      const nome = prompt("Nome do cliente para buscar: ");
      const fila = pedidoFila.toArray();
      const pilha = pedidosEntregues.toArray();

      const apenasNomes = fila.map((p) => p.nome); // mapeamos apenas os nomes para poder usar o Binary Search e Bubble Sort originais
      const index = binarySearch(bubbleSort([...apenasNomes]), nome);

      if (index !== -1) {
        // Se encontrarmos, buscamos o status no objeto original para exibir
        const pedidoOriginal = fila.find((p) => p.nome === nome);
        console.log(
          `Cliente ${nome} está na fila de preparo. Status: ${pedidoOriginal.status}`
        );
      } else {
        const apenasNomes = pilha.map((p) => p.nome); // mapeamos apenas os nomes para poder usar o Binary Search e Bubble Sort originais
        const index = binarySearch(bubbleSort([...apenasNomes]), nome);
        if (index !== 1) {
          const pedidoOriginal = pilha.find((p) => p.nome === nome);
          console.log(
            `O pedido do cliente ${nome} ja foi entregue. Status: ${pedidoOriginal.status}`
          );
        } else {
          console.log(`O cliente ${nome} não tem nenhum pedido.`);
        }
      }
    } else if (acao === "5") {
      const ultimoPedido = pedidosEntregues.peek();
      if (ultimoPedido) {
        // Ajustado para acessar a propriedade .nome do objeto
        console.log(
          `O último pedido entregue foi do cliente: ${ultimoPedido.nome}`
        );
      } else {
        console.log("Nenhum pedido foi entregue.");
      }
    } else if (acao === "6") {
      // voltar
      console.log("\n=== Relatório de pedidos ===");
      console.log(`Total de pedidos entregues: ${totalEntregues}`);
      console.log("Clientes ainda na fila:");
      // A função print do Queue vai mostrar os objetos brutos {nome:..., status:...}
      // O que é útil para debug.
      console.log("\n");
      pedidoFila.print();
      console.log("\n");
    } else if (acao === "7") {
      console.log("\n=== Voltando ao menu ===");
      console.log("\n");
      break;
    } else {
      console.log("Ação inválida!");
    }
    console.log("");
  }
}
