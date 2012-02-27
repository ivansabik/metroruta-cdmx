function seleccionarEstacionMasCercana(tipoEstacion) {
    alert("llamada!");
    navigator.geolocation.getCurrentPosition(seleccionarEstacionCercana, errorCoordenadas);

    function seleccionarEstacionCercana(location) {
        var latitud = location.coords.latitude;
        var longitud = location.coords.longitude;
        var estacionesCercanas = metro.buscaEstacionesCercanas(latitud, longitud);
        var estacion = estacionesCercanas[0];
        if(tipoEstacion == "origen") {
            $("#nombreEstacionOrigen").html(estacion.nombre);
        }
        else if(tipoEstacion == "destino") {
            $("#nombreEstacionDestino").html(estacion.nombre);
        }
    }

    function errorCoordenadas() {
        $("#listaEstacionesCercanas").empty().html("No es posible obtener tu ubicación actual");
    }
}