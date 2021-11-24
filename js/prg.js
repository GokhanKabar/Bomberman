import {tilemap_loaded, tileset_loaded, cam_x, cam_y, map_cnv} from './map.js';

import {
	all_img,
} from './personnage.js';

let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
let bombe = new Image();
bombe.src = './tilesets/bombe.png';
let bomb = false;
let numero = 8;
let posX = 50;
let posY = 50;
let carreposy = 140;
let carrepox = 140;
let tabxy= [100,400,800,1200];
let a=0;
let b=0;

function update() {
	if (tilemap_loaded == 1 && tileset_loaded == 1) {
		let map_ctx = map_cnv.getContext('2d');
		let imageData = map_ctx.getImageData(cam_x, cam_y, cnv.width, cnv.height);
		ctx.putImageData(imageData, 0, 0);
		let zoom = 2;
		ctx.fillStyle = '#FFFFFF';
		ctx.closePath();
		ctx.drawImage(all_img[numero], posX, posY, 61.5 * zoom, 64 * zoom);

		if (bomb == true) {
			ctx.drawImage(bombe, carrepox, carreposy, 50 * zoom, 50 * zoom);
		}
		for(let i = 0; i < 4; i++) {
            for(let j=0;j<4;j++){
            ctx.rect(tabxy[a],tabxy[b],80,80);
            ctx.fill();
            a++;
            }
            b++;
            a=0;
        }
	}
}
setInterval(update, 100);
window.addEventListener('keydown', keydown_fun, false);

function keydown_fun(e) {
	switch (e.code) {
		case 'ArrowRight':
			if (numero == 3) numero = 2;
			else numero = 3;
			posX += 3;
			break;

		case 'ArrowLeft':
			if (numero == 1) numero = 0;
			else numero = 1;
			posX -= 10;
			break;

		case 'ArrowDown':
			if (numero == 5) numero = 4;
			else numero = 5;
			posY += 10;
			break;

		case 'ArrowUp':
			if (numero == 7) numero = 6;
			else numero = 7;
			posY -= 10;
			break;

		case 'Space':
			bomb = true;
			carreposy = posY;
			carrepox = posX;

			break;
	}
}


