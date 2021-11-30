export {
	tilemap_loaded,
	tileset_loaded,
	cam_x,
	cam_y,
	map_cnv,
	posbloc,
	posBuisson,
};

let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');

let map_cnv = document.createElement('canvas');
let tilemap;
let tilemap_loaded = 0;
let tileset;
let tileset_loaded = 0;
let tileset_elts = [];
let cam_x = 0;
let cam_y = 0;
let zoom = 10;
let posbloc = [];
let posBuisson = [];

export default function onload_tilemap() {
	if (this.status == 200) {
		tilemap_loaded = 1;
		tilemap = JSON.parse(this.responseText);
		tileset = new Image();
		tileset.src = tilemap['tilesets'][0]['image'];
		tileset.onload = function () {
			tileset_loaded = 1;

			let tileset_imageheight = tilemap['tilesets'][0]['imageheight'];
			let tileset_imagewidth = tilemap['tilesets'][0]['imagewidth'];
			let tileset_tileheight = tilemap['tilesets'][0]['tileheight'];
			//Je multiplie par zoom pour aggrandir l'image
			let map_height = tilemap['height'] * zoom;
			let map_width = tilemap['width'] * zoom;
			cnv.width = map_width * 16;
			cnv.height = map_height * 16;
			map_cnv.height = map_height * tileset_tileheight;
			map_cnv.width = map_width * tileset_tileheight;
			let map_ctx = map_cnv.getContext('2d');

			let layer0_data = tilemap['layers'][0]['data'];
			let layer0_height = tilemap['layers'][0]['height'];
			let layer0_width = tilemap['layers'][0]['width'];

			let layer1_data = tilemap['layers'][1]['data'];
			let layer1_height = tilemap['layers'][1]['height'];
			let layer1_width = tilemap['layers'][1]['width'];

			let layer2_data = tilemap['layers'][2]['data'];
			let layer2_height = tilemap['layers'][2]['height'];
			let layer2_width = tilemap['layers'][2]['width'];


			let canvas = document.createElement('canvas');
			canvas.height = tileset_imageheight;
			canvas.width = tileset_imagewidth;
			let context = canvas.getContext('2d');

			context.drawImage(tileset, 0, 0, tileset.width, tileset.height);
			for (
				let ih = 0, nh = tileset_imageheight;
				ih < nh;
				ih += tileset_tileheight
			) {
				for (
					let iw = 0, nw = tileset_imagewidth;
					iw < nw;
					iw += tileset_tileheight
				) {
					let canvas2 = document.createElement('canvas');
					canvas2.height = tileset_tileheight;
					canvas2.width = tileset_tileheight;
					let context2 = canvas2.getContext('2d');
					let canvasImageData = context.getImageData(
						iw,
						ih,
						tileset_tileheight,
						tileset_tileheight
					);
					let canvasData = canvasImageData.data;
					let canvasImageData2 = context2.getImageData(
						0,
						0,
						tileset_tileheight,
						tileset_tileheight
					);
					let canvasData2 = canvasImageData2.data;
					for (let i = 0, n = canvasData.length; i < n; i += 3) {
						canvasData2[i] = canvasData[i];
						canvasData2[i + 1] = canvasData[i + 1];
						canvasData2[i + 2] = canvasData[i + 2];
					}
					context2.putImageData(canvasImageData2, 0, 0);
					tileset_elts.push(canvas2);
				}
			}

			let layer0_data_i = 0;
			//dessin de la map
			for (let ih = 0, nh = layer0_height; ih < nh; ih += 1) {
				for (let iw = 0, nw = layer0_width; iw < nw; iw += 1) {
					if (layer0_data[layer0_data_i] > 0) {
						map_ctx.drawImage(
							tileset_elts[layer0_data[layer0_data_i] - 1],
							iw * (16 * zoom),
							ih * (16 * zoom),
							16 * zoom,
							16 * zoom
						);
					}
					layer0_data_i += 1;
				}
			}
			let layer1_data_i = 0;
			//dessin des blocs
			for (let ih = 0, nh = layer1_height; ih < nh; ih += 1) {
				for (let iw = 0, nw = layer1_width; iw < nw; iw += 1) {
					if (layer1_data[layer1_data_i] > 0) {
						map_ctx.drawImage(
							tileset_elts[layer1_data[layer1_data_i] - 1],
							iw * (16 * zoom),
							ih * (16 * zoom),
							16 * zoom,
							16 * zoom
						);
						posbloc.push([
							iw * (16 * zoom),
							ih * (16 * zoom),
							16 * zoom,
							16 * zoom,
						]);
					}
					layer1_data_i += 1;
				}
			}
			//dessin des buissons
			let layer2_data_i = 0;
			for (let ih = 0, nh = layer2_height; ih < nh; ih += 1) {
				for (let iw = 0, nw = layer2_width; iw < nw; iw += 1) {
					if (layer2_data[layer2_data_i] > 0) {
						map_ctx.drawImage(
							tileset_elts[layer2_data[layer2_data_i] - 1],
							iw * (16 * zoom),
							ih * (16 * zoom),
							16 * zoom,
							16 * zoom
						);
						posBuisson.push([
							iw * (16 * zoom),
							ih * (16 * zoom),
							16 * zoom,
							16 * zoom,
						]);
					}
					layer2_data_i += 1;
				}
			}
		};
	}
}

let xobj = new XMLHttpRequest();
xobj.onload = onload_tilemap;
xobj.overrideMimeType('application/json');
xobj.open('GET', 'tilemaps/map.json', true);
xobj.send();
