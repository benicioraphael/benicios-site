console.log(produtos);
const loja = localStorage.getItem("loja");

const nomesLojas = {
  centro: "Unidade Centro",
  ilha: "Unidade Ilha do Governador"
};

document.getElementById("tituloLoja").innerText = nomesLojas[loja];

// filtrar produtos por loja
const produtosFiltrados = produtos.filter(p =>
  p.lojas.includes(loja)
);

// agrupar categorias
const categorias = {};

produtosFiltrados.forEach(p => {
  if (!categorias[p.categoria]) {
    categorias[p.categoria] = [];
  }
  categorias[p.categoria].push(p);
});

// carrinho
let carrinho = [];

// renderizar produtos
const container = document.getElementById("produtos");

for (let categoria in categorias) {
  const divCategoria = document.createElement("div");
  divCategoria.innerHTML = <h2>${categoria}</h2>;

  categorias[categoria].forEach(prod => {
    const item = document.createElement("div");
    item.innerHTML = `
      <p>${prod.nome} - R$${prod.preco}</p>
      <button onclick="adicionar('${prod.nome}')">Adicionar</button>
    `;
    divCategoria.appendChild(item);
  });

  container.appendChild(divCategoria);
}

// adicionar ao carrinho
function adicionar(nome) {
  carrinho.push(nome);
  alert(nome + " adicionado!");
}

// números por loja
const numeros = {
  centro: "5521999999999",
  ilha: "5521988888888"
};

// finalizar pedido
function finalizar() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  let resumo = "Olá, quero pedir:\n";
  carrinho.forEach(item => {
    resumo += "- " + item + "\n";
  });

  const numero = numeros[loja];

  const url = https://wa.me/${numero}?text=${encodeURIComponent(resumo)};

  window.open(url, "_blank");
}
