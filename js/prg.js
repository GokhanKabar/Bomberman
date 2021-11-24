import {tilemap_loaded, tileset_loaded, cam_x, cam_y, map_cnv, posbloc} from './map.js';

import {
	all_img
} from './personnage.js';

let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
let bombe = new Image();
bombe.src = './tilesets/bombe.png';
let bomb = false;
let numero = 8;
let posX = 0;
let posY = 0;
let carreposy = 140;
let carrepox = 140;
let tabx= [83,400,720,1040];
let taby=[100,330,650,900];

function update() {
	ctx.beginPath()
	if (tilemap_loaded == 1 && tileset_loaded == 1) {
		
		let map_ctx = map_cnv.getContext('2d');
		let imageData = map_ctx.getImageData(cam_x, cam_y, cnv.width, cnv.height);
		ctx.putImageData(imageData, 0, 0);
		let zoom = 2;
		ctx.fillStyle = '#FFFFFF';
		ctx.drawImage(all_img[numero], posX, posY, 51 * zoom, 61 * zoom);

		if (bomb == true) {
			ctx.drawImage(bombe, carrepox, carreposy, 50 * zoom, 50 * zoom);
		}
		ctx.closePath();

		


	}
}

function collision(x,y){
	for(let i = 0; i < posbloc.length; i++) {
		if (posX < posbloc[i][0] + posbloc[i][2] &&
			posX + 51  > posbloc[i][0]&&
			posY < posbloc[i][1] + posbloc[i][3] &&
			61 + posY > posbloc[i][1]) {
				posX += x;
				posY += y;
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
			posX += 20;
			collision(-20,0)
			break;

		case 'ArrowLeft':
			if (numero == 1) numero = 0;
			else numero = 1;
			posX -= 20;
			collision(+20,0)
			break;

		case 'ArrowDown':
			if (numero == 5) numero = 4;
			else numero = 5;
			posY += 20;
			collision(0,-20)
			break;

		case 'ArrowUp':
			if (numero == 7) numero = 6;
			else numero = 7;
			posY -= 20;
			collision(0,+20)
			break;

		case 'Space':
			bomb = true;
			carreposy = posY;
			carrepox = posX;

			break;
	}
}