ctrlSeleccionarEstacionMasCercana = new Object();

ctrlSeleccionarEstacionMasCercana.dispatch = function(tipoEstacion) {
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
        $("#nombreEstacionOrigen").html(estaciones[0].estacion.nombre);
        usuario.estacionOrigen = estaciones[0].estacion;
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
        $("#nombreEstacionDestino").html(estaciones[0].estacion.nombre);
        usuario.estacionDestino = estaciones[0].estacion;
    }
}
            
function errorCoordenadas(resultado) {
    alert(resultado);
}
function errorGeolocalizacion(resultado) {
    alert(resultado);
}