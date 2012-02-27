function seleccionarEstacionCalcularRuta(tipoEstacion, idEstacion) {
    var estacion;
    estacion = metro.buscarEstacion(idEstacion);
    if(tipoEstacion == "origen") {
        $("#nombreEstacionOrigen").html(estacion.nombre);
    }
    else if(tipoEstacion == "destino") {
        $("#nombreEstacionDestino").html(estacion.nombre);
    }
    else
        throw new Exception("Opcion no definida");
}