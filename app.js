var App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter;

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

App.MapaRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({lineas: this.store.find('linea')});
    },
    setupController: function (controller, model) {
        controller.set('model', model);       
    }
});

App.LineasRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({lineas: this.store.find('linea')});
    }
});

App.Estacion = DS.Model.extend({
  nombre:  DS.attr('string'),
  latitud: DS.attr('number'),
  longitud: DS.attr('number'),
  icono: DS.attr('string')
});

App.Linea = DS.Model.extend({
  nombre:  DS.attr('string'),
  colorHex: DS.attr('string'),
  icono: DS.attr('string'),
  estaciones: DS.hasMany('estacion', {async:true})
});

App.MapData = Ember.Object.create({
	map: null
});


App.MapaView = Ember.ContainerView.extend({
  id: 'mapa',
  tagName: 'div',
  attributeBindings: ['style'],
  style: "height: 100%; margin: 0px; padding: 0px",
  map:null,
  didInsertElement: function() {
    var latlng = new google.maps.LatLng(19.42705, -99.127571);
    var mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(this.$().get(0),mapOptions);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });

    var lineas = this.get('controller.model');
    console.log(lineas)
    for(i=0; i<lineas.length; i++) {
        var color = lineas[i].colorHex;
        var estaciones = lineas[i].estaciones;
        var coordenadasLineas = new Array();
        for(j=0; j<estaciones.length; j++) {
            coordenadasLineas[j] =  new google.maps.LatLng(estaciones[j].latitud, estaciones[j].longitud);
            var image = 'imgs/iconosEstaciones/'+estaciones[j].id+'.png';
            var marcadorEstacion = new google.maps.Marker({
                position: coordenadasLineas[j],
                map: map,
                icon: image
            });
            marcadorEstacion.idEstacion = estaciones[j].id;
            marcadorEstacion.iconoEstacion = estaciones[j].icono;
            marcadorEstacion.nombreEstacion = estaciones[j].nombre;                        
        }
        var caminoLinea = new google.maps.Polyline({
            path: coordenadasLineas,
            strokeColor: color,
            strokeOpacity: 0.6,
            strokeWeight: 10
        });
        caminoLinea.setMap(map);
    }
    this.set("map", map);
  }
});
