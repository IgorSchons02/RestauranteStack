# Sistema de Gerenciamento de Restaurante (Restaurante Stack)

### Objetivo

Desenvolver uma aplicação com estruturas de dados para gerenciar o fluxo de trabalho um restaurante (cardápio e pedidos).
O sistema permite cadastrar pratos, colocar pedidos em fila de preparo, registrar entregas e gerar relatórios de atendimento.

### Estruturas de Dados Utilizadas

- **Tabela Hash (HashTable):** Implementada no módulo de **Cardápio**. Utilizada para armazenar os pratos e seus respectivos preços. Implementada no módulo de **Mesas**. Utilizada para armazenar as mesas e quantidade de pessoas alocadas.
- **Fila (Queue):** Implementada no módulo de **Pedidos**. Utilizada para gerenciar a **Fila de Preparo** da cozinha, garantindo que os pedidos sejam atendidos na ordem de chegada (lógica FIFO - _First In, First Out_).
- **Pilha (Stack):** Implementada no módulo de **Pedidos**. Utilizada para armazenar o **Histórico de Pedidos Entregues**, permitindo acesso imediato ao último pedido que saiu da cozinha (lógica LIFO - _Last In, First Out_).
- **Árvore Binária:** Implementada no módulo de **Cardápio**. Utilizada para ordenar os pratos por ordem de preço.

### Algoritmos Utilizados

- **Busca Binária (Binary Search):** Utilizada para localizar o status de um pedido (seja na fila ou já entregue) pesquisando pelo nome do cliente.
- **Bubble Sort:** Utilizado para ordenar a lista de nomes dos clientes antes de executar a Busca Binária (necessário para a busca binária).

---

### Como Executar

1.  Certifique-se de ter a extenão **Live Server (Five Server)** instalada.
2.  Clique com o botão direito no arquivo index.html
3.  clique em Abrir com Five Server
