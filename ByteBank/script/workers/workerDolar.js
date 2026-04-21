//assim que recebe uma mensagem, este worker começa a executar suas funções numa outra Thread. E depois de terminado, envia os dados com o PostMessage
async function conectaAPI (){
    const conecta = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
    const conectaTraduzido = await conecta.json()
    postMessage(conectaTraduzido.USDBRL)
    console.log(conectaTraduzido);
}

//para receber a mensagem
addEventListener("message" , () => {
    conectaAPI()
    setInterval(() => conectaAPI(), 5000)
})