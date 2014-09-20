var App = Ember.Application.create();

Ember.RSVP.configure('onerror', function(error) {
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

App.Router.map(function() {
    this.route('mapa');
    this.route('lineas');
    this.resource('estacion', { path: '/estacion' }, function() {
        this.route('buscar');
        this.route('info');
        this.route('cercanas');
    });
    this.resource('ruta', { path: '/ruta' }, function() {
        this.route('calcular');
    });
});
