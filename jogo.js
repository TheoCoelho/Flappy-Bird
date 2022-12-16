// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("#game-canvas");
const contexto = canvas.getContext('2d');
const FlappyBird = {
    spritesX: 0,
    spritesY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
        desenha() {
            contexto.drawImage(
                sprites,
                FlappyBird.spritesX, FlappyBird.spritesY,
                FlappyBird.largura, FlappyBird.altura,
                FlappyBird.x, FlappyBird.y,
                FlappyBird.largura, FlappyBird.altura,
            );
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
    ychao: 380,
        desenha1() {
            contexto.drawImage(
                sprites,
                Chao.chaoX, Chao.chaoY,
                Chao.largurachao, Chao.alturachao,
                Chao.xchao, Chao.ychao,
                Chao.largurachao, Chao.alturachao,
            );
               
        }
}


function loop(){
    planodefundo.desenha();
    Chao.desenha1();
    FlappyBird.desenha();

        requestAnimationFrame(loop);
}
loop();