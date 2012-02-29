C_CalcularRuta = new Object();

C_CalcularRuta.dispatch = function() {
    if(!usuario.estacionOrigen)
        $("#mensajeError").html(resultado);
    else if(!usuario.estacionDestino)
        $("#mensajeError").html(resultado);
    else {
        var estacionOrigenRuta = usuario.estacionOrigen;
        var estacionDestino = usuario.estacionOrigen;
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
        var htmlListaInstrucciones = '<h5><img src="'+estacionOrigenRuta.icono+'"/>&nbsp;&nbsp;'+estacionOrigenRuta.nombre+'&nbsp;&nbsp;-&nbsp;&nbsp;<img src="'+estacionDestino.icono+'" />&nbsp;&nbsp;'+estacionDestino.nombre+"</h5>";
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