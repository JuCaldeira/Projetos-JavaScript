const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

botaoIniciarCamera.addEventListener('click', async function () {
    //pega o video da câmera
    const iniciarVideo = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: false });

    //tira o botão da tela e coloca a div onde fica a câmera
    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    //seta a câmera no espaço do video
    video.srcObject = iniciarVideo;
});

botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/jpeg');

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});

botaoEnviarFoto.addEventListener('click', () => {
    //pego a String que tinha criado e converto para objeto
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes);

    //adiciono um novo item e parametro ao objeto
    converteRetorno.imagem = imagemURL;

    //converto de novo para String
    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))

    window.location.href = '../pages/abrir-conta-form-3.html';
})