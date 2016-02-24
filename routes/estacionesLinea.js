// Mostrar estaciones de una linea especifica
$(document).on('pagebeforeshow', '#estacionesLinea', function() {
  var htmlEstaciones = '';
  linea = lineas({
    id: lineaSeleccionada
  }).first();
  var estaciones = linea.estaciones;
  for (var i = 0; i < estaciones.length; i++) {
    htmlEstaciones += '<li><a href="#"><img src="' + estaciones[i].icono + '" class="ui-li-icon"" /><span>' + estaciones[i].nombre + '</span></a></li>';
  }
  $('#listaEstacionesLinea').trigger('create');
  $('#listaEstacionesLinea').empty();
  $('#listaEstacionesLinea').append(htmlEstaciones).listview('refresh');
});
