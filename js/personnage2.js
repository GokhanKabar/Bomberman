export {tabperso2};

let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
ctx.imageSmoothingEnabled = false;
let tabperso2 = [];
let img = new Image();
img.src = './tilesets/bomberman.png';

img.onload = function () {
	let canvas1 = document.createElement('canvas');
	canvas1.width = 51 * 2;
	canvas1.height = 61 * 5;
	let context1 = canvas1.getContext('2d');
	context1.drawImage(img, 0, 0, 51 * 2, 61 * 5);
	for (let j = 0; j < 5; j += 1) {
		for (let i = 0; i < 2; i += 1) {
			let canvasImageData1 = context1.getImageData(i * 51, j * 61, 51, 61);
			let canvas2 = document.createElement('canvas');
			canvas2.width = 51;
			canvas2.height = 61;
			let context2 = canvas2.getContext('2d');
			context2.putImageData(canvasImageData1, 0, 0);
			tabperso2.push(canvas2);
		}
	}
};
