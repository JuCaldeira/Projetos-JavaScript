function tocarSom(seletorAudio) {
    const elemento = document.querySelector(seletorAudio);
    if (elemento != null && elemento.localName === 'audio') {
        elemento.play();
    } else {
        console.log('Elemento não encontrado ou seletor inválido');
    }
}

const buttons = document.querySelectorAll('.tecla');
//let contador = 0;

/* Para criar as 9 funções 
buttons[0].onclick = tocaSomPom;
buttons[1].onclick = tocaSomPom;
buttons[2].onclick = tocaSomPom;
..... */

/* while (contador < buttons.length) {
    let instrumento = buttons[contador].classList[1];
    const id = `#som_${instrumento}`;

    //Se eu colocar o tocarSom() direto, o browser chama a função direto e não deixa executar. Para isso crio uma funcão anônima. Daí primeiro é chamada a função anônima e depois a tocarSom().
    buttons[contador].onclick = function(){
        tocarSom(id);
    };
    contador++;
} */

for (let contador = 0; contador < buttons.length; contador++) {

    const tecla = buttons[contador];
    let instrumento = tecla.classList[1];
    const id = `#som_${instrumento}`;

    tecla.addEventListener('click', function () {
        tocarSom(id);
    });

    //Complemento para acessibilidade, onde apenas as teclas Enter e Space ativam os sons e efeitos

    //'evento' fornece os dados do evento acionado
    tecla.onkeydown = function (evento) {
        let teclaAcionada = evento.code;
        if (teclaAcionada === 'Space' || teclaAcionada === 'Enter') {
            tecla.classList.add('ativa');
        }

    }
    tecla.onkeyup = function () {
        tecla.classList.remove('ativa');
    }

}
