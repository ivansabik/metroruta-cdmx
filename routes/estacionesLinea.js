// Mostrar estaciones de una linea especifica
$(document).on('pagebeforeshow', '#estacionesLinea', function() {
  var htmlEstaciones = '';
  linea = lineas({
    id: lineaSeleccionada
  }).first();
  var estaciones = linea.estaciones;
  for (j = 0; j < estaciones.length; j++) {
    htmlEstaciones += '<li><a href="#"><img src="' + estaciones[j].icono + '" class="ui-li-icon"" /><span>' + estaciones[j].nombre + '</span></a></li>';
  }
  $('#listaEstacionesLinea').trigger('create');
  $('#listaEstacionesLinea').empty();
  $('#listaEstacionesLinea').append(htmlEstaciones).listview('refresh');
});
