var cityIDs = "2512989";

$(document).ready(function(){

  $.getJSON('http://openweathermap.org/data/2.5/group?id='+cityIDs+'&units=metric&lang=es&appid=b1b15e88fa797225412429c1c50c122a1', function(data) {
		showData(data);
	});

  function showData(json){
		$.each(json.list, function(j, item){
			console.log(item);
			var name = item.name;
			var lat = item.coord.lat;
			var lon = item.coord.lon;
			var temperatura = Math.floor(item.main.temp);

      var city_name = $('<h2>');
      var city_info = $('<div>');
      var wind = $('<div>');
      var coords = $('<div>');
      var humidity = $('<div>');
      var t_max_min = $('<div>');
      var pressure = $('<div>');
      var weather = $('<div>');

      city_name.attr('class', 'text-center');
      city_info.attr('class', '.weather-city-info text-center');
      coords.attr('class','city_coords');
      wind.attr('class','wind');
      humidity.attr('class','humidity');
      t_max_min.attr('class','temperaturas');
      pressure.attr('class','pressure');
      weather.attr('class','weather-status');

      city_name.text(item.name + " " + temperatura + "ºC");
      city_name.appendTo($('.weather-city'));

      weather.html("Tiempo: " + item.weather[0].description);
      t_max_min.html("Temp mín: " + item.main.temp_min + "ºC / Temp máx: " + item.main.temp_max + "ºC");
      pressure.html("Presión átmosferica: " + item.main.pressure + "hpa");
      humidity.html("Humedad: " + item.main.humidity + "%");
      wind.html("VIENTO - Velocidad: " + item.wind.speed + "m/s / Grados: " + item.wind.deg + "º" );
      coords.text("Coordenadas (" + item.coord.lat + ", " +item.coord.lon + ").");

      weather.appendTo(city_info);
      t_max_min.appendTo(city_info);
      pressure.appendTo(city_info);
      humidity.appendTo(city_info);
      wind.appendTo(city_info);
      coords.appendTo(city_info);
      city_info.appendTo('.weather-city');

		});
  }

  initmap();

});
