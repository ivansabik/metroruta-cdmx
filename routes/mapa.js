// Mostrar mapa, busca posicion actual y centra el mapa en ella
$(document).on('pagebeforeshow', '#mapa', function() {
  // Mapa centrado, asigna latlon default (centro ciudad) o ubicacion del usuario
  var store = new StickyStore();

  if (store.get('latitudUsuario') != false && store.get('longitudUsuario') != false) {
    latitud = store.get('latitudUsuario');
    longitud = store.get('longitudUsuario');
  } else {
    latitud = LATITUD_DEFAULT;
    longitud = LONGITUD_DEFAULT;

  }

  var latlng = new google.maps.LatLng(latitud, longitud);
  var opciones = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  mapa = new google.maps.Map(document.getElementById('contenedorMapa'), opciones);

  // Marca ubicacion en mapa
  var marcadorPosicionActual = new google.maps.Marker({
    position: latlng,
    map: mapa
  });

  // Dibuja lineas y marca estaciones
  lineas().each(function(linea, numLinea) {
    var estaciones = linea.estaciones;
    var coordenadasLineas = new Array();
    for (j = 0; j < estaciones.length; j++) {
      coordenadasLineas[j] = new google.maps.LatLng(estaciones[j].latitud, estaciones[j].longitud);
      var icono = {
        url: estaciones[j].icono,
        scaledSize: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
      };

      var marcadorEstacion = new google.maps.Marker({
        position: coordenadasLineas[j],
        map: mapa,
        icon: icono
      });
      marcadorEstacion.idEstacion = estaciones[j].id;
      marcadorEstacion.iconoEstacion = estaciones[j].icono;
      marcadorEstacion.nombreEstacion = estaciones[j].nombre;
    }
    var caminoLinea = new google.maps.Polyline({
      path: coordenadasLineas,
      strokeColor: linea.colorHex,
      strokeOpacity: 0.6,
      strokeWeight: 10
    });
    caminoLinea.setMap(mapa);
  });
});

// Refrescar tamanio de canvas para mapa
$(document).on('pageshow', '#mapa', function() {
  google.maps.event.trigger(mapa, 'resize');
});
