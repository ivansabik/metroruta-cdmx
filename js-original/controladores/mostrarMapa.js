C_MostrarMapa = new Object();

C_MostrarMapa.dispatch = function(latitud, longitud) {
    if(latitud == "" || longitud == "") {
        latitud = 19.42705;
        longitud = -99.127571;
    }
    var latlng = new google.maps.LatLng(latitud, longitud);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	

    // Marca posicion
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });

    // Dibuja lineas y marca estaciones
    var lineas = metro.lineas;
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
            google.maps.event.addListener(marcadorEstacion, 'click', function() {
                $("#tituloDialogoEstacion").html('<img src="'+this.iconoEstacion+'" class="ui-li-icon" />  '+this.nombreEstacion);
                $("#iconoEstacion").attr("src", "imgs/iconosGdes/"+this.idEstacion+".jpg");
                $("#textoEstacion2").html(metro.buscarDescripcion(this.idEstacion));
                var idEstacionSeleccion = this.idEstacion;
                $("#btnSeleccionarOrigen2").live('click', function() {
                    C_SeleccionarEstacion.dispatch("estacionCalcularRuta", "origen", idEstacionSeleccion);
                });
                $("#btnSeleccionarDestino2").live('click', function() {
                    C_SeleccionarEstacion.dispatch("estacionCalcularRuta", "destino", idEstacionSeleccion);
                });
                $.mobile.changePage("#seleccionarEstacion", {
                    transition: "slideup"
                } );
            });                         
        }
        var caminoLinea = new google.maps.Polyline({
            path: coordenadasLineas,
            strokeColor: color,
            strokeOpacity: 0.6,
            strokeWeight: 10
        });
        caminoLinea.setMap(map);
    }
}


