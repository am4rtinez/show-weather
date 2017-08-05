var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

function initmap() {
	/*
	 * 1- 2512989 - Palma - MALLORCA
	 * 2- 2514097 - Marratxi - MALLORCA
	 * 3- 2520493 - Calvia - MALLORCA
	 * 4- 2514216 - Manacor - MALLORCA
	 * 5- 3124967 - Ciutadella - MENORCA
	 * 6- 2514301 - Mao - MENORCA
	 * 7- 2516479 - Eivissa - EIVISSA
	 * 8- 2521741 - Andratx - MALLORCA
	 * 9- 2516452 - Inca - MALLORCA
	 * 10- 2510821 - Soller - MALLORCA
	 * 11- 2512432 - Pollença - MALLORCA
	 * 12- 2521534 - Arta - MALLORCA
	 * 13- 2511106 - Santanyi - MALLORCA
	 * 14- 2514984 - Llucmajor - MALLORCA
	 * 15- 2522259 - Alaior - MENORCA
	 * 16- 2513922 - Es Mercadal - MENORCA
	 * 17- 2511448 - Sant Antoni de Portmany - EIVISSA
	 * 18- 2511381 - Sant Francesc de Formentera - FORMENTERA
	 * 19- 2511162 - Santa Eulalia des Riu - EIVISSA
	*/
	var cityIDs = "2512989,2514097,2520493,2514216,3124967,2514301,2516479,"
		+ "2521741,2516452,2510821,2512432,2521534,2511106,2514984,2522259,2513922,"
		+ "2511448,2511381,2511162";

	var mymap = L.map('map').setView([39.3694, 2.8502], 9);
	//light_nolabels
	//dark_nolabels
	//light_all
	//dark_all
	//base-eco
	L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
		maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
	}).addTo(mymap);

	/*L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png', {
		maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
	}).addTo(mymap);*/

	var temp = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=d22d9a6a3ff2aa523d5917bbccc89211&lang=es', {
		maxZoom: 18,
	  attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  id: 'temp'
	}).addTo(mymap);

	$.getJSON('http://openweathermap.org/data/2.5/group?id='+cityIDs+'&units=metric&lang=es&appid=b1b15e88fa797225412429c1c50c122a1', function(data) {
		ponerMarkers(data);
	});

	ponerLeyenda();

	function ponerMarkers(json){
		$.each(json.list, function(j, item){
			//console.log(item);
			var name = item.name;
			var lat = item.coord.lat;
			var lon = item.coord.lon;
			var temperatura = Math.floor(item.main.temp);

			//Genera el div del Tooltip.
			var string = "<div class='row weather-data'>";
			if (temperatura <= -50){
				string = string + "<span class = 'temp c-min-50'>";
			} else if (temperatura > -50 && temperatura <= -45) {
				string = string + "<span class = 'temp c-min-45'>";
			} else if (temperatura > -45 && temperatura <= -40) {
				string = string + "<span class = 'temp c-min-40'>";
			} else if (temperatura > -45 && temperatura <= -40) {
				string = string + "<span class = 'temp c-min-40'>";
			} else if (temperatura > -40 && temperatura <= -35) {
				string = string + "<span class = 'temp c-min-35'>";
			} else if (temperatura > -35 && temperatura <= -30) {
				string = string + "<span class = 'temp c-min-30'>";
			} else if (temperatura > -30 && temperatura <= -25) {
				string = string + "<span class = 'temp c-min-25'>";
			} else if (temperatura > -25 && temperatura <= -20) {
				string = string + "<span class = 'temp c-min-20'>";
			} else if (temperatura > -20 && temperatura <= -15) {
				string = string + "<span class = 'temp c-min-15'>";
			} else if (temperatura > -15 && temperatura <= -10) {
				string = string + "<span class = 'temp c-min-10'>";
			} else if (temperatura > -10 && temperatura <= -5) {
				string = string + "<span class = 'temp c-min-5'>";
			} else if (temperatura > -5 && temperatura < 5) {
				string = string + "<span class = 'temp c-0'>";
			} else if (temperatura >= 5 && temperatura < 10) {
				string = string + "<span class = 'temp c-plus-5'>";
			} else if (temperatura >= 10 && temperatura < 15) {
				string = string + "<span class = 'temp c-plus-10'>";
			} else if (temperatura >= 15 && temperatura < 20) {
				string = string + "<span class = 'temp c-plus-15'>";
			} else if (temperatura >= 20 && temperatura < 25) {
				string = string + "<span class = 'temp c-plus-20'>";
			} else if (temperatura >= 25 && temperatura < 30) {
				string = string + "<span class = 'temp c-plus-25'>";
			} else if (temperatura >= 30 && temperatura < 35) {
				string = string + "<span class = 'temp c-plus-30'>";
			} else if (temperatura >= 35 && temperatura < 40) {
				string = string + "<span class = 'temp c-plus-35'>";
			} else if (temperatura >= 40 && temperatura < 45) {
				string = string + "<span class = 'temp c-plus-40'>";
			} else if (temperatura >= 45 && temperatura < 50) {
				string = string + "<span class = 'temp c-plus-45'>";
			} else if (temperatura >= 50) {
				string = string + "<span class = 'temp c-plus-50'>";
			}

			string = string +temperatura+"</span><span class='text-center city'>"+name+"</span></div>";

			var marker = L.circle([lat,lon], {
				color: 'blue',
				fillcolor: 'blue',
				fillOpacity: 1,
				radius: 200
			}).bindTooltip(string, {
				permanent: true,
				opacity: 1,
				direction: 'right',
				offset: new L.Point(0,0)
			});
			marker.addTo(mymap);
		});
	}

	function ponerLeyenda(){
		var legend = L.control({position: 'bottomright'});
		legend.onAdd = function (mymap) {
			var div = L.DomUtil.create('div', 'row control-legend');
			div.innerHTML += '<div class="color-scale-line">'
				+'<div class="scale-value min-value">'
					+'<span>-50ºC</span>'
				+'</div>'
				+'<div class="scale-value avg-value">'
					+'<span>0ºC</span>'
				+'</div>'
				+'<div class="scale-value max-value">'
					+'<span">50ºC</span>'
				+'</div>'
			+'</div>';
	    return div;
		};
		legend.addTo(mymap);
	}
}
