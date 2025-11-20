import promptSync from "prompt-sync";

const prompt = promptSync();

export function iniciarGerenciamentoMesas() {
  const enun = `
GERENCIAMENTO DE MESAS
---------------------------------
[1] Cadastrar nova mesa
[2] Ocupar mesa
[3] Liberar mesa
[4] Listar mesas livres
[5] Listar mesas ocupadas
[6] Voltar ao menu principal
`.trim();

  const mesas = [];

  while (true) {
    console.log(enun);
    const acao = prompt("Ação: ");

    if (acao === "1") {
      const numero = prompt("Número da mesa: ");
      const capacidade = prompt("Capacidade (nº de pessoas): ");

      const existente = mesas.find((m) => m.numero === numero);

      if (existente) {
        console.log("Já existe uma mesa com esse número.");
      } else {
        mesas.push({
          numero,
          capacidade,
          status: "Livre",
        });

        console.log(`Mesa ${numero} cadastrada com sucesso!`);
      }

    } else if (acao === "2") {
      const numero = prompt("Número da mesa para ocupar: ");
      const mesa = mesas.find((m) => m.numero === numero);

      if (!mesa) {
        console.log("Mesa não encontrada.");
      } else if (mesa.status === "Ocupada") {
        console.log("A mesa já está ocupada.");
      } else {
        mesa.status = "Ocupada";
        console.log(`Mesa ${numero} agora está ocupada.`);
      }

    } else if (acao === "3") {
      const numero = prompt("Número da mesa para liberar: ");
      const mesa = mesas.find((m) => m.numero === numero);

      if (!mesa) {
        console.log("Mesa não encontrada.");
      } else if (mesa.status === "Livre") {
        console.log("A mesa já está livre.");
      } else {
        mesa.status = "Livre";
        console.log(`Mesa ${numero} foi liberada.`);
      }

    } else if (acao === "4") {
      const livres = mesas.filter((m) => m.status === "Livre");

      if (livres.length === 0) {
        console.log("Não há mesas livres.");
      } else {
        console.log("=== Mesas Livres ===");
        livres.forEach((m) =>
          console.log(`Mesa ${m.numero} – Capacidade: ${m.capacidade}`)
        );
      }

    } else if (acao === "5") {
      const ocupadas = mesas.filter((m) => m.status === "Ocupada");

      if (ocupadas.length === 0) {
        console.log("Não há mesas ocupadas.");
      } else {
        console.log("=== Mesas Ocupadas ===");
        ocupadas.forEach((m) =>
          console.log(`Mesa ${m.numero} – Capacidade: ${m.capacidade}`)
        );
      }

    } else if (acao === "6") {
      console.log("Voltando ao menu principal...");
      break;

    } else {
      console.log("Opção inválida!");
    }

    console.log("");
  }
}
