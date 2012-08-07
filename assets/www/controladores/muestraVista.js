C_MuestraVista = new Object();

C_MuestraVista.dispatch = function(opcion) {
    if(opcion == "lineas") {
        this.muestraLineas();
    }
    else if(opcion == "estaciones") {
        this.muestraEstaciones();
    }
    else if(opcion == "estacionesOrigen") {
        this.muestraEstacionesOrigen();
    }
    else if(opcion == "estacionesDestino") {
        this.muestraEstacionesDestino();
    } else
        throw "Opcion no existe";
}
    
C_MuestraVista.muestraEstacionesOrigen = function() {
    var htmlEstacionesOrigen = "";
    for(i=0; i<metro.lineas.length; i++) {
        htmlEstacionesOrigen += '<li data-role="list-divider">'+metro.lineas[i].nombre+'</li>';
        estaciones = metro.lineas[i].estaciones;
        for(j=0; j<estaciones.length; j++) {
            htmlEstacionesOrigen += '<li><a href="#" onClick="C_SeleccionarEstacion.dispatch(\'estacionCalcularRuta\',\'origen\', '+estaciones[j].id+')"><img src="'+estaciones[j].icono+'" class="ui-li-icon" /><span>'+estaciones[j].nombre+'</span></a></li>';
        }        
    }
    $('#listaEstacionesOrigen').html(htmlEstacionesOrigen);
    $.mobile.changePage("#seleccionarOrigen", {
        });
    $("#listaEstacionesOrigen").listview('refresh');
}

C_MuestraVista.muestraEstacionesDestino = function() {
    var htmlEstacionesDestino=  "";
    for(i=0; i<metro.lineas.length; i++) {
        htmlEstacionesDestino += '<li data-role="list-divider">'+metro.lineas[i].nombre+'</li>';
        estaciones = metro.lineas[i].estaciones;
        for(j=0; j<estaciones.length; j++) {
            htmlEstacionesDestino += '<li><a href="#" onClick="C_SeleccionarEstacion.dispatch(\'estacionCalcularRuta\',\'destino\', '+estaciones[j].id+')"><img src="'+estaciones[j].icono+'" class="ui-li-icon" /><span>'+estaciones[j].nombre+'</span></a></li>';
        }
    }
    $('#listaEstacionesDestino').html(htmlEstacionesDestino);
    $.mobile.changePage("#seleccionarDestino", {
        });
    $("#listaEstacionesDestino").listview('refresh');
}
   
C_MuestraVista.muestraEstaciones = function() {
    var htlmListaEstaciones = ""; 
    for(i=0; i<metro.lineas.length; i++) {
        htlmListaEstaciones += '<li data-role="list-divider">'+metro.lineas[i].nombre+'</li>';
        estaciones = metro.lineas[i].estaciones;
        for(j=0; j<estaciones.length; j++) {
            htlmListaEstaciones += '<li><a href="#" onclick="C_InfoEstacion.dispatch('+estaciones[j].id+')"><img src="'+estaciones[j].icono+'" class="ui-li-icon" /><span>'+estaciones[j].nombre+'</span></a></li>';
        }
    }
    $('#listaEstaciones').html(htlmListaEstaciones);    
    $("#listaEstaciones").listview('refresh');
}

C_MuestraVista.muestraLineas = function() {
    var htmlListaLineas = "";
    for(i=0; i<metro.lineas.length; i++) {
        htmlListaLineas += '<li>';
        htmlListaLineas += '<h4>'+metro.lineas[i].nombre+'</h4>';
        htmlListaLineas += '<img src="'+metro.lineas[i].icono+'" class="ui-li-icon">';
        var estaciones = metro.lineas[i].estaciones;
        htmlListaLineas += '<p>'+estaciones[0].nombre+' - '+estaciones[estaciones.length - 1].nombre+'</p>';
        htmlListaLineas += '<span class="ui-li-count">'+metro.lineas[i].estaciones.length+'</span>';
        htmlListaLineas += '<ul data-role="listview">';
        for(j=0; j<estaciones.length; j++) {
            htmlListaLineas += '<li><a href="#" onclick="C_InfoEstacion.dispatch('+estaciones[j].id+')"><img src="'+estaciones[j].icono+'" class="ui-li-icon"" /><span>'+estaciones[j].nombre+'</span></a></li>';
        }
        htmlListaLineas += '</ul>';
        htmlListaLineas += '</li>';
    }
    $('#listaLineas').append(htmlListaLineas);
    $("#listaLineas").listview('refresh');
}