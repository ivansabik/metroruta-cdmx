C_InfoEstacion = new Object();

C_InfoEstacion.dispatch = function(idEstacion) {
    var estacion = metro.buscarEstacion(idEstacion);
    var htmlInfoEstacion = "";
    htmlInfoEstacion += '<li><img src="'+estacion.icono+'" class="ui-li-icon" /><h1>'+estacion.nombre+"</h1></li>";
    htmlInfoEstacion += '<li><a href="#" onClick="C_SeleccionarEstacionCalcularRuta.dispatch(\'origen\', '+estacion.id+')"><span>Seleccionar como origen</span></a></li>';
    htmlInfoEstacion += '<li><a href="#" onClick="C_SeleccionarEstacionCalcularRuta.dispatch(\'destino\', '+estacion.id+')"><span>Seleccionar como destino</span></a></li>';
    htmlInfoEstacion += '<li><a href="#" >Mostrar en mapa</a></li>';
    $("#listaInfoEstacion").html(htmlInfoEstacion);
    $.mobile.changePage("#infoEstacion", {
        });
    $("#listaInfoEstacion").listview('refresh');
}