// Ruta para mostrar mapa
$(document).on('pagebeforeshow', '#mapa', function(event) {
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

$(document).on('pageshow', '#mapa', function(event) {
    google.maps.event.trigger(mapa, 'resize');
});

// Ruta para mostrar lineas
$(document).on('pagebeforeshow', '#lineas', function(event) {
  var htmlLineas = '';
  $('#listaLineas').trigger('create');
  $('#listaLineas').empty();
  lineas().each(function(linea, numLinea) {
    htmlLineas += '<li>';
    htmlLineas += '<a href="#">';
    htmlLineas += '<img src="' + linea.icono + '"/>';
    htmlLineas += '<h4>' + linea.nombre + '</h4>';
    htmlLineas += '</a>';
    htmlLineas += '</li>';
  });
  $('#listaLineas').append(htmlLineas).listview('refresh');
});
