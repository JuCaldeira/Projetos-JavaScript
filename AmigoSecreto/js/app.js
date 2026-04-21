let amigos = [];
let nomesMaiusculos = [];
let controleSorteio = 0;

function adicionar(){
    let amigo = document.getElementById('nome-amigo').value;
    let amigoLetraMaiscula = amigo.toUpperCase();

    if(amigo == ''){
       alert('Favor inserir um nome!');//caso entre nesse if,encerro a função por aqui.
       return;//e não executa o resto
    }
    
    if(nomesMaiusculos.includes(amigoLetraMaiscula)){
       alert('Nome já adicionado!');//para checar se o nome é repetido
       document.getElementById('nome-amigo').value = '';
       return;
    } 

    let lista = document.getElementById('lista-amigos');
    amigos.push(amigo);//adicionar no array

    nomesMaiusculos = amigos.map(function(nome) {
      return nome.toUpperCase();
      });
   
      console.log(nomesMaiusculos);
      console.log(amigos);

    //adiciono o nome do amigo na lista
    if(lista.textContent == ''){
      lista.textContent = amigo;
    }else{
        lista.textContent = lista.textContent + ', ' + amigo;
    }
    document.getElementById('nome-amigo').value = '';
}

function sortear(){

  if(amigos.length < 4){
    alert("Favor inserir no minimo 4 nomes!");
    return;
  }

  if(controleSorteio < 1){
    embaralha(amigos);
    let sorteio = document.getElementById('lista-sorteio');
    //inserir valores na lista
    for(let i = 0; i < amigos.length; i++){

      if(i == amigos.length - 1){
       sorteio.innerHTML = sorteio.innerHTML + amigos[i] + ' --> ' + amigos[0] + '<br>';
      }else{
       sorteio.innerHTML = sorteio.innerHTML + amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
      }
    }
  }else{
    alert('Favor reiniciar antes de sortear novamente!');
  }
     controleSorteio ++;
}

function reiniciar(){
  amigos = [];
  nomesMaiusculos = [];
  controleSorteio = 0;
  document.getElementById('lista-amigos').innerHTML = '';
  document.getElementById('lista-sorteio').innerHTML = '';
}

function embaralha(lista) {

  for (let indice = lista.length; indice; indice--) {

      const indiceAleatorio = Math.floor(Math.random() * indice);

      // atribuição via destructuring
      [lista[indice - 1], lista[indiceAleatorio]] = 
          [lista[indiceAleatorio], lista[indice - 1]];
  }
}