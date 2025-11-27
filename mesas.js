// mesas.js
import { HashTable } from "./structs/hash-table.js";

// HashTable das mesas
const mesas = new HashTable(50);

// renderizar as mesas no grid (em cards)
window.render = function () {
  const grid = document.getElementById("gridMesas");
  grid.innerHTML = "";

  const todas = mesas.toObject();
  const nums = Object.keys(todas);

  if (nums.length === 0) {
    grid.innerHTML = `
      <div class="text-center text-muted col-12 py-4">
        Nenhuma mesa cadastrada.
      </div>`;
    return;
  }

  nums.forEach((num) => {
    const mesa = todas[num];

    const statusClass = mesa.status === "Livre" ? "bg-success" : "bg-danger";

    const col = document.createElement("div");
    col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

    col.innerHTML = `
      <div class="card text-white ${statusClass} cursor-pointer h-100 shadow-sm"
           title="Clique para alternar status">
      
        <div onclick="toggle('${num}')" 
             class="card-body d-flex flex-column align-items-center justify-content-center">

            <h3 class="m-0">${num}</h3>

            <small class="opacity-75 mt-1">${mesa.status}</small>

            <span class="badge bg-dark mt-2">
                ${mesa.pessoas} pessoa(s)
            </span>

        </div>

        <div class="card-footer bg-transparent border-0 d-flex justify-content-center">
           <button onclick="remover('${num}')" 
                   class="btn btn-sm btn-outline-light">
               Remover
           </button>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });
};

// adicionar mesa
window.adicionar = function () {
  const num = document.getElementById("numMesa").value.trim();
  const pessoasStr = document.getElementById("numPessoas").value.trim();
  const pessoas = pessoasStr ? parseInt(pessoasStr) : 0;

  if (!num) {
    alert("Digite o número da mesa.");
    return;
  }

  if (mesas.get(num) !== null && mesas.get(num) !== undefined) {
    alert("Essa mesa já existe!");
    return;
  }

  mesas.set(num, {
    status: "Livre",
    pessoas: pessoas,
  });

  document.getElementById("numMesa").value = "";
  document.getElementById("numPessoas").value = "";
  render();
};

// remover mesa com confirmação
window.remover = function (num) {
  if (!confirm(`Tem certeza que deseja remover a mesa ${num}?`)) return;

  const ok = mesas.remove(num);

  if (!ok) {
    alert("Erro ao remover. A mesa pode não existir.");
    return;
  }
  render();
};

// alternar status Livre <-> Ocupada
window.toggle = function (num) {
  const mesa = mesas.get(num);

  if (!mesa) {
    alert("Mesa não encontrada.");
    return;
  }

  mesa.status = mesa.status === "Livre" ? "Ocupada" : "Livre";

  mesas.set(num, mesa);
  render();
};

// render inicial
render();
