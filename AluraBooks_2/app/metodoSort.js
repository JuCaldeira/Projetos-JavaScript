//const btnOrdenar = document.getElementById("btnOrdenarPorPreco")
const btnOrdenar = document.querySelector(".btn-ordenacao")


btnOrdenar.addEventListener("click", function () {
    //console.log(btnOrdenar.selectedIndex)
    const valorOption = btnOrdenar.options[btnOrdenar.selectedIndex].value

    if (valorOption == "maior-preco") {
        console.log(valorOption)
        const livrosComDesconto = aplicarDesconto(livros)
        let livrosOrdenados = livrosComDesconto.sort((a, b) => b.preco - a.preco)
        exibirLivros(livrosOrdenados)
    } else if (valorOption == "menor-preco") {
        console.log(valorOption)
        const livrosComDesconto = aplicarDesconto(livros)
        let livrosOrdenados = livrosComDesconto.sort((a, b) => a.preco - b.preco)
        exibirLivros(livrosOrdenados)
    }
})

function ordenar(botao) {//,metodo sort ordena os itens de um array, mas para funcionar corretamente, preciso passar uma função de comparação

    /*    const livrosComDesconto = aplicarDesconto(livros)
       let livrosOrdenados = livrosComDesconto.sort((a,b) => a.preco - b.preco)
       exibirLivros(livrosOrdenados) */
}