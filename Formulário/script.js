//pego o formulário
document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();//impede da página recarregar
    console.log("Formulário enviado");
})

//pego os inputs com o atributo required
const inputs = document.querySelectorAll("[required]");

function validarCampo(campo) {
    function verificarErros() {//retorna o nome do erro caso tenha, ou falso se não tiver erro
        let erroEncontrado = false;
        for (let erros in campo.validity) {
            //se tiver algum erro como true e não for o "customError", ignoro o valid true
            if (erros != "customError" && campo.validity[erros] && !campo.validity.valid) {
                erroEncontrado = erros;
            }
        }
        return erroEncontrado;
    }

    function editarMensagem(tipoDoErro) {
        const mensagens = {
            text: {
                valueMissing: "Por favor, Preencha este campo."
            },
            email: {
                valueMissing: "E-mail obrigatório!",
                typeMismatch: "Por favor, preencha um e-mail válido"
            }
        }
        return mensagens[campo.type][tipoDoErro];
    }

    function setarMensagem(message) {
        const spanError = campo.parentNode.querySelector("span.error");
        if (message) {
            spanError.classList.add("active");
            spanError.innerHTML = message;
            //toda vez que edito esse campo, o customError fica true
            //campo.setCustomValidity("Esse campo é obrigatório");
        } else {
            spanError.classList.remove("active");
            spanError.innerHTML = "";
            //campo.setCustomValidity("");
        }
    }

    return function () {
        const erro = verificarErros();
        if (erro) {
            const message = editarMensagem(erro);
            setarMensagem(message);
        } else {
            campo.style.borderColor = "green";
            setarMensagem();
        }
    };
}

function customizarValidacao(event) {
    const campo = event.target; //quem disparou o evento
    console.log(campo.validity); //mostra os tipos de erros possíveis

    const validacao = validarCampo(campo);
    validacao();
}

for (input of inputs) {//função chamada apenas se der inválido no campo input
    input.addEventListener("invalid", event => {
        event.preventDefault();
        customizarValidacao(event);
    });
    input.addEventListener('blur', customizarValidacao);
}
