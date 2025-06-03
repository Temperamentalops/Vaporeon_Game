//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const ACERTOU_URL = "https://img1.picmix.com/output/stamp/normal/3/0/0/8/2448003_8dc02.png";
const ERROU_URL = "https://pbs.twimg.com/media/FV06-j_XwAAs6n_.png";

//captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

//funçao que zera os valores das variáveis controladoras
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    btnJogarNovamente.className = 'visivel';
    btnReiniciar.className = 'invisivel';
}

//funçao jogar novamente
function jogarNovamente() {
    jogar = true;
    let divis = document.getElementsByTagName("div");
    for (let i = 0; i < divis.length; i++) {
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
            divis[i].className = "inicial";
            // Remove qualquer imagem dentro da div
            const img = divis[i].querySelector('img');
            if (img) {
                divis[i].removeChild(img);
            }
        }
    }
}

//funçao que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
    desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
    document.getElementById("resposta").innerHTML = 
        `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

//funçao executada quando o jogador acertou ou errou
function acertou(obj) {
    obj.className = "acertou";
    const img = new Image();
    img.width = 100;
    img.src = ACERTOU_URL;
    obj.appendChild(img);
}

function errou(obj) {
    obj.className = "errou";
    const img = new Image();
    img.width = 100;
    img.src = ERROU_URL;
    obj.appendChild(img);
}

function verifica(obj) { //verificação p nao permitir mais de 5 tentativas
    if (!jogar) {
        alert('Clique em "Jogar novamente"');
        return;
    }
    
    if (tentativas >= 5) {  // Alterado para >= por segurança
        jogar = false;
        btnJogarNovamente.className = 'invisivel';
        btnReiniciar.className = 'visivel';
        return;
    }
    
    jogar = false;
    tentativas++;
    
    let sorteado = Math.floor(Math.random() * 3);
    if (obj.id == sorteado) {
        acertou(obj);
        acertos++;
    } else {
        errou(obj);
        const objSorteado = document.getElementById(sorteado.toString()); // Convertendo para string
        if (objSorteado) {
            acertou(objSorteado);
        }
    }
    
    atualizaPlacar(acertos, tentativas);
    
    if (tentativas >= 5) {
        btnJogarNovamente.className = 'invisivel';
        btnReiniciar.className = 'visivel';
    }
}
//Função que verifica se o jogador acertou
function verifica(obj) {
    if (jogar) {
        jogar = false;
        tentativas++;
        
        if (tentativas == 5) {
            btnJogarNovamente.className = 'invisivel';
            btnReiniciar.className = 'visivel';
        }
        
        let sorteado = Math.floor(Math.random() * 3);
        if (obj.id == sorteado) {
            acertou(obj);
            acertos++;
        } else {
            errou(obj); // Chama a nova função quando erra
            const objSorteado = document.getElementById(sorteado);
            acertou(objSorteado);
        }
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente"');
    }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);