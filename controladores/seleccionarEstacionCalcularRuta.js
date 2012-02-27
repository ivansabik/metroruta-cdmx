ctrlSeleccionarEstacionCalcularRuta = new Object();

ctrlSeleccionarEstacionCalcularRuta.dispatch = function seleccionarEstacionCalcularRuta(tipoEstacion, idEstacion) {
    var estacion;
    estacion = metro.buscarEstacion(idEstacion);
    if(tipoEstacion == "origen") {
        $("#nombreEstacionOrigen").html(estacion.nombre);
        usuario.estacionOrigen = estacion;
        console.log(usuario.estacionOrigen);
    }
    else if(tipoEstacion == "destino") {
        $("#nombreEstacionDestino").html(estacion.nombre);
        usuario.estacionDestino = estacion;
        console.log(usuario.estacionDestino);
    }
    else
        throw new Exception("Opción no definida");
}