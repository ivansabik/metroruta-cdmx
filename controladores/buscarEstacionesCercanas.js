C_BuscarEstacionesCercanas = new Object();

C_BuscarEstacionesCercanas.dispatch = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas);
    } else {
        errorGeolocalizacion();
    }
    function exitoCoordenadas(location) {
        var estaciones = metro.buscarEstacionesCercanas(location.coords.latitude, location.coords.longitude);
        var htmlEstacionesCercanas = "";
        for(var i = 0; i < estaciones.length; i++) {
            htmlEstacionesCercanas += '<li><a href="#" onclick="C_InfoEstacion.dispatch('+estaciones[i].estacion.id+')"><img src="'+estaciones[i].estacion.icono+'" class="ui-li-icon"/><h6>'+estaciones[i].estacion.nombre+'</h6>'+estaciones[i].distancia+' km.</a></li>';
        }
        $("#listaEstacionesCercanas").html(htmlEstacionesCercanas);
        $.mobile.changePage("#estacionesCercanas", {
        });
        $("#listaEstacionesCercanas").listview('refresh');
    }
}
               
function errorCoordenadas() {
    $("#mensajeError").html("<h4>No se pudo obtener tu ubicación. Intenta nuevamente.</h4>");
    $.mobile.changePage("#error", {
    });
}
function errorGeolocalizacion() {
    $("#mensajeError").html("<h4>No se puedo acceder a mecanismo o dispositivo de geolocalización.</h4>");
    $.mobile.changePage("#error", {
    });
}

