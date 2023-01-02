
const sprites = new Image();
sprites.src = "./sprites.png";
const som_punch = new Audio()
som_punch.src = "./som/punch.wav"
const canvas = document.querySelector("#game-canvas");
const contexto = canvas.getContext('2d');
const FlappyBird = {
    spritesX: 0,
    spritesY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    pulo:4.6,
    pula(){
        FlappyBird.velocidade = -FlappyBird.pulo
    },
        desenha() {
            contexto.drawImage(
                sprites,
                FlappyBird.spritesX, FlappyBird.spritesY,
                FlappyBird.largura, FlappyBird.altura,
                FlappyBird.x, FlappyBird.y,
                FlappyBird.largura, FlappyBird.altura,
            );
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
            if(fazcolisao()){
                som_punch.play()
                telaativa = Telainicio

                return
            }
            FlappyBird.velocidade += FlappyBird.gravidade
            FlappyBird.y = FlappyBird.y + FlappyBird.velocidade
    }
}

function fazcolisao(){
    if(FlappyBird.y + FlappyBird.altura > Chao.ychao){
        return true
    }
    else{
        return false

    }

}
const planodefundo = {
    spritesX: 390,
    spritesY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
        desenha(){
            contexto.fillstyle = "#70c5ce"
            contexto.fillRect(0,0,canvas.width, canvas.height)
            contexto.drawImage(
                sprites,
                planodefundo.spritesX, planodefundo.spritesY,
                planodefundo.largura, planodefundo.altura,
                planodefundo.x, planodefundo.y,
                planodefundo.largura, planodefundo.altura,
            );
            contexto.drawImage(
                sprites,
                planodefundo.spritesX, planodefundo.spritesY,
                planodefundo.largura, planodefundo.altura,
                planodefundo.x + planodefundo.largura, planodefundo.y,
                planodefundo.largura, planodefundo.altura,
            )
        }
}


const Chao = {
    chaoX: 0,
    chaoY: 611,
    largurachao: 224,
    alturachao: 112,
    xchao: 0,
    ychao: 370,
        desenha1() {
            contexto.drawImage(
                sprites,
                Chao.chaoX, Chao.chaoY,
                Chao.largurachao, Chao.alturachao,
                Chao.xchao, Chao.ychao,
                Chao.largurachao, Chao.alturachao,
            );
            contexto.drawImage(
                sprites,
                Chao.chaoX, Chao.chaoY,
                Chao.largurachao, Chao.alturachao,
                Chao.xchao + Chao.largurachao, Chao.ychao,
                Chao.largurachao, Chao.alturachao,
            )
               
        }
}

const inicio = {
    spritesX: 130,
    spritesY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
        desenha() {
            contexto.drawImage(
                sprites,
                inicio.spritesX, inicio.spritesY,
                inicio.largura, inicio.altura,
                inicio.x, inicio.y,
                inicio.largura, inicio.altura,
            );
        }
}

const Telainicio ={
    desenha(){
        planodefundo.desenha()
        Chao.desenha1()
        FlappyBird.desenha()
        inicio.desenha()
    },
    click(){
        telaativa = Telajogo
    }
}


const Telajogo ={ 
    desenha(){
        planodefundo.desenha()
        Chao.desenha1()
        FlappyBird.desenha()
        FlappyBird.atualiza()
    },
    click(){
        FlappyBird.pula()
    
    }
}
var telaativa = Telainicio

function mudatelaativa(){
    telaativa.click()
}

window.addEventListener("click",mudatelaativa)


 function loop(){
     telaativa.desenha()
         requestAnimationFrame(loop);
}

loop();