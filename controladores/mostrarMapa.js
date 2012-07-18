C_MostrarMapa = new Object();

C_MostrarMapa.dispatch = function(idEstacion) {
    usuario = SingletonUsuario.getInstance();
    var estacion = metro.buscarEstacion(idEstacion);
    usuario.mapaLatitud = metro.buscarEstacion(estacion.latitud);
    usuario.mapaLongitud = metro.buscarEstacion(estacion.longitud);
    SingletonUsuario.save(usuario);
    window.location = "mapa.htm"
}