/* var consultaCEP = fetch("https://viacep.com.br/ws/01001000/json/")
    .then(resposta => resposta.json())
    .then(resposta => {
        if (resposta.erro) {
            throw Error("Esse CEP não existe")
        } else {
            console.log("Sucesso no carregamento");
        }
    })
    .catch(erro => console.log(erro))
    .finally (mensagem => console.log("Processamento concluido")) */

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById("erro")
    mensagemErro.innerHTML = ""
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro) {
            throw Error("CEP não encontrado!")
        }
        var cidade = document.getElementById("cidade")
        var bairro = document.getElementById("bairro")
        var logradouro = document.getElementById("endereco")
        var estado = document.getElementById("estado")

        cidade.value = consultaCEPConvertida.localidade
        bairro.value = consultaCEPConvertida.bairro
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

var cep = document.getElementById("cep")
cep.addEventListener("focusout", () => buscaEndereco(cep.value))
