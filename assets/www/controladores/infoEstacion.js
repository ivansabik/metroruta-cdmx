C_InfoEstacion = new Object();

C_InfoEstacion.dispatch = function(idEstacion) {
    usuario = SingletonUsuario.getInstance();
    usuario.infoEstacion = idEstacion;
    SingletonUsuario.save(usuario);
    var estacion = metro.buscarEstacion(idEstacion);
    $("#btnSeleccionarOrigen").live('click', function() {
        C_SeleccionarEstacion.dispatch("estacionCalcularRuta", "origen", idEstacion);
    });
    $("#btnSeleccionarDestino").live('click', function() {
        C_SeleccionarEstacion.dispatch("estacionCalcularRuta", "destino", idEstacion);
    });
    $("#icono").attr("src", "imgs/iconosGdes/"+idEstacion+".jpg");
    $("#nombreEstacion").html(estacion.nombre)
    $("#estacionSeleccionada").attr("value", idEstacion);
    $("#textoEstacion").html(metro.buscarDescripcion(idEstacion));
    $.mobile.changePage("#infoEstacion", {
        });
}