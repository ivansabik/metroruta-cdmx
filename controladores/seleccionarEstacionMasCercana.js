C_SeleccionarEstacionMasCercana = new Object();

C_SeleccionarEstacionMasCercana.dispatch = function(tipoEstacion) {
    if(tipoEstacion == "origen")
        cercanaOrigen();
    else if(tipoEstacion == "destino")
        cercanaDestino();
    else
        throw new Excepction("Opción no existe");
}

function cercanaOrigen(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas);
    } else {
        errorGeolocalizacion();
    }
    function exitoCoordenadas(location) {
        var estaciones = metro.buscarEstacionesCercanas(location.coords.latitude, location.coords.longitude);
        $("#nombreEstacionOrigen").html('<img src="'+estaciones[0].estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estaciones[0].estacion.nombre);
        usuario.estacionOrigen = estaciones[0].estacion;
        $.mobile.changePage("#calcularRuta", {
            transition: "pop"
        });
    }
}
                
function cercanaDestino(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas);
    } else {
        errorGeolocalizacion();
    }
    function exitoCoordenadas(location) {
        var estaciones = metro.buscarEstacionesCercanas(location.coords.latitude, location.coords.longitude);
        $("#nombreEstacionDestino").html('<img src="'+estaciones[0].estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estaciones[0].estacion.nombre);
        usuario.estacionDestino = estaciones[0].estacion;
        $.mobile.changePage("#calcularRuta", {
            transition: "pop"
        });
    }
}
            
function errorCoordenadas() {
    $("#mensajeError").html("<h4>No se pudo obtener tu ubicación. Intenta nuevamente.</h4>");
    $.mobile.changePage("#error", {
        transition: "pop"
    });
}
function errorGeolocalizacion() {
    $("#mensajeError").html("<h4>No se puedo acceder a mecanismo o dispositivo de geolocalización.</h4>");
    $.mobile.changePage("#error", {
        transition: "pop"
    });
}
