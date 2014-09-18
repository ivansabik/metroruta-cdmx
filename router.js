// router.js

(function () {
    Metroruta.Router.map(function() {
      this.route('menu');
      this.route('mapa');
      this.route('lineas');
      this.route('buscar-estacion');
      this.route('info-estacion');
      this.route('ruta-armar');
      this.route('ruta-calcular');
      this.route('estaciones-cercanas');
    });
    
    Metroruta.MenuRoute.extend({
		templateName: 'menu',
		controllerName: 'menu'
	});
    
    Metroruta.MapaRoute.extend({
		templateName: 'mapa',
		controllerName: 'mapa'
	});
    
    Metroruta.LineasRoute.extend({
		templateName: 'lineas',
		controllerName: 'lineas'
	});
    
    Metroruta.EstacionRoute = Todos.TodosRoute.extend({
		templateName: 'estacion',
		controllerName: 'menu'
	});
    
    
})();
