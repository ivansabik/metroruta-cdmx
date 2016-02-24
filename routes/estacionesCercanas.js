// Mostrar estaciones cercanas a la posicion actual (latlon) del usuario
$(document).on('pagebeforeshow', '#estacionesCercanas', function() {
  var store = new StickyStore();

  if (!store.get('latitudUsuario') && !store.get('longitudUsuario')) {
    alert('No se puede acceder a tu ubicacion');
  } else {

    var latitudUsuario = store.get('latitudUsuario');
    var longitudUsuario = store.get('longitudUsuario');

    // Calcula distancia entre ubicacion actual y todas las estaciones
    var estacionesCercanas = [];
    lineas().each(function(linea, numLinea) {
      var estaciones = linea.estaciones;
      for (var i = 0; i < estaciones.length; i++) {
        distancia = $.geo('distance', latitudUsuario, longitudUsuario, estaciones[i].latitud, estaciones[i].longitud);
        estacionesCercanas.push({
          linea: linea.id,
          nombreLinea: linea.nombre,
          estacion: i,
          nombreEstacion: estaciones[i].nombre,
          iconoEstacion: estaciones[i].icono,
          distancia: Math.round((distancia / 1000) * 100) / 100
        });
      }
    });
    estacionesCercanas.sort(_comparaDistancias);
    estacionesCercanas = estacionesCercanas.slice(0, 10);

    var htmlEstacionesCercanas = "";
    for (var i = 0; i < estacionesCercanas.length; i++) {
      htmlEstacionesCercanas += '<li>';
      htmlEstacionesCercanas += '<a href="#"><img src="' + estacionesCercanas[i].iconoEstacion + '"/>';
      htmlEstacionesCercanas += '<h6>' + estacionesCercanas[i].nombreEstacion + '</h6>';
      htmlEstacionesCercanas += estacionesCercanas[i].distancia + ' km';
      htmlEstacionesCercanas += '</a>';
      htmlEstacionesCercanas += '</li>';
    }

    $('#listaEstacionesCercanas').trigger('create');
    $('#listaEstacionesCercanas').empty();
    $('#listaEstacionesCercanas').append(htmlEstacionesCercanas).listview('refresh');
  }
});

function _comparaDistancias(a, b) {
  if (a.distancia < b.distancia) {
    return -1;
  } else if (a.distancia > b.distancia) {
    return 1;
  } else {
    return 0;
  }
}
