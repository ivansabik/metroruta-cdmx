Metroruta.Router.map(function() {
    this.route('menu');
    this.route('mapa');
    this.route('lineas');
    this.resource('estacion', { path: '/estacion' }, function() {
        this.route('info', { path: '/:id_estacion' });
        this.route('buscar');
        this.route('cercanas');
    });
    
    this.resource('ruta', { path: '/ruta' }, function() {
        this.route('armar');
        this.route('calcular/:id_origen/:id_destino');
    });
    
});
