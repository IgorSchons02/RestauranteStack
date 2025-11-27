export function criarBST() {
  return { root: null };
}

function criarNo(nome, preco) {
  return {
    nome,
    preco,
    left: null,
    right: null
  };
}

export function inserirBST(arvore, nome, preco) {
  const novo = criarNo(nome, preco);

  if (!arvore.root) {
    arvore.root = novo;
    return;
  }

  let atual = arvore.root;

  while (true) {
    if (preco < atual.preco) {
      if (!atual.left) {
        atual.left = novo;
        return;
      }
      atual = atual.left;
    } else {
      if (!atual.right) {
        atual.right = novo;
        return;
      }
      atual = atual.right;
    }
  }
}

function emOrdem(no, lista) {
  if (!no) return;

  emOrdem(no.left, lista);
  lista.push({ nome: no.nome, preco: no.preco });
  emOrdem(no.right, lista);
}

export function listarBST(arvore) {
  const lista = [];
  emOrdem(arvore.root, lista);
  return lista;
}