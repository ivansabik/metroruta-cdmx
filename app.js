// Mostrar mapa, busca posicion actual y centra el mapa en ella
$(document).on('pagebeforeshow', '#mapa', function() {
  latitud = 19.42705;
  longitud = -99.127571;
  var latlng = new google.maps.LatLng(latitud, longitud);
  var opciones = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  mapa = new google.maps.Map(document.getElementById('contenedorMapa'), opciones);
});

$(document).on('pageshow', '#mapa', function() {
  google.maps.event.trigger(mapa, 'resize');
});

// Mostrar lineas
$(document).on('pagebeforeshow', '#lineas', function() {
  var htmlLineas = '';
  lineas().each(function(linea, numLinea) {
    htmlLineas += '<li>';
    htmlLineas += '<a class="linkEstacionesLinea" href="#estacionesLinea" id="' + linea.id +'">';
    htmlLineas += '<img src="' + linea.icono + '"/>';
    htmlLineas += '<h4>' + linea.nombre + '</h4>';
    var estaciones = linea.estaciones;
    htmlLineas += '<p>' + estaciones[0].nombre + ' - ' + estaciones[estaciones.length - 1].nombre + '</p>';
    htmlLineas += '<span class="ui-li-count">' + linea.estaciones.length + '</span>';
    htmlLineas += '</a>';
    htmlLineas += '</li>';
  });
  $('#listaLineas').trigger('create');
  $('#listaLineas').empty();
  $('#listaLineas').append(htmlLineas).listview('refresh');
});

$(document).on('click', '.linkEstacionesLinea', function() {
  lineaSeleccionada = $(this).attr('id');
});

// Mostrar estaciones de una linea especifica
$(document).on('pagebeforeshow', '#estacionesLinea', function() {
  console.log(lineaSeleccionada);
});

/*
var parameters = $(this).data("url").split("?")[1];
parameter = parameters.replace("parameter=","");


var estaciones = linea.estaciones;
htmlLineas += '<p>' + estaciones[0].nombre + ' - ' + estaciones[estaciones.length - 1].nombre + '</p>';
htmlLineas += '<span class="ui-li-count">' + linea.estaciones.length + '</span>';
htmlLineas += '<ul>';
for (j = 0; j < estaciones.length; j++) {
  htmlLineas += '<li><a href="#"><img src="' + estaciones[j].icono + '" class="ui-li-icon"" /><span>' + estaciones[j].nombre + '</span></a></li>';
}
htmlLineas += '</ul>';
htmlLineas += '</a>';
htmlLineas += '</li>';
*/
