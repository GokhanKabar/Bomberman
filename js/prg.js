import {tilemap_loaded, tileset_loaded, cam_x, cam_y, map_cnv} from './map.js';

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
let tabx= [83,400,720,1050];
let taby=[80,350,650,900];

function update() {
	if (tilemap_loaded == 1 && tileset_loaded == 1) {
		let map_ctx = map_cnv.getContext('2d');
		let imageData = map_ctx.getImageData(cam_x, cam_y, cnv.width, cnv.height);
		ctx.putImageData(imageData, 0, 0);
		let zoom = 1.5;
		ctx.fillStyle = '#FFFFFF';
		ctx.closePath();
		ctx.drawImage(all_img[numero], posX, posY, 61.5 * zoom, 64 * zoom);

		if (bomb == true) {
			ctx.drawImage(bombe, carrepox, carreposy, 50 * zoom, 50 * zoom);
		}
		for(let i = 0; i < 5; i++) {
			for(let j=0;j<5;j++){
			ctx.rect(tabx[j],taby[i],150,150);
			ctx.fill();
			}
		}
		for(let i = 0; i < 5; i++) {
			for(let j=0;j<5;j++){
			if (posX < tabx[j] + 150 &&
				posX + 61.5 > tabx[j]&&
				posY < taby[i] + 150 &&
				64 + posY > taby[i]) {
				console.log("zebi");
				 }
		 }
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
			break;

		case 'ArrowLeft':
			if (numero == 1) numero = 0;
			else numero = 1;
			posX -= 20;
			break;

		case 'ArrowDown':
			if (numero == 5) numero = 4;
			else numero = 5;
			posY += 20;
			break;

		case 'ArrowUp':
			if (numero == 7) numero = 6;
			else numero = 7;
			posY -= 20;
			break;

		case 'Space':
			bomb = true;
			carreposy = posY;
			carrepox = posX;

			break;
	}
}