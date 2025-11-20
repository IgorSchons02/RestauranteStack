import promptSync from "prompt-sync";
import { iniciarCardapio } from "./cardapio.js";
import { iniciarPedidos } from "./pedidos.js";
import { iniciarGerenciamentoMesas } from "./mesas.js";

const prompt = promptSync();

const menuPrincipal = `
####################################
#   BEM VINDO AO RESTAURANTE STACK   #
####################################
Selecione um modulo para acessar:

1 - Cardápio
2 - Pedidos
3 - Mesas
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
      case "3":
        iniciarGerenciamentoMesas();
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
