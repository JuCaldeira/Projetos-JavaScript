//o map passa por cada elemento do array, executa uma função, e devolve um novo array como resultado, sem alterar o array original
function aplicarDesconto(livros) {
    const desconto = 0.3
    livrosComDesconto = livros.map(livro => {
        //com os ... faço uma cópia exata do objeto, mas altero apenas o parametro preco
        return { ...livro, preco: livro.preco - (livro.preco * desconto) }
    })

    return livrosComDesconto
}