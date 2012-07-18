C_InfoEstacion = new Object();

C_InfoEstacion.dispatch = function(idEstacion) {
    var estacion = metro.buscarEstacion(idEstacion);
    $("#icono").attr("src", "imgs/iconosGdes/"+idEstacion+".jpg");
    $("#nombreEstacion").html(estacion.nombre)
    $("#btnSeleccionarOrigen").live("click", function(){
        C_SeleccionarEstacion.dispatch('estacionCalcularRuta', 'origen', estacion.id)
    });
    $("#btnSeleccionarDestino").live("click", function(){
        C_SeleccionarEstacion.dispatch('estacionCalcularRuta', 'destino', estacion.id)
    });
    $("#btnMostrarMapa").live("click", function(){
        C_MostrarMapa.dispatch(idEstacion);
    });
    $("#textoEstacion").html(metro.buscarDescripcion(idEstacion));
    $.mobile.changePage("#infoEstacion", {
        });
}