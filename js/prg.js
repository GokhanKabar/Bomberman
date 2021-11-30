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

let bombY1 = 0;
let bombX1 = 0;
let bombY2 = 0;
let bombX2 = 0;
let bomb2 = false;

let zonetab = [];
let zonetab2 = [];

let all_img2 = [];
let img2 = new Image();
img2.src = 'assets/smallerbomb.png';
let anim_id2 = -1;

let img3 = new Image();
img3.src = 'assets/smallerbomb.png';
let all_img3 = [];
let anim_id3 = -1;
let firetab2 = [];


let explosion = new Image();
explosion.src = 'assets/boom.png';
let firetab = [];
let score1=document.getElementById('s1');
let score2=document.getElementById('s2');
let s1=0;
let s2=0;

let win = new Image();
win.src = 'assets/win.png';
	


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
	anim_id2 = 0;
};
//image de la deuxième bombe du deuxième joueur
img3.onload = function () {
	let canvas3 = document.createElement('canvas');
	canvas3.width = 26 * 6;
	canvas3.height = 32 * 1;
	let context2 = canvas3.getContext('2d');
	context2.drawImage(img3, 0, 0, canvas3.width, canvas3.height);
	let imax = 6;
	for (let i = 0; i < imax; i += 1) {
		let canvasImageData2 = context2.getImageData(i * 26, 0, 26, 32);
		let canvas4 = document.createElement('canvas');
		canvas4.width = 26;
		canvas4.height = 32;
		let context3 = canvas4.getContext('2d');
		context3.putImageData(canvasImageData2, 0, 0);
		all_img3.push(canvas4);
	}
	anim_id3 = 0;
};

//fonction update pour dessiner
function update() {
	ctx.beginPath();

	if (tilemap_loaded == 1 && tileset_loaded == 1) {
		let map_ctx = map_cnv.getContext('2d');
		let imageData = map_ctx.getImageData(cam_x, cam_y, cnv.width, cnv.height);
		ctx.putImageData(imageData, 0, 0);
		let zoom = 2;
		let zoom2 = 3;
		let zoom3 = 1;
//dessine les fond a la place des buissons
		for (let i = 0; i < zonetab.length; i++) {
			ctx.drawImage(
				zone,
				zonetab[i][0],
				zonetab[i][1],
				zonetab[i][2],
				zonetab[i][3]
			);
		}
//dessine la bombe
		if (bomb == true) {
			if (anim_id2 >= 0) {
				ctx.drawImage(
					all_img2[anim_id2],
					bombX1,
					bombY1,
					26 * zoom2,
					35 * zoom2
				);
				anim_id2 += 1;
				if (anim_id2 == all_img2.length) {
					collision_bombe1();
					anim_id2 = 5;
					//dessine les explosions sur les buissons
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
		//dessine le fond du joueur 2
		for (let i = 0; i < zonetab2.length; i++) {
			ctx.drawImage(
				zone,
				zonetab2[i][0],
				zonetab2[i][1],
				zonetab2[i][2],
				zonetab2[i][3]
			);
		}
		if (bomb2 == true) {
//bombe du joueur 2
			if (anim_id3 >= 0) {
				ctx.drawImage(
					all_img3[anim_id3],
					bombX2,
					bombY2,
					26 * zoom2,
					35 * zoom2
				);
				anim_id3 += 1;
				if (anim_id3 == all_img3.length) {
					collision_bombe2();
					anim_id3 = 5;
						for (let i = 0; i < firetab2.length; i++) {
							ctx.drawImage(
								explosion,
								firetab2[i][0],
								firetab2[i][1],
								123 * zoom3,
								121 * zoom3
							);
						

							
						}
					
					firetab2 = [];
					anim_id3 = 0;
					bomb2 = false;
				}
			}
		}
	//dessine les joueurs
		ctx.drawImage(all_img[numero], posX, posY, 51 * zoom, 61 * zoom);
		ctx.drawImage(tabperso2[numero2], posX2, posY2, 51 * zoom, 61 * zoom);
		ctx.closePath();
	}
}
//collision de la bombe du joueur 1
function collision_bombe1() {
	let zonex1 = bombX1 + 150;
	let zoney1 = bombY1 + 150;
	let zonex2 = bombX1 - 150;
	let zoney2 = bombY1 - 150;
	for (let i = 0; i < posBuisson.length; i++) {
		//condition pour les collisions
		if (
			(zonex1 < posBuisson[i][0] + posBuisson[i][2] &&
				zonex1 + 50 > posBuisson[i][0] &&
				bombY1 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + bombY1 > posBuisson[i][1]) ||
			(zonex2 < posBuisson[i][0] + posBuisson[i][2] &&
				zonex2 + 50 > posBuisson[i][0] &&
				bombY1 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + bombY1 > posBuisson[i][1]) ||
			(bombX1 < posBuisson[i][0] + posBuisson[i][2] &&
				bombX1 + 50 > posBuisson[i][0] &&
				zoney2 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + zoney2 > posBuisson[i][1]) ||
			(bombX1 < posBuisson[i][0] + posBuisson[i][2] &&
				bombX1 + 50 > posBuisson[i][0] &&
				zoney1 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + zoney1 > posBuisson[i][1])
		) {
			//score du joueur 1
			s1+=100;
			score1.textContent= s1;
			zonebool = true;
			//récupération des coordoonées des buissons pour le fond
			zonetab.push([
				posBuisson[i][0],
				posBuisson[i][1],
				posBuisson[i][2],
				posBuisson[i][3],
			]);
			//récupération des coordoonées des buissons pour l'explosion
			firetab.push([
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
function collision_bombe2() {
	let zonex1 = bombX2 + 150;// pour le rect en haut
	let zoney1 = bombY2 + 150;//pour le rect a droite 
	let zonex2 = bombX2 - 150;// pour le rect gauche
	let zoney2 = bombY2 - 150;// pour le rect bas
	for (let i = 0; i < posBuisson.length; i++) {
		if (
			(zonex1 < posBuisson[i][0] + posBuisson[i][2] &&
				zonex1 + 50 > posBuisson[i][0] &&
				bombY2 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + bombY2 > posBuisson[i][1]) ||
			(zonex2 < posBuisson[i][0] + posBuisson[i][2] &&
				zonex2 + 50 > posBuisson[i][0] &&
				bombY2 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + bombY2 > posBuisson[i][1]) ||
			(bombX2 < posBuisson[i][0] + posBuisson[i][2] &&
				bombX2 + 50 > posBuisson[i][0] &&
				zoney2 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + zoney2 > posBuisson[i][1]) ||
			(bombX2 < posBuisson[i][0] + posBuisson[i][2] &&
				bombX2 + 50 > posBuisson[i][0] &&
				zoney1 < posBuisson[i][1] + posBuisson[i][3] &&
				50 + zoney1 > posBuisson[i][1])
		) {
			s2+=100;
			score2.textContent= s2;
			zonebool = true;
			zonetab2.push([
				posBuisson[i][0],
				posBuisson[i][1],
				posBuisson[i][2],
				posBuisson[i][3],
			]);
			firetab2.push([
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
		// collision du joueur avec les blocs
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

	// collision du joueur avec les buissons
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

/*window.addEventListener('keydown', keydown_fun, false);
function keydown_fun(e) {
	switch (e.code) {
		case 'ArrowRight':
			droite_1();
			break;

		case 'ArrowLeft':
			gauche_1();
			break;

		case 'ArrowDown':
			bas_1();
			break;

		case 'ArrowUp':
			haute_1();
			break;

		case 'Space':
			bombe_p1();

			break;
	}
	switch (e.key) {			
		case 'd':
				droite_2();
				break;
	
		case 'q':
				gauche_2();
				break;
	
		case 's':
				bas_2();
				break;
	
		case 'z':
			haute_2();
				break;
	
		case 'Shift':
				bombe_p2();
	
				break;
	}
}
*/

// déplacement des joueurs
function droite_1(){
    if (numero == 3) numero = 2;
			else numero = 3;
			posX += 20;
			collision(-20,0);
}
function gauche_1()
{
	if (numero == 1) numero = 0;
			else numero = 1;
			posX -= 20;
			collision(+20, 0);
}
function haute_1()
{
	if (numero == 7) numero = 6;
	else numero = 7;
	posY -= 20;
	collision(0, +20);
}
function bas_1(){
	if (numero == 5) numero = 4;
	else numero = 5;
	posY += 20;
	collision(0, -20);
}
function bombe_p1(){
	if (bomb == false) {
		bomb = true;
		bombY1 = posY;
		bombX1 = posX;
	}
}
function droite_2(){
    if (numero2 == 3) numero2 = 2;
			else numero2 = 3;
			posX2 += 20;
			collision2(-20,0);
}
function gauche_2()
{
	if (numero2 == 1) numero2 = 0;
			else numero2 = 1;
			posX2 -= 20;
			collision2(+20, 0);
}
function haute_2()
{
	if (numero2 == 7) numero2 = 6;
	else numero2 = 7;
	posY2 -= 20;
	collision2(0, +20);
}
function bas_2(){
	if (numero2 == 5) numero2 = 4;
	else numero2 = 5;
	posY2 += 20;
	collision2(0, -20);
}
function bombe_p2(){
	if (bomb2 == false) {
		bomb2 = true;
		bombY2 = posY2;
		bombX2 = posX2;
	}
}

//rendu incrémentale
function game1(){ 
    let vr,vb,vd,vh,vba,vg;
    setTimeout(function(){ vr =  setInterval(bas_1,500); }, 1000);    
    setTimeout(function(){ clearInterval(vr) }, 7000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 7000);    
    setTimeout(function(){ clearInterval(vb) }, 8000);
    setTimeout(function(){ vr =  setInterval(bas_1,500); }, 8000);    
    setTimeout(function(){ clearInterval(vr) }, 12000);
    setTimeout(function(){ vd =  setInterval(droite_1,500); }, 11000);    
    setTimeout(function(){ clearInterval(vd) }, 13000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 13000);    
    setTimeout(function(){ clearInterval(vb) }, 14000);
    setTimeout(function(){ vd =  setInterval(droite_1,500); }, 14000);    
    setTimeout(function(){ clearInterval(vd) }, 18000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 18000);    
    setTimeout(function(){ clearInterval(vb) }, 19000);
    setTimeout(function(){ vd =  setInterval(droite_1,500); }, 19000);    
    setTimeout(function(){ clearInterval(vd) }, 23000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 23000);    
    setTimeout(function(){ clearInterval(vb) }, 24000);
    setTimeout(function(){ vh =  setInterval(haute_1,500); }, 24000);    
    setTimeout(function(){ clearInterval(vh) }, 28000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 28000);    
    setTimeout(function(){ clearInterval(vb) }, 29000);
    setTimeout(function(){ vh =  setInterval(haute_1,500); }, 29000);    
    setTimeout(function(){ clearInterval(vh) }, 34000);
    setTimeout(function(){ vd =  setInterval(droite_1,500); }, 34000);    
    setTimeout(function(){ clearInterval(vd) }, 36000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 36000);    
    setTimeout(function(){ clearInterval(vb) }, 37000);
    setTimeout(function(){ vd =  setInterval(droite_1,500); }, 37000);    
    setTimeout(function(){ clearInterval(vd) }, 40000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 40000);    
    setTimeout(function(){ clearInterval(vb) }, 41000);
    setTimeout(function(){ vd =  setInterval(droite_1,500); }, 41000);    
    setTimeout(function(){ clearInterval(vd) }, 48000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 48000);    
    setTimeout(function(){ clearInterval(vb) }, 49000);
    setTimeout(function(){ vd =  setInterval(droite_1,500); }, 49000);    
    setTimeout(function(){ clearInterval(vd) }, 53000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 53000);    
    setTimeout(function(){ clearInterval(vb) }, 54000);
    setTimeout(function(){ vd =  setInterval(droite_1,500); }, 54000);    
    setTimeout(function(){ clearInterval(vd) }, 57000);
    setTimeout(function(){ vba =  setInterval(bas_1,500); }, 57000);    
    setTimeout(function(){ clearInterval(vba) }, 59000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 59000);    
    setTimeout(function(){ clearInterval(vb) }, 60000);
    setTimeout(function(){ vba =  setInterval(bas_1,500); }, 60000);    
    setTimeout(function(){ clearInterval(vba) }, 64000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 64000);    
    setTimeout(function(){ clearInterval(vb) }, 65000);
    setTimeout(function(){ vba =  setInterval(bas_1,500); }, 65000);    
    setTimeout(function(){ clearInterval(vba) }, 69000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 69000);    
    setTimeout(function(){ clearInterval(vb) }, 70000);
    setTimeout(function(){ vg =  setInterval(gauche_1,500); }, 70000);    
    setTimeout(function(){ clearInterval(vg) }, 76000);
    setTimeout(function(){ vb =  setInterval(bombe_p1,500); }, 76000);    
    setTimeout(function(){ clearInterval(vb) }, 77000);
}

function game2(){ 
    let vr,vb,vd,vh,vdr;
    setTimeout(function(){ vr =  setInterval(gauche_2,500); }, 1000);    
    setTimeout(function(){ clearInterval(vr) }, 7000);
    setTimeout(function(){ vb =  setInterval(bombe_p2,500); }, 7000);    
    setTimeout(function(){ clearInterval(vb) }, 8000);
    setTimeout(function(){ vr =  setInterval(gauche_2,500); }, 8000);    
    setTimeout(function(){ clearInterval(vr) }, 11000);
    setTimeout(function(){ vd =  setInterval(gauche_2,500); }, 11000);    
    setTimeout(function(){ clearInterval(vd) }, 13000);
    setTimeout(function(){ vb =  setInterval(bombe_p2,500); }, 13000);    
    setTimeout(function(){ clearInterval(vb) }, 14000);
    setTimeout(function(){ vd =  setInterval(gauche_2,500); }, 14000);    
    setTimeout(function(){ clearInterval(vd) }, 18000);
    setTimeout(function(){ vb =  setInterval(bombe_p2,500); }, 18000);    
    setTimeout(function(){ clearInterval(vb) }, 19000);
    setTimeout(function(){ vd =  setInterval(gauche_2,500); }, 19000);    
    setTimeout(function(){ clearInterval(vd) }, 23000);
    setTimeout(function(){ vb =  setInterval(bombe_p2,500); }, 23000);    
    setTimeout(function(){ clearInterval(vb) }, 24000);
    setTimeout(function(){ vd =  setInterval(gauche_2,500); }, 24000);    
    setTimeout(function(){ clearInterval(vd) }, 29000);
    setTimeout(function(){ vb =  setInterval(bombe_p2,500); }, 29000);    
    setTimeout(function(){ clearInterval(vb) }, 30000);
    setTimeout(function(){ vd =  setInterval(gauche_2,500); }, 30000);    
    setTimeout(function(){ clearInterval(vd) }, 34000);
    setTimeout(function(){ vh =  setInterval(haute_2,500); }, 34000);    
    setTimeout(function(){ clearInterval(vh) }, 36000);
    setTimeout(function(){ vb =  setInterval(bombe_p2,500); }, 36000);    
    setTimeout(function(){ clearInterval(vb) }, 37000);
    setTimeout(function(){ vh =  setInterval(haute_2,500); }, 37000);    
    setTimeout(function(){ clearInterval(vh) }, 40000);
    setTimeout(function(){ vb =  setInterval(bombe_p2,500); }, 40000);    
    setTimeout(function(){ clearInterval(vb) }, 41000);
    setTimeout(function(){ vh =  setInterval(haute_2,500); }, 41000);    
    setTimeout(function(){ clearInterval(vh) }, 47000);
    setTimeout(function(){ vdr =  setInterval(droite_2,500); }, 47000);    
    setTimeout(function(){ clearInterval(vdr )}, 49000);
    setTimeout(function(){ vb =  setInterval(bombe_p2,500); }, 49000);    
    setTimeout(function(){ clearInterval(vb) }, 50000);
    setTimeout(function(){ vdr =  setInterval(droite_2,500); }, 50000);    
    setTimeout(function(){ clearInterval(vdr )}, 54000);
    setTimeout(function(){ vb=  setInterval(bombe_p2,500); }, 54000);    
    setTimeout(function(){ clearInterval(vb )}, 55000);
    setTimeout(function(){ vdr =  setInterval(droite_2,500); }, 55000);    
    setTimeout(function(){ clearInterval(vdr )}, 60000);
    setTimeout(function(){ vb=  setInterval(bombe_p2,500); }, 60000);    
    setTimeout(function(){ clearInterval(vb )}, 61000);
    setTimeout(function(){ vdr =  setInterval(droite_2,500); }, 61000);    
    setTimeout(function(){ clearInterval(vdr )}, 65000);
    setTimeout(function(){ vb=  setInterval(bombe_p2,500); }, 65000);    
    setTimeout(function(){ clearInterval(vb )}, 66000);
    setTimeout(function(){ vdr =  setInterval(droite_2,500); }, 66000);    
    setTimeout(function(){ clearInterval(vdr )}, 69000);
    setTimeout(function(){ vb=  setInterval(bombe_p2,500); }, 69000);    
    setTimeout(function(){ clearInterval(vb )}, 70000);
    setTimeout(function(){ vdr =  setInterval(droite_2,500); }, 70000);    
    setTimeout(function(){ clearInterval(vdr )}, 73000);
    setTimeout(function(){ vb=  setInterval(bombe_p2,500); }, 73000);    
    setTimeout(function(){ clearInterval(vb )}, 74000);
    setTimeout(function(){ vdr =  setInterval(droite_2,500); }, 74000);    
    setTimeout(function(){ clearInterval(vdr )}, 77000);
    setTimeout(function(){ vb=  setInterval(bombe_p2,500); }, 77000);    
    setTimeout(function(){ clearInterval(vb )}, 78000);
}

game1();
game2();
