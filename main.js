import promptSync from "prompt-sync";
import { iniciarCardapio } from "./cardapio.js";
import { iniciarPedidos } from "./pedidos.js";

const prompt = promptSync();

const menuPrincipal = `
####################################
#   BEM VINDO AO RESTAURANTE STACK   #
####################################
Selecione um modulo para acessar:

1 - Cardápio
2 - Pedidos
0 - Sair do Sistema
`.trim();

function main() {
  while (true) {
    console.clear();
    console.log(menuPrincipal);
    const opcao = prompt(">>> Selecione uma opção: ");

    switch (opcao) {
      case "1":
        iniciarCardapio();
        break;
      case "2":
        iniciarPedidos();
        break;
      case "0":
        console.log("Encerrando sistema... Até logo!");
        process.exit(0);
        break;
      default:
        console.log("Opção inválida! Pressione ENTER para tentar novamente.");
        prompt();
        break;
    }
  }
}

main();
