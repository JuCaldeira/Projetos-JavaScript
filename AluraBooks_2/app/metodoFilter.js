const botoes = document.querySelectorAll(".btn")

//quando aperto nos botões, tambem chamo a função exibirLivros()
botoes.forEach(botao => {
    botao.addEventListener("click", filtarLivros)
})

function filtarLivros() {
    //pego o id do botão que foi clicado e depois seu value
    const botaoClicado = document.getElementById(this.id)
    const categoria = botaoClicado.value

    //metodo filter passa por todos os itens do array e retorna um novo array com os itens que tenham sido true na minha condição
    //aqui o codigo faz um filter ou outro dependendo de uma condição
    let livrosFiltrados = categoria == "disponivel"
        ? livros.filter(livro => livro.quantidade > 0)
        : livros.filter(livro => livro.categoria == categoria)

    const livrosComDesconto = aplicarDesconto(livrosFiltrados)
    exibirLivros(livrosComDesconto)
    if (categoria == "disponivel") {
        const valorTotal = calcularValorTotal(livrosFiltrados)
        exibirValorTotal(valorTotal)
    }
}
function exibirValorTotal(valor) {
    valorTotal.innerHTML = `
    <div class="livros__disponiveis">
    <p>Todos os livros disponíveis por R$ <span id="valor">${valor}</span></p>
  </div>`
}

/* function filtarLivros(event) {
    const valorBotaoClicado = event.target.value;

    let livrosFiltrados = livros.filter(livro =>
        livro.categoria == valorBotaoClicado)

    console.table(livrosFiltrados)
} */