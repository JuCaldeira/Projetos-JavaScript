function alterarStatus(id){
    //recupero a classe <li> do html, onde contem o botão
    let gameClicado = document.getElementById(`game-${id}`)
    //busco dentro desta <li> uma div pela classe chamada dashboard (identificada pelo .)
    let imagem = gameClicado.querySelector('.dashboard__item__img');
    //busco dentro desta <li> o botão pela classe chamada dashboard (identificada pelo .)
    let botao = gameClicado.querySelector('.dashboard__item__button');

    /*verifica se na imagem contem esta classe, de item alugado
    Este comando adiciona ou retira efeito opaco na imagem e no botão do item*/
    if (imagem.classList.contains('dashboard__item__img--rented')) {

        imagem.classList.remove('dashboard__item__img--rented');
        botao.classList.remove('dashboard__item__button--return');
        botao.textContent = "Alugar";//trocar texto do botão
    } else {
        imagem.classList.add('dashboard__item__img--rented');
        botao.classList.add('dashboard__item__button--return');
        botao.textContent = "Devolver";
    }
   }
