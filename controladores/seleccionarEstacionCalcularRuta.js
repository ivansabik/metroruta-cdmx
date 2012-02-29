C_SeleccionarEstacionCalcularRuta = new Object();

C_SeleccionarEstacionCalcularRuta.dispatch = function(tipoEstacion, idEstacion) {
    var estacion = metro.buscarEstacion(idEstacion);
    if(tipoEstacion == "origen") {
        $("#nombreEstacionOrigen").html('<img src="'+estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estacion.nombre);
        usuario.estacionOrigen = estacion;
        $.mobile.changePage("#calcularRuta", {
        });
    }
    else if(tipoEstacion == "destino") {
        $("#nombreEstacionDestino").html('<img src="'+estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estacion.nombre);
        usuario.estacionDestino = estacion;
        $.mobile.changePage("#calcularRuta", {
        });
    }
    else
        throw new Exception("Opción no definida");
}