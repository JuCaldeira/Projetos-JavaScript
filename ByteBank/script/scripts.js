import selecionaCotacao from "./imprimiCotacao.js";

const graficoDolar = document.getElementById("graficoDolar")
const graficoIene = document.getElementById("graficoIene")

const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],//legenda
    datasets: [{
      label: 'Dólar',
      data: [],//valores
      borderWidth: 1//espessura da linha do grafico
    }]
  },
});

const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],//legenda
    datasets: [{
      label: 'Iene',
      data: [],//valores
      borderWidth: 1//espessura da linha do grafico
    }]
  },
});

function gerarHorario() {
  let data = new Date()
  let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
  return horario
}

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda)
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados)
  });
  grafico.update()
}

let workerDolar = new Worker("./script/workers/workerDolar.js")
workerDolar.postMessage("usd")//envia a mensagem para o Worker logo no inicio da execução

//toda vez que recebe uma mensagem, ele pega os valores com a variável evento
workerDolar.addEventListener("message", evento => {
  let tempo = gerarHorario()
  let valor = evento.data.ask
  selecionaCotacao("dolar", valor)
  adicionarDados(graficoParaDolar, tempo, valor)
})

let workerIene = new Worker("./script/workers/workerIene.js")
workerIene.postMessage("iene")

workerIene.addEventListener("message", evento => {
  let tempo = gerarHorario()
  let valor = evento.data.ask
  selecionaCotacao("iene", valor)
  adicionarDados(graficoParaIene, tempo, valor)
})