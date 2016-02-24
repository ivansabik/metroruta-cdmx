// Mostrar estaciones de una linea especifica
$(document).on('pagebeforeshow', '#estacionesLinea', function() {
  console.log(lineaSeleccionada);
});

/*
var parameters = $(this).data("url").split("?")[1];
parameter = parameters.replace("parameter=","");


var estaciones = linea.estaciones;
htmlLineas += '<p>' + estaciones[0].nombre + ' - ' + estaciones[estaciones.length - 1].nombre + '</p>';
htmlLineas += '<span class="ui-li-count">' + linea.estaciones.length + '</span>';
htmlLineas += '<ul>';
for (j = 0; j < estaciones.length; j++) {
  htmlLineas += '<li><a href="#"><img src="' + estaciones[j].icono + '" class="ui-li-icon"" /><span>' + estaciones[j].nombre + '</span></a></li>';
}
htmlLineas += '</ul>';
htmlLineas += '</a>';
htmlLineas += '</li>';
*/
