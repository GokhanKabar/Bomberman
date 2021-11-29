import {
	tilemap_loaded,
	tileset_loaded,
	cam_x,
	cam_y,
	map_cnv,
	posbloc,
	posBuisson,
} from './map.js';

import {all_img} from './personnage.js';
import {tabperso2} from './personnage2.js';

export {zonebool};

let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
let bombe = new Image();
bombe.src = 'tilesets/bombe.png';
let zone = new Image();
zone.src = 'assets/zone.png';
let zonebool = false;
let bomb = false;
let numero = 8;
let numero2= 8;

let posX = 0;
let posY = 0;
let posX2=1000;
let posY2=1000;

let carreposy = 140;
let carrepox = 140;
let zonetab = [];

let all_img2 = [];
let img2 = new Image();
img2.src = 'assets/smallerbomb.png';
let anim_id2 = -1;

let explosion = new Image();
explosion.src = 'assets/boom.png';
let firetab = [];

img2.onload = function () {
	let canvas2 = document.createElement('canvas');
	canvas2.width = 26 * 6;
	canvas2.height = 32 * 1;
	let context2 = canvas2.getContext('2d');
	context2.drawImage(img2, 0, 0, canvas2.width, canvas2.height);
	let imax = 6;
	for (let i = 0; i < imax; i += 1) {
		let canvasImageData2 = context2.getImageData(i * 26, 0, 26, 32);
		let canvas3 = document.createElement('canvas');
		canvas3.width = 26;
		canvas3.height = 32;
		let context3 = canvas3.getContext('2d');
		context3.putImageData(canvasImageData2, 0, 0);
		all_img2.push(canvas3);
	}
	anim_id2 = 0;
};


function update() {
	ctx.beginPath();

	if (tilemap_loaded == 1 && tileset_loaded == 1) {
		let map_ctx = map_cnv.getContext('2d');
		let imageData = map_ctx.getImageData(cam_x, cam_y, cnv.width, cnv.height);
		ctx.putImageData(imageData, 0, 0);
		let zoom = 2;
		let zoom2 = 3;
		let zoom3 = 1;

		for (let i = 0; i < zonetab.length; i++) {
			ctx.drawImage(
				zone,
				zonetab[i][0],
				zonetab[i][1],
				zonetab[i][2],
				zonetab[i][3]
			);
		}

		if (bomb == true) {
			if (anim_id2 >= 0) {
				ctx.drawImage(
					all_img2[anim_id2],
					carrepox,
					carreposy,
					26 * zoom2,
					35 * zoom2
				);
				anim_id2 += 1;
				if (anim_id2 == all_img2.length) {
					collision_bombe();
					console.log(firetab);
					anim_id2 = 5;
						for (let i = 0; i < firetab.length; i++) {
							ctx.drawImage(
								explosion,
								firetab[i][0],
								firetab[i][1],
								123 * zoom3,
								121 * zoom3
							);
						

							
						}
					
					firetab = [];
					anim_id2 = 0;
					bomb = false;
				}
			}
		}
		ctx.drawImage(all_img[numero], posX, posY, 51 * zoom, 61 * zoom);
		ctx.drawImage(tabperso2[numero2], posX2, posY2, 51 * zoom, 61 * zoom);
		ctx.closePath();
	}
}

function collision_bombe() {
	let zonex1 = carrepox + 150;
	let zoney1 = carreposy + 150;
	let zonex2 = carrepox - 150;
	let zoney2 = carreposy - 150;
	for (let i = 0; i < posBuisson.length; i++) {
		if (
			(zonex1 < posBuisson[i][0] + posBuisson[i][2] &&
				zonex1 + 50 > posBuisson[i][0] &&
				carreposy < posBuisson[i][1] + posBuisson[i][3] &&
				50 + carreposy > posBuisson[i][1]) ||
			(zonex2 < posBuisson[i][0] + posBuisson[i][2] &&
				zonex2 + 50 > posBuisson[i][0] &&
				carreposy < posBuisson[i][1] + posBuisson[i][3] &&
				50 + carreposy > posBuisson[i][1]) ||
			(carrepox < posBuisson[i][0] + posBuisson[i][2] &&
				carrepox + 50 > posBuisson[i][0] &&
				zoney2 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + zoney2 > posBuisson[i][1]) ||
			(carrepox < posBuisson[i][0] + posBuisson[i][2] &&
				carrepox + 50 > posBuisson[i][0] &&
				zoney1 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + zoney1 > posBuisson[i][1])
		) {
			zonebool = true;
			zonetab.push([
				posBuisson[i][0],
				posBuisson[i][1],
				posBuisson[i][2],
				posBuisson[i][3],
			]);
			firetab.push([
				posBuisson[i][0],
				posBuisson[i][1],
				posBuisson[i][2],
				posBuisson[i][3],
			]);
			posBuisson.splice(i, 1);
		}
	}
}
function collision(x, y) {
	for (let i = 0; i < posbloc.length; i++) {
		if (
			posX < posbloc[i][0] + posbloc[i][2] &&
			posX + 51 > posbloc[i][0] &&
			posY < posbloc[i][1] + posbloc[i][3] &&
			61 + posY > posbloc[i][1]
		) {
			posX += x;
			posY += y;
		}
	}
	for (let i = 0; i < posBuisson.length; i++) {
		if (
			posX < posBuisson[i][0] + posBuisson[i][2] &&
			posX + 51 > posBuisson[i][0] &&
			posY < posBuisson[i][1] + posBuisson[i][3] &&
			61 + posY > posBuisson[i][1]
		) {
			posX += x;
			posY += y;
		}
	}
}
function collision2(x, y) {
	for (let i = 0; i < posbloc.length; i++) {
		if (
			posX2 < posbloc[i][0] + posbloc[i][2] &&
			posX2 + 51 > posbloc[i][0] &&
			posY2 < posbloc[i][1] + posbloc[i][3] &&
			61 + posY2 > posbloc[i][1]
		) {
			posX2 += x;
			posY2 += y;
		}
	}
	for (let i = 0; i < posBuisson.length; i++) {
		if (
			posX2 < posBuisson[i][0] + posBuisson[i][2] &&
			posX2 + 51 > posBuisson[i][0] &&
			posY2 < posBuisson[i][1] + posBuisson[i][3] &&
			61 + posY2 > posBuisson[i][1]
		) {
			posX2 += x;
			posY2 += y;
		}
	}
}
setInterval(update, 150);
window.addEventListener('keydown', keydown_fun, false);

function keydown_fun(e) {
	switch (e.code) {
		case 'ArrowRight':
			if (numero == 3) numero = 2;
			else numero = 3;
			posX += 20;
			collision(-20, 0);
			break;

		case 'ArrowLeft':
			if (numero == 1) numero = 0;
			else numero = 1;
			posX -= 20;
			collision(+20, 0);
			break;

		case 'ArrowDown':
			if (numero == 5) numero = 4;
			else numero = 5;
			posY += 20;
			collision(0, -20);
			break;

		case 'ArrowUp':
			if (numero == 7) numero = 6;
			else numero = 7;
			posY -= 20;
			collision(0, +20);
			break;

		case 'Space':
			if (bomb == false) {
				bomb = true;
				carreposy = posY;
				carrepox = posX;
			}

			break;
	}
	switch (e.key) {			
		case 'd':
				if (numero2 == 3) numero2 = 2;
				else numero2 = 3;
				posX2 += 20;
				collision2(-20, 0);
				break;
	
		case 'q':
				if (numero2 == 1) numero2= 0;
				else numero2 = 1;
				posX2 -= 20;
				collision2(+20, 0);
				break;
	
		case 's':
				if (numero2 == 5) numero2 = 4;
				else numero2 = 5;
				posY2 += 20;
				collision2(0, -20);
				break;
	
		case 'z':
				if (numero2 == 7) numero2 = 6;
				else numero2 = 7;
				posY2 -= 20;
				collision2(0, +20);
				break;
	
		case 'g':
				if (bomb == false) {
					bomb = true;
					carreposy = posY2;
					carrepox = posX2;
				}
	
				break;
	}
}
