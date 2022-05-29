import {
	tilemap_loaded,
	tileset_loaded,
	cam_x,
	cam_y,
	map_cnv,
	posbloc,
	posBuisson,
} from './map.js';

import {tabperso1} from './personnage.js';
import {tabperso2} from './personnage2.js';

let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
let bombe = new Image();
bombe.src = 'tilesets/bombe.png';
let zone = new Image();
zone.src = 'assets/zone.png';


let bomb = false;



let zonebool = true;

let zonetab = [];

let all_img2 = [];
let img2 = new Image();
img2.src = 'assets/smallerbomb.png';


let explosion = new Image();
explosion.src = 'assets/boom.png';
let firetab = [];
let score1=document.getElementById('s1');
let s1=0;




class Perso {
	constructor(numero, bombY, bombX,bomb,posX,posY,zonetab,anim_id,tabperso,firetab) {
		this.numero = numero;
		this.bombY = bombY;
		this.bombX = bombX;
		this.bomb = bomb;
		this.posX = posX;
		this.posY = posY;
		this.zonetab = [];
		this.anim_id = anim_id;
		this.tabperso = [];
		this.firetab = [];

	}
  }

const perso1 = new Perso(8, 0,0,false,0,0,zonetab[100000],-1,tabperso1[100000],firetab[100000]);
	


//image de la bombe 
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
	perso1.anim_id = 0;
};
//image de la deuxième bombe du deuxième joueur

function drawimgid(perso){
	let zoom2 = 3;
	let zoom3 = 1;
	for (let i = 0; i < perso.zonetab.length; i++) {
		ctx.drawImage(
			zone,
			perso.zonetab[i][0],
			perso.zonetab[i][1],
			perso.zonetab[i][2],
			perso.zonetab[i][3]
		);
	}
	if (bomb == true) {
		if (perso.anim_id >= 0) {
			ctx.drawImage(
				all_img2[perso.anim_id],
				perso.bombX,
				perso.bombY,
				26 * zoom2,
				35 * zoom2
			);
			perso.anim_id += 1;
			if (perso.anim_id == all_img2.length) {
				collision_bombe1(perso1);
				perso.anim_id = 5;
				//dessine les explosions sur les buissons
					for (let i = 0; i < perso.firetab.length; i++) {
						ctx.drawImage(
							explosion,
							perso.firetab[i][0],
							perso.firetab[i][1],
							123 * zoom3,
							121 * zoom3
						);
					}
				
				perso.firetab = [];
				perso.anim_id = 0;
				bomb = false;
			}
		}
	}
}

//fonction update pour dessiner
function update() {
	ctx.beginPath();

	if (tilemap_loaded == 1 && tileset_loaded == 1) {
		let map_ctx = map_cnv.getContext('2d');
		let imageData = map_ctx.getImageData(cam_x, cam_y, cnv.width, cnv.height);
		ctx.putImageData(imageData, 0, 0);
		let zoom = 2;
		

		drawimgid(perso1)
	
	//dessine les joueurs
		ctx.drawImage(tabperso1[perso1.numero], perso1.posX, perso1.posY, 51 * zoom, 61 * zoom);
		ctx.closePath();
	}
}
//collision de la bombe du joueur 1
function collision_bombe1(perso) {
	let zonex1 = perso.bombX + 150;
	let zoney1 = perso.bombY + 150;
	let zonex2 = perso.bombX - 150;
	let zoney2 = perso.bombY - 150;
	for (let i = 0; i < posBuisson.length; i++) {
		//condition pour les collisions
		if (
			(zonex1 < posBuisson[i][0] + posBuisson[i][2] &&
				zonex1 + 50 > posBuisson[i][0] &&
				perso.bombY < posBuisson[i][1] + posBuisson[i][3] &&
				50 + perso.bombY > posBuisson[i][1]) ||
			(zonex2 < posBuisson[i][0] + posBuisson[i][2] &&
				zonex2 + 50 > posBuisson[i][0] &&
				perso.bombY < posBuisson[i][1] + posBuisson[i][3] &&
				50 + perso.bombY > posBuisson[i][1]) ||
			(perso.bombX < posBuisson[i][0] + posBuisson[i][2] &&
				perso.bombX + 50 > posBuisson[i][0] &&
				zoney2 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + zoney2 > posBuisson[i][1]) ||
			(perso.bombX < posBuisson[i][0] + posBuisson[i][2] &&
				perso.bombX + 50 > posBuisson[i][0] &&
				zoney1 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + zoney1 > posBuisson[i][1])
		) {
			//score du joueur 1
			s1+=100;
			score1.textContent= s1;
			zonebool = true;
			//récupération des coordoonées des buissons pour le fond
			perso.zonetab.push([
				posBuisson[i][0],
				posBuisson[i][1],
				posBuisson[i][2],
				posBuisson[i][3],
			]);
			//récupération des coordoonées des buissons pour l'explosion
			perso.firetab.push([
				posBuisson[i][0],
				posBuisson[i][1],
				posBuisson[i][2],
				posBuisson[i][3],
			]);
			// supprime l'indice des buissons qui à était en collision
			posBuisson.splice(i, 1);
		}
	}
}

function collision(perso,x,y) {
	for (let i = 0; i < posbloc.length; i++) {
		// collision du joueur avec les blocs
		if (
			perso.posX < posbloc[i][0] + posbloc[i][2] &&
			perso.posX + 51 > posbloc[i][0] &&
			perso.posY < posbloc[i][1] + posbloc[i][3] &&
			61 + perso.posY > posbloc[i][1]
		) {
			perso.posX += x;
			perso.posY += y;
		}
	}
	// collision du joueur avec les buissons
	for (let i = 0; i < posBuisson.length; i++) {
		if (
			perso.posX < posBuisson[i][0] + posBuisson[i][2] &&
			perso.posX + 51 > posBuisson[i][0] &&
			perso.posY < posBuisson[i][1] + posBuisson[i][3] &&
			61 + perso.posY > posBuisson[i][1]
		) {
			perso.posX += x;
			perso.posY += y;
		}
	}
}



setInterval(update, 150);


	function bombe_p1(perso){
		if (bomb == false) {
			bomb = true;
			perso.bombY = perso.posY;
			perso.bombX = perso.posX;
		}
	}


	// déplacement des joueurs
	function droite(perso){
		if (perso.numero == 3) 
			perso.numero = 2;
		else perso.numero = 3;
	perso.posX += 20;
	collision(perso,-20,0);
	}


	function gauche(perso)
	{
		if (perso.numero == 1) 
			perso.numero = 0;
		else perso.numero= 1;
	perso.posX -= 20;
	collision(perso,+20, 0);

	}
	function haut(perso)
	{
		if (perso.numero == 7) 
			perso.numero = 6;
		else perso.numero = 7;
	perso.posY -= 20;
	collision(perso,0, +20);
	}
	function bas(perso){
		if (perso.numero == 5) 
			perso.numero = 4;
		else perso.numero= 5;
	perso.posY += 20;
	collision(perso,0, -20);
	}

window.addEventListener('keydown', keydown_fun, false);
function keydown_fun(e) {
	switch (e.code) {
		case 'ArrowRight':
			droite(perso1);
			break;
		case 'ArrowLeft':
			gauche(perso1);
			break;
		case 'ArrowDown':
			bas(perso1);
			break;
		case 'ArrowUp':
			haut(perso1);
			break;
		case 'Space':
			bombe_p1(perso1);
			break;
	}
	// switch (e.key) {			
	// 	case 'd':
	// 			droite(perso2);
	// 			break;
	
	// 	case 'q':
	// 			gauche(perso2);
	// 			break;
	
	// 	case 's':
	// 			bas(perso2);
	// 			break;
	
	// 	case 'z':
	// 		haut(perso2);
	// 			break;
	
	// 	case 'Shift':
	// 			bombe_p1(perso2);
	// 			break;
	// }
}