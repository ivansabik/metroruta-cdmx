C_CalcularRuta = new Object();
C_CalcularRuta.estacionOrigenRuta;
C_CalcularRuta.estacionDestino;

C_CalcularRuta.dispatch = function() {
    // Carga usuario
    usuario = SingletonUsuario.getInstance();
    if(usuario.estacionOrigen == "" || usuario.estacionDestino == "") {
        $("#mensajeError").html(resultado);
        $.mobile.changePage("#error", {
            } );
        return;
    }
    else {
        this.estacionOrigenRuta = usuario.estacionOrigen;
        this.estacionDestino = usuario.estacionDestino;
        var ruta = metro.calcularRuta(usuario.estacionOrigen.id, usuario.estacionDestino.id);
        var puntosRuta = ruta.puntosRuta;
        var puntosAgrupadosRuta = new Array();
        for (i = 0; i < puntosRuta.length; i++) {
            if (puntosRuta[i].tipoPunto == "transbordo") {
                puntosRuta[i].instrucciones = 'En la estación '+puntosRuta[i].estacionOrigen.nombre+' transborde hacia la Línea '+puntosRuta[i].estacionDestino.idLinea+'.';
                puntosAgrupadosRuta.push(puntosRuta[i]);
            }
            else {
                var estacionOrigen = puntosRuta[i].estacionOrigen;
                var direccion = puntosRuta[i].direccion;
                for (i; i < puntosRuta.length && puntosRuta[i].tipoPunto == "tramo"; i++) {
                    }   
                i--;
                estacionDestino = puntosRuta[i].estacionDestino;
                puntosAgrupadosRuta.push({
                    tipoPunto: "tramo", 
                    estacionOrigen: puntosRuta[0].estacionOrigen, 
                    estacionDestino: estacionDestino,
                    direccion: direccion,
                    instrucciones: 'En la Línea '+estacionDestino.idLinea+' aborde la estación '+estacionOrigen.nombre+' en dirección '+ direccion +'. Continue hasta la estación '+estacionDestino.nombre+'.'
                });
            }
        }
        var htmlListaInstrucciones = '<h5><img src="'+this.estacionOrigenRuta.icono+'"/>&nbsp;&nbsp;'+this.estacionOrigenRuta.nombre+'&nbsp;&nbsp;-&nbsp;&nbsp;<img src="'+this.estacionDestino.icono+'" />&nbsp;&nbsp;'+this.estacionDestino.nombre+"</h5>";
        for(var i = 0; i < puntosAgrupadosRuta.length; i++) {
            htmlListaInstrucciones += "<li>"+puntosAgrupadosRuta[i].instrucciones+"</li>";
        }
        htmlListaInstrucciones += "<li>Tiempo aprox.: "+ruta.tiempo+" min.</li>";
        $("#listaInstrucciones").html(htmlListaInstrucciones);
        $.mobile.changePage("#instruccionesRuta", {
            } );
        $("#listaInstrucciones").listview('refresh');
    }
}