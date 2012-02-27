ctrlCalcularRuta = new Object();

ctrlCalcularRuta.dispatch = function calcularRuta() {
    if(!usuario.estacionOrigen)
        alert("No se seleccionó estación de origen");
    else if(!usuario.estacionDestino)
        alert("No se seleccionó estación destino");
    else {
        var ruta = metro.calcularRuta(usuario.estacionOrigen.id, usuario.estacionDestino.id);
        // Modifica View
        var textoInstrucciones = "";
        $.each(ruta, function(key,val){
            textoInstrucciones += "<p>"+key+": "+val+"</p>";
        });
        $("#ruta").html(textoInstrucciones);
    }
}