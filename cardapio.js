import promptSync from "prompt-sync";
import { HashTable } from "./structs/hash-table.js";
import { criarBST, inserirBST, listarBST } from "./structs/bst-cardapio.js";

const prompt = promptSync();
const cardapio = new HashTable(50);

// cardapio inicial
cardapio.set("xis", 25.0);
cardapio.set("batata frita", 12.5);
cardapio.set("refrigerante", 6.0);

export function iniciarCardapio() {
  const enun = `
    === CARDÁPIO ===
    [1] Adicionar Prato
    [2] Remover Prato
    [3] Ver Cardápio Completo
    [4] Pesquisar Prato
    [5] Ver Cardápio Ordenado por Preço (BST)
    [6] Voltar ao Menu Principal
    `.trim();

  console.clear();

  while (true) {
    console.log("\n" + enun);
    const acao = prompt("Ação: ");

    if (acao === "1") {
      const nome = prompt("Nome: ");
      const preco = parseFloat(prompt("Preço: ").replace(",", ".")); // salva o preco como decimal
      if (!isNaN(preco)) {
        cardapio.set(nome, preco); // adiciona o prato ao cardápio (tabela hash)
        console.log("Prato salvo!");
      } else {
        console.log("Preço inválido.");
      }

    } else if (acao === "2") {
      const nome = prompt("Nome do Prato para remover: ");
      const removeu = cardapio.remove(nome);

      if (removeu) {
        console.log(`"${nome}" foi removido do cardápio!`);
      } else {
        console.log(`Erro: O prato "${nome}" não existe.`);
      }

    } else if (acao === "3") {
      console.log("\n--- CARDÁPIO ATUAL ---");
      const todosPratos = cardapio.toObject();
      const chaves = Object.keys(todosPratos); // pega todas as chaves (nomes dos pratos)

      if (chaves.length === 0) {
        console.log("O cardápio está vazio.");
      } else {
        for (const prato of chaves) {
          // percorre os nomes dos pratos
          console.log(
            `- ${prato.padEnd(20, ".")} R$ ${todosPratos[prato].toFixed(2)}`
          );
        }
      }

    } else if (acao === "4") {
      const nome = prompt("Nome do Prato para buscar: ").trim();
      let prato = cardapio.get(nome); // tenta buscar diretamente pela chave (nome do prato)
      if (prato === null) {
        console.log(`Prato "${nome}" não encontrado no cardápio.`);
      } else {
        console.log(`Prato encontrado: "${nome}" — R$ ${prato.toFixed(2)}`);
      }

    } else if (acao === "5") {
      console.log("\n--- CARDÁPIO ORDENADO POR PREÇO (BST) ---");

      const todos = cardapio.toObject();
      const nomes = Object.keys(todos);

      if (nomes.length === 0) {
        console.log("O cardápio está vazio.");
      } else {
        const arvore = criarBST();

        // insere todos os pratos na árvore
        for (const nome of nomes) {
          inserirBST(arvore, nome, todos[nome]);
        }
        const ordenados = listarBST(arvore);
        for (const item of ordenados) {
          console.log(
            `- ${item.nome.padEnd(20, ".")} R$ ${item.preco.toFixed(2)}`
          );
        }
      }

    } else if (acao === "6") {
      break;

    } else {
      console.log("Opção inválida!");
    }
  }
}
