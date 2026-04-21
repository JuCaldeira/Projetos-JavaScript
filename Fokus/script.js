const html = document.querySelector('html');
const buttonFoco = document.querySelector('.app__card-button--foco');
const buttonCurto = document.querySelector('.app__card-button--curto');
const buttonLongo = document.querySelector('.app__card-button--longo');
const imagemPrincipal = document.getElementsByClassName('app__image')[0];
const botoes = document.querySelectorAll(".app__card-button");
const botaoStartPause = document.querySelector('#start-pause');
const botaoStartPauseTexto = document.querySelector('#start-pause span');
const imagemPlayPause = document.querySelector('.app__card-primary-butto-icon');
const musicaFocoInput = document.querySelector('#alternar-musica');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

var titulo = document.querySelector('.app__title');

buttonFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 5;
    alterarConteudo('foco');
    buttonFoco.classList.add('active');
})

buttonCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 15;
    alterarConteudo('descanso-curto');
    buttonCurto.classList.add('active');
})

buttonLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 60;
    alterarConteudo('descanso-longo');
    buttonLongo.classList.add('active');
})

function alterarConteudo(parametro) {
    mostrarTempo();
    //Percorre todos os itens do array botões e remove a classe delas. Poderia usar tambem um loop for tradicional
    botoes.forEach(function (item, index, array) {
        item.classList.remove("active");
    })

    html.setAttribute('data-contexto', parametro);
    imagemPrincipal.setAttribute('src', `/imagens/${parametro}.png`);

    switch (parametro) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar a superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beep.play();
        //Estou criando um evento customizado quando o tempo zerar
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }

        zerar();
        tempoDecorridoEmSegundos = 5;
        return//pra sair da função
    }
    tempoDecorridoEmSegundos -= 1;
    console.log(`Temporizador: ${tempoDecorridoEmSegundos}`);
    mostrarTempo();
}

botaoStartPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play();
        zerar();
        return
    }
    audioPlay.play();
    //setInterval retorna um id quando a função está em execução
    intervaloId = setInterval(contagemRegressiva, 1000);
    botaoStartPauseTexto.textContent = "Pausar"
    imagemPlayPause.setAttribute('src', '/imagens/pause.png');
    //console.log(intervaloId);
}

function zerar() {
    clearInterval(intervaloId);
    botaoStartPauseTexto.textContent = "Começar"
    imagemPlayPause.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();