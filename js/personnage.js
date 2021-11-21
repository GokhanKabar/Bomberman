export {all_img, numero, posX, posY, bomb, red, carrepox, carreposy};

let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
ctx.imageSmoothingEnabled = false;
let all_img = [];
let img = new Image();
img.src = './tilesets/bomberman.png';
let numero = 8;
let posX = 50;
let posY = 50;
let carreposy = 150;
let carrepox = 150;
let red = '#f00020';
let bomb = false;

img.onload = function () {
	let canvas1 = document.createElement('canvas');
	canvas1.width = 61.5 * 2;
	canvas1.height = 64 * 5;
	let context1 = canvas1.getContext('2d');
	context1.drawImage(img, 0, 0, 61.5 * 2, 64 * 5);
	for (let j = 0; j < 5; j += 1) {
		for (let i = 0; i < 2; i += 1) {
			let canvasImageData1 = context1.getImageData(i * 61.5, j * 64, 61.5, 64);
			let canvas2 = document.createElement('canvas');
			canvas2.width = 61.5;
			canvas2.height = 64;
			let context2 = canvas2.getContext('2d');
			context2.putImageData(canvasImageData1, 0, 0);
			all_img.push(canvas2);
		}
	}
};
