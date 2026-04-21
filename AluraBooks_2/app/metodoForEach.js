const inserirLivros = document.getElementById("livros")
const valorTotal = document.getElementById("valor_total_livros_disponiveis")

//metodo forEach percorre todos os elementos de um array e me devolve 3 campos que posso usar: 1º o item, 2º o index, e 3º o próprio array. Para usá-los, preciso nomeá-los.
function exibirLivros(listaDeLivros) {
  //quando chamo esta função, primeiro limpo a tela e dai exibo os campos
  valorTotal.innerHTML = ""
  inserirLivros.innerHTML = ""
  listaDeLivros.forEach(livro => {
    let disponibilidade = livro.quantidade > 0 ? "livros__imagens" : "livros__imagens indisponivel"
    inserirLivros.innerHTML += `
    <div class="livro">
      <img class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
      <h2 class="livro__titulo">
        ${livro.titulo}
      </h2>
      <p class="livro__descricao">${livro.autor}</p>
      <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${livro.categoria}</span>
      </div>
    </div>
        `
  });
}