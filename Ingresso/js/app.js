/*Quando recupero valores com .value, eles voltam sempre como String*/
function comprar(){
    let tipo = document.getElementById('tipo-ingresso').value;
    //converte o texto em String para Int
    let qtd = parseInt(document.getElementById('qtd').value);

    switch (tipo){
        case 'pista':
            localEscolhido(qtd,'qtd-pista');
            break;
        case 'superior':
            localEscolhido(qtd,'qtd-superior');
            break;
        case 'inferior':
            localEscolhido(qtd,'qtd-inferior');    
            break;
    }
    document.getElementById('qtd').value = '';
}

function localEscolhido(qtd,qtdRestante){
    /*pego o texto em String e converto para Int 
    e utilizo o comando textContent para mexer no texto do elemento*/
    let qtdComprada = parseInt(document.getElementById(qtdRestante).textContent);
    
    if(document.getElementById('qtd').value == 0){
      alert('Favor escolher uma quantidade.');
    }else if(qtd > qtdComprada){
        alert("Quantidade Indisponível");
      }else {
          qtdComprada = qtdComprada - qtd;
          /*recupero novamente o elemento da página com textContent e 
          atualizo na página a nova quantidade */
          document.getElementById(qtdRestante).textContent = qtdComprada;
          document.getElementById('qtd').innerHTML = 0;
          alert('Compra realizada com sucesso');
      }
}

//Caso queira criar funções separadas, crio 3 destas com as variáveis diferentes
/*function comprarPista(qtd){
    let qtdPista = parseInt(document.getElementById('qtd-pista').textContent);
    if(qtd > qtdPista){
      alert("Quantidade Indisponível");
    }else {
        qtdPista = qtdPista - qtd;
        document.getElementById('qtd-pista').textContent = qtdPista;
        alert('Compra realizada com sucesso');
    }
}*/