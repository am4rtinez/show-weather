var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

function initmap() {

	var cityIDs = "2512989,2514097,2520493,2514216,3124967,2514301,2516479";

	var mymap = L.map('map').setView([39.3694, 2.8502], 9);
	//light_nolabels
	//dark_nolabels
	//light_all
	//dark_all
	//base-eco
	L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
		maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
	}).addTo(mymap);
	L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png', {
		maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
	}).addTo(mymap);
	var temp = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=d22d9a6a3ff2aa523d5917bbccc89211&lang=es', {
		maxZoom: 18,
	  attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  id: 'temp'
	}).addTo(mymap);

	$.getJSON('http://openweathermap.org/data/2.5/group?id='+cityIDs+'&units=metric&lang=es&appid=b1b15e88fa797225412429c1c50c122a1', function(data) {
		ponerMarkers(data);
	});

	function ponerMarkers(json){
		$.each(json.list, function(j, item){
			//console.log(item);
			var name = item.name;
			var lat = item.coord.lat;
			var lon = item.coord.lon;
			var temperatura = item.main.temp;

			var circulo = L.circle([lat,lon], {
				color: 'black',
				fillcolor: 'black',
				fillOpacity: 1,
				radius: 500
			});

			//circulo.bindPopup("Temperatura: " + temperatura);
			var string = "<div class='row text-center'><span class = 'temp'>"+temperatura+"</div>";
			circulo.bindTooltip(string, {
				permanent: true,
				direction: 'right',
				offset: new L.Point(-3,-15)
			});
			circulo.addTo(mymap);
		});
	}
}
