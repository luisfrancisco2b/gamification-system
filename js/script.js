// Variáveis do sistema 
// localStorage salva strings;

let pontos = parseInt(localStorage.getItem("pontos")) || 0;
let nivel = parseInt(localStorage.getItem("nivel")) || 1;
let semana = parseInt(localStorage.getItem("semana")) || 1;
// pega o booleno e transforma em string;
let missaoUsada = localStorage.getItem("missaoUsada") === "true";

// let pontos = 0;
// let nivel = 1;
// let semana = 1;
// let missaoUsada = false;


// Captura dos elementos 
const pontosElemento = document.getElementById("pontos");
const nivelElemento = document.getElementById("nivel");

const btnPrazo = document.getElementById("btnPrazo");
const btnAtraso = document.getElementById("btnAtraso");
const btnNovaSemana = document.getElementById("btnNovaSemana");
const btnMissaoExtra = document.getElementById("btnMissaoExtra")

const mensagemElemento = document.getElementById("mensagemSistema");
const faseTexto = document.getElementById("fase");
const barra = document.getElementById("barra");


// Eventos 
btnPrazo.addEventListener("click", entregaNoPrazo);
btnAtraso.addEventListener("click", entregaAtrasada);
btnNovaSemana.addEventListener("click", novaSemana)
btnMissaoExtra.addEventListener("click", missaoExtra)


// Funções principais 

// Função btn entrega no prazo
function entregaNoPrazo() {
    pontos += 10;
    verificarNivel();
    atualizarPainel("Excelente! Você ganhou 10 pontos.");
}

// Função btn entrega atrasada
function entregaAtrasada() {
    pontos -= 5;
    if (pontos < 0) {
        pontos = 0;
    }
    verificarNivel();
    atualizarPainel("Atenção! Você perdeu 5 pontos.");
}

// Função de nova semana
function novaSemana() {
    semana++;
    pontos = 0;
    nivel = 1;
    atualizarPainel();
    faseTexto.textContent = "Semana " + semana;
    missaoUsada = false;
}

// Função Missão Extra
function missaoExtra() {
    if (missaoUsada) {
        atualizarPainel("Você já usou a missão extra essa semana!");
        return;
    } else if (pontos >= 20 ) {
        atualizarPainel("Missão extra é apenas para quem precise recuperar pontos!");
        return;
    }

    pontos+=7;
    missaoUsada = true;

    atualizarPainel("Você concluiu a missão! Parabéns, +7 pontos recuperados!")

}

// Função de salvar progresso
function salvarProgresso(){
    localStorage.setItem("pontos", pontos);
    localStorage.setItem("nivel", nivel);
    localStorage.setItem("semana", semana);
    localStorage.setItem("missaoUsada", missaoUsada);
}


// Atualiza interface 
function atualizarPainel(mensagem) {
    pontosElemento.innerText = pontos;
    nivelElemento.innerText = nivel;
    mensagemElemento.innerText = mensagem || " ";
    faseTexto.innerText = "Semana " + semana;
    barra.value = pontos;

    salvarProgresso();
}


// Sistema de progressão 
function verificarNivel() {
    if (pontos >= 50) {
        nivel = 3;
    } else if (pontos >= 20) {
        nivel = 2;
    } else {
        nivel = 1;
    }

} 

atualizarPainel();