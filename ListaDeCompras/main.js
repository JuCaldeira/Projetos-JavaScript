let listaDeItens = JSON.parse(localStorage.getItem("listaDeItens")) || []
let itemAEditar

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItnes = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")

function atualizaLocalStorage() {
    //stringify transforma em texto
    localStorage.setItem("listaDeItens", JSON.stringify(listaDeItens))
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItem()
    itensInput.focus()
})

function salvarItem() {
    const comprasItem = itensInput.value
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toLowerCase() === comprasItem.toLowerCase())

    if (!checarDuplicado) {
        listaDeItens.push({
            valor: comprasItem,
            checar: false
        })
    }
    else {
        alert("Item já adicionado")
    }
    console.log(listaDeItens);
    itensInput.value = ""
}
//Toda vez que adiciono um novo item, os eventos de clique checkbox, botão de deletar e botão de editar são configurados novamente para incluir o novo item. Isso é necessário porque os novos elementos do DOM que foram adicionados não teriam os eventListener configurados para eles.
function mostrarItem() {
    ulItnes.innerHTML = ""
    ulItensComprados.innerHTML = ""

    listaDeItens.forEach((elemento, index) => {
        //se os itens estiverem com o checkbox clicado, aparecerão na 2º lista
        if (elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>
            `
        } else {//se não aparecerão na 1º lista
            ulItnes.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? "disabled" : ""}></input>
        </div>  
        <div>
            ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()">          <i class="fa-regular fa-floppy-disk is-clickable"></i>                        </button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li> `
        }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach(item => {
        item.addEventListener('click', (evento) => {
            //para pegar o id do item selecionado no checkbox(pai do pai)
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value")
            //método próprio do input checkbox. Quando clico fica true
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        })
    })

    const deletarObjetos = document.querySelectorAll(".deletar")
    deletarObjetos.forEach(item => {
        item.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value")
            listaDeItens.splice(valorDoElemento, 1)//elemento para deletar, e quantidade
            mostrarItem()
        })
    })

    //esta função apenas pega o valor do data-value do item selecionado para editar e coloca em uma variável
    const editarItens = document.querySelectorAll(".editar")
    editarItens.forEach(item => {
        item.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute("data-value")
            mostrarItem()
            const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
            itemEditado.focus()
        })
    })

    atualizaLocalStorage()
}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    listaDeItens[itemAEditar].valor = itemEditado.value
    console.log(listaDeItens)
    itemAEditar = -1//para garantir que não estou com nenhum index armazenado
    mostrarItem()
}

mostrarItem()