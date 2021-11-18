let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
ctx.imageSmoothingEnabled = false;
let all_img = [];
let img = new Image();
img.src = "./assets/bomberman.png";
let numero = 8;
let posX = 50;
let posY = 50;
let carreposy = 150;
let carrepox = 150;
let red = '#f00020';
let bomb = false;


img.onload = function () {
    let canvas1 = document.createElement("canvas");
    canvas1.width = 61.5 * 2;
    canvas1.height = 64 * 5;
    let context1 = canvas1.getContext("2d");
    context1.drawImage(img, 0, 0, 61.5 * 2, 64 * 5);
    for (let j = 0; j < 5; j += 1) {
        for (let i = 0; i < 2; i += 1) {
            let canvasImageData1 = context1.getImageData(i * 61.5, j * 64, 61.5, 64);
            let canvas2 = document.createElement("canvas");
            canvas2.width = 61.5;
            canvas2.height = 64;
            let context2 = canvas2.getContext("2d");
            context2.putImageData(canvasImageData1, 0, 0);
            all_img.push(canvas2);
        }
    }
};

function update() {
    let zoom = 1;
    ctx.clearRect(0, 0,  640, 480);
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.closePath();
    ctx.drawImage(all_img[numero], posX,
    posY, 61.5 * zoom, 64 * zoom);

    if(bomb == true){
        ctx.fillStyle = red; 
        ctx.fillRect(carrepox, carreposy, 50, 50);
    }

    }

window.addEventListener('keydown', keydown_fun, false);

function keydown_fun(e) {
    switch (e.code) {
        case "ArrowRight":
           if(numero == 3) numero = 2
           else numero = 3
           posX += 3;
            break;
    
    case "ArrowLeft":
        if(numero == 1) numero = 0
           else numero = 1
        posX -=10;
        break;

    case "ArrowDown":
        if(numero == 5) numero = 4
            else numero = 5
        posY +=10;
            break;

    case "ArrowUp":
        if(numero == 7) numero = 6
        else numero = 7
            posY -=10;
            break;
            
    case "Space":
        bomb = true;
        carreposy = posY;
        carrepox = posX;

        break
        
      
}}
setInterval(update, 100);

/*droite[0] = [all_image[0],all_image[1]]*/