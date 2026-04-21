const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

//para pegar os itens salvos no Storage ou, se não tiver dados salvos, cria um array vazia
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
let tarefaSelecionada = null //referência ao objeto
let liTarefaSelecionada = null //referência a li

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function limparLocalStorage() {
    localStorage.removeItem("tarefas")
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
    textarea.focus()
})

btnCancelarTarefa.addEventListener("click", () => {
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    //o LocalStorage não consegue ler objetos. Preciso converter antes
    atualizarTarefas()
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

function criarElementoTarefa(tarefa) {
    //debugger
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.classList.add("app__section-task-list-item-description")
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.classList.add("app_button-edit")
    botao.onclick = () => {
        //debugger
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        if (novaDescricao) {//NULL ou String vazia é false
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    //ações para quando clicar em cada Li
    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute("disabled", "disabled")
    } else {
        li.onclick = () => {//removo as bordas das li toda vez que clico em qualquer li
            document.querySelectorAll('.app__section-task-list-item-active').forEach((elemento) => {//remove também da certo
                elemento.classList.remove('app__section-task-list-item-active')
            })

            //caso seleciono uma tarefa já selecionada, eu retiro ela
            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = ""
                tarefaSelecionada = null//Guardo uma referência ao objeto
                liTarefaSelecionada = null//Guardo uma referência a li, com suas tags
                return
            }
            //se não tiver tarefa selecionada, eu coloco uma
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescricaoTarefa.textContent = tarefa.descricao
            li.classList.add('app__section-task-list-item-active')
        }
    }
    return li
}

//quando abro a página ou regarrego ela
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

//O document como um todo fica escutando esta função. E ela é chamada quando acaba o tempo do cronômetro do Focus. Este evento foi gerado de forma manual
document.addEventListener("FocoFinalizado", () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')

        //crio uma nova propriedade ao objeto para indicar que a tarefa esta completa
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})

btnRemoverConcluidas.onclick = () => {
    document.querySelectorAll(".app__section-task-list-item-complete").forEach(elemento => {
        elemento.remove()
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa)
    atualizarTarefas()
}

btnRemoverTodas.onclick = () => {
    document.querySelectorAll(".app__section-task-list-item").forEach(elemento => {
        elemento.remove()
    })
    limparLocalStorage()
}