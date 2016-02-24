// Configuraciones globales
lineaSeleccionada = false;
estacionOrigen = false;
estacionDestino = false;
LATITUD_DEFAULT = 19.42705;
LONGITUD_DEFAULT = -99.127571;

var store = new StickyStore();

// Obtiene ubicacion y guarda para que este disponible para todas las rutas
$(document).on('mobileinit', function() {
  $.geo("locate", function(position) {
      store.set('latitudUsuario', position.coords.latitude);
      store.set('longitudUsuario', position.coords.longitude);
    },
    function(error, message) {
      store.set('latitudUsuario', '');
      store.set('longitudUsuario', '');
      alert(message);
    });
});
