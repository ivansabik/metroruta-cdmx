// Mostrar estaciones con opcion de filtar por texto de busqueda
$(document).on('pagebeforeshow', '#estaciones', function() {
  var htmlEstaciones = '';

  lineas().each(function(linea, numLinea) {
    htmlEstaciones += '<li data-role="list-divider">' + linea.nombre + '</li>';
    var estaciones = linea.estaciones;
    for (i = 0; i < estaciones.length; i++) {
      htmlEstaciones += '<li><a href="#"><img src="' + estaciones[i].icono + '"/><span>' + estaciones[i].nombre + '</span></a></li>';
    }
  });

  $('#listaEstaciones').trigger('create');
  $('#listaEstaciones').empty();
  $('#listaEstaciones').append(htmlEstaciones).listview('refresh');
});
