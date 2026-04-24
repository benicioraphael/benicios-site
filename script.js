console.log("Loja selecionada:", loja);
console.log("Produtos:", produtos);
const loja = localStorage.getItem("loja");

// 🔒 força escolher loja antes
if (!loja) {
  alert("Escolha uma loja primeiro");
  window.location.href = "index.html";
}

// 🏪 nomes das lojas
const nomesLojas = {
  centro: "Unidade Centro",
  ilha: "Unidade Ilha do Governador"
};

document.getElementById("tituloLoja").innerText = nomesLojas[loja];

// 📲 números WhatsApp
const numeros = {
  centro: "5521988185171",
  ilha: "5521994005250"
};

// 🛒 carrinho
let carrinho = [];

// 📦 filtrar produtos por loja
const produtosFiltrados = produtos.filter(p =>
  p.lojas.includes(loja)
);

// 🧩 agrupar por categoria
const categorias = {};

produtosFiltrados.forEach(p => {
  if (!categorias[p.categoria]) {
    categorias[p.categoria] = [];
  }
  categorias[p.categoria].push(p);
});

// 🎨 renderizar produtos
const container = document.getElementById("produtos");

for (let categoria in categorias) {
  const divCategoria = document.createElement("div");

  const titulo = document.createElement("h2");
  titulo.innerText = categoria;
  divCategoria.appendChild(titulo);

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

// ➕ adicionar ao carrinho
function adicionar(nome) {
  carrinho.push(nome);
  alert(nome + " adicionado!");
}

// 📲 finalizar pedido no WhatsApp
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
