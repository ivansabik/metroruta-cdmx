C_SeleccionarEstacion = new Object();
C_SeleccionarEstacion.tipoSeleccion;
C_SeleccionarEstacion.tipoEstacion;
C_SeleccionarEstacion.idEstacion;

C_SeleccionarEstacion.dispatch = function(tipoSeleccion, tipoEstacion, idEstacion) {
    this.tipoSeleccion = tipoSeleccion;
    this.tipoEstacion = tipoEstacion;
    this.idEstacion = idEstacion;
    
    if(tipoSeleccion == "estacionCalcularRuta") { 
        usuario = SingletonUsuario.getInstance();
        var estacion = metro.buscarEstacion(idEstacion);
        if(tipoEstacion == "origen") {
            usuario.estacionOrigen = estacion;
            SingletonUsuario.save(usuario);
            $.mobile.changePage("#estacionSeleccionada", {
                });
        }
        else if(tipoEstacion == "destino") {
            usuario.estacionDestino = estacion;
            SingletonUsuario.save(usuario);
            $.mobile.changePage("#estacionSeleccionada", {
                });
        }
    }
    else if(tipoSeleccion == "estacionMasCercana") {
        if(tipoEstacion == "origen") {
            this.cercanaOrigen();
        }
        else if(tipoEstacion == "destino") {
            this.cercanaDestino();
        }
        else {
            throw "Opción no existe";
        }
    }
    else {
        throw "Opción no existe";
    }
}

C_SeleccionarEstacion.cercanaOrigen = function cercanaOrigen(){
    navigator.geolocation.getCurrentPosition(exitoCoordenadas, C_SeleccionarEstacion.errorGeolocalizacion());
    function exitoCoordenadas(location) {
        var estaciones = metro.buscarEstacionesCercanas(location.coords.latitude, location.coords.longitude);
        $("#nombreEstacionOrigen").html('<img src="'+estaciones[0].estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estaciones[0].estacion.nombre);
        usuario = SingletonUsuario.getInstance();
        usuario.estacionOrigen = estaciones[0].estacion;
        SingletonUsuario.save(usuario);
        $.mobile.changePage("#estacionSeleccionada", {
            transition: "pop"
        });
    }
}
                
C_SeleccionarEstacion.cercanaDestino = function cercanaDestino(){
    navigator.geolocation.getCurrentPosition(exitoCoordenadas, C_SeleccionarEstacion.errorGeolocalizacion());
    function exitoCoordenadas(location) {
        var estaciones = metro.buscarEstacionesCercanas(location.coords.latitude, location.coords.longitude);
        $("#nombreEstacionDestino").html('<img src="'+estaciones[0].estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estaciones[0].estacion.nombre);
        usuario = SingletonUsuario.getInstance();
        usuario.estacionDestino = estaciones[0].estacion;
        SingletonUsuario.save(usuario);
        $.mobile.changePage("#estacionSeleccionada", {
            transition: "pop"
        });
    }
}
            
C_SeleccionarEstacion.errorCoordenadas = function errorCoordenadas() {
    $("#mensajeError").html("<h4>No se pudo obtener tu ubicación. Intenta nuevamente.</h4>");
    $.mobile.changePage("#error", {
        transition: "pop"
    });
}

C_SeleccionarEstacion.errorGeolocalizacion = function errorGeolocalizacion() {
    $("#mensajeError").html("<h4>No se puedo acceder a mecanismo o dispositivo de geolocalización.</h4>");
    $.mobile.changePage("#error", {
        transition: "pop"
    });
}
