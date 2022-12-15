

const imagen = document.getElementById('testImg');
const output = document.getElementById('salida');
const metaData = document.getElementById('metaData');
const red = [];
const green = [];
const blue = [];
const alpha = [];
const idLinksImages = ["gJ8gwC8Q", "xdkxQJC0", "3xxfLbQ0", "zXjPFY61", "fRq21jM2", "0NLtykM7", "6qKYCMh3"];
var contador = 0;

var imageList = Array();

fetch('json/imagen1.json')
	.then((response) => {
		return response.json(); 
	})
	.then((json) => metaData.innerHTML = 
	"Nombre: " + json.nombre + "<br>Formato: " + json.formato + "<br>Peso: "+ json.peso+ "<br>Url: "+json.url+ "<br>Resolución: "+json.res+ "<br>Descripción: "+ json.des + "<br>Fecha de creación: "+json.date);

for (var i = 1; i <= 7; i++) {
	imageList[i] = new Image(70, 70);
	imageList[i].src = "https://i.postimg.cc/" + idLinksImages[i-1] + "/" +i+ ".jpg";
	
}
function switchImage() {
	var selectedImage = document.myForm.switch.options[document.myForm.switch.selectedIndex].value;
	
	document.myImage.src = imageList[selectedImage].src;

	
	fetch('json/imagen' + (selectedImage)+'.json')
	.then((response) => {
		return response.json(); 
	})
	.then((json) => metaData.innerHTML= "Nombre: " + json.nombre + "<br>Formato: " + json.formato + "<br>Peso: "+ json.peso+ "<br>Url: "+json.url+ "<br>Resolución: "+json.res+ "<br>Descripción: "+ json.des + "<br>Fecha de creación: "+json.date);
	//document.getElementById('metaData').innerHTML='regeStr';
}




imagen.addEventListener('click', function (e) {
	const red = [];
	const green = [];
	const blue = [];
	const alpha = [];
	let ctx;


	if (!this.canvas) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		ctx = this.canvas.getContext('2d');
		ctx.drawImage(this, 0, 0, this.width, this.height);
	} else {
		ctx = this.canvas.getContext('2d');
	}
	const pixel = ctx.getImageData(e.offsetX, e.offsetY, 5, 5).data;

	for (let i = 0; i < pixel.length; i++) {
		red[contador] = pixel[i];
		i += 1;
		green[contador] = pixel[i];
		i += 1;
		blue[contador] = pixel[i];
		i += 1;
		alpha[contador] = pixel[i];
		contador += 1;
	}
	var traceRed = {
		x: red,
		type: 'histogram',
		name: "Rojo",
		marker: {
			color: 'red',
		},
	};
	var traceGreen = {
		x: green,
		type: 'histogram',
		name: "Verde",
		marker: {
			color: 'green',
		},
	};
	var traceBlue = {
		x: blue,
		type: 'histogram',
		name: "Azul",
		marker: {
			color: 'blue',
		},
	};

	var layout = {
		autosize: false,
		width: 500,
		height: 300,
	};
	var data1 = [traceRed];
	var data2 = [traceGreen];
	var data3 = [traceBlue];
	Plotly.newPlot('barraRoja', data1, layout);
	Plotly.newPlot('barraVerde', data2, layout);
	Plotly.newPlot('barraAzul', data3, layout);

});


