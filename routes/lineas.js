// Mostrar lineas
$(document).on('pagebeforeshow', '#lineas', function() {
  var htmlLineas = '';
  lineas().each(function(linea, numLinea) {
    htmlLineas += '<li>';
    htmlLineas += '<a class="linkEstacionesLinea" href="#estacionesLinea" id="' + linea.id + '">';
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
