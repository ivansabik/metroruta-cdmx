<?php include 'clases/Linea.php' ?>
<!DOCTYPE html>
<html>
    <head>
        <title>Metroruta DF</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.css" />
        <script src="http://code.jquery.com/jquery-1.5.2.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.js"></script>
        <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
        <script>
            $('#estacionesCercanas').live('pagecreate',function(event){
                navigator.geolocation.getCurrentPosition(mostrarEstacionesCercanas, errorCoordenadas);

                function mostrarEstacionesCercanas(location) {
                    $.post(
                    "buscarEstaciones.php?multiples",
                    { latitud: location.coords.latitude, longitud: location.coords.longitude },
                    function(data) {
                        $('#listaEstacionesCercanas').html('<div id="lista"></div>');
                        $("#lista").html(data).page();
                        $('select').page();
                    }
                );
                }

                function errorCoordenadas() {
                    $("#listaEstacionesCercanas").empty().html("No es posible obtener tu ubicación actual");
                }
            });

            $(document).ready(function() {
                $('#selEstacionCercana').click(function() {
                    navigator.geolocation.getCurrentPosition(seleccionarEstacionCercana, errorCoordenadas);

                    function seleccionarEstacionCercana(location) {
                        $.post("buscarEstaciones.php",
                                { latitud: location.coords.latitude, longitud: location.coords.longitude },
                        function(data) {
                            // Cambia el valor de idOrigen al de la estacion mas cercana
                            $('#origen').val(data.id);
                            // Busca span con el texto de la estacion seleccionada y lo cambia por la estacion mas cercana
                            $($('span').children()[3]).html(data.nombre);
                        }, 'json');
                    }

                    function errorCoordenadas() {
                    }
                });
            });
        </script>
    </head>
    <body>
        <!--Menu-->
        <div data-role="page" id="menu">
            <div data-role="header">
                <h1><img src="imgs/logo.png" alt="Metroruta DF"/></h1>
            </div>
            <div data-role="content">
                <ul data-role="listview">
                    <li><a href="mapa.php">Ver mapa</a></li>
                    <li><a href="#lineas">Ver líneas del metro</a></li>
                    <li><a href="#estaciones">Buscar estación</a></li>
                    <li><a href="#calcularRuta">Calcular ruta</a></li>
                    <li><a href="#estacionesCercanas">Buscar estaciones cercanas</a></li>
                    <li><a href="#acerca" data-rel="dialog">Acerca de Metroruta DF</a></li>
                </ul>
            </div>
            <div data-role="footer">
                <h5>Metroruta DF</h5>
            </div>
        </div>
        <!--Ver líneas del metro-->
        <div data-role="page" id="lineas">
            <div data-role="header">
                <h1><img src="imgs/logo.png" alt="Metroruta DF"/></h1>
            </div>
            <div data-role="content">
                    <script>
                        var lineas = <?php Linea::imprimeLineasJavascript() ?>;
                        document.write('<ul data-role="listview">');
                        for(i=0; i<lineas.length; i++) {
                            document.write('<li>');
                            document.write('<h4>'+lineas[i].nombre+'</h4>');
                            document.write('<img src="'+lineas[i].icono+'" class="ui-li-icon ui-li-thumb">');
                            var estaciones = lineas[i].estaciones;
                            document.write('<p>'+estaciones[0].nombre+' - '+estaciones[estaciones.length - 1].nombre+'</p>');
                            document.write('<ul>');
                            for(j=0; j<estaciones.length; j++) {
                                document.write('<li><img src="'+estaciones[j].icono+'" class="ui-li-icon ui-li-thumb"><a href="#">'+estaciones[j].nombre+'</a></li>');
                            }
                            document.write('</ul>');
                            document.write('</li>');
                        }
                        document.write('</ul>');
                    </script>
            </div>
            <div data-role="footer">
                <h5>Metroruta DF</h5>
            </div>
        </div>
        <!--Buscar estación-->
        <div data-role="page" id="estaciones">
            <div data-role="header">
                <h1><img src="imgs/logo.png" alt="Metroruta DF"/></h1>
            </div>
            <div data-role="content">
                <script>
                document.write('<ul data-role="listview" data-filter="true">');
                for(i=0; i<lineas.length; i++) {
                    document.write('<li data-role="list-divider">'+lineas[i].nombre+'</li>');
                    var estaciones = lineas[i].estaciones;
                    for(j=0; j<estaciones.length; j++) {
                        document.write('<li><img src="'+estaciones[j].icono+'" class="ui-li-icon ui-li-thumb"><a href="#">'+estaciones[j].nombre+'</a></li>');
                    }
                }
                document.write('</ul>');
                </script>
            </div>
            <div data-role="footer">
                <h5>Metroruta DF</h5>
            </div>
        </div>
        <!--Calcular ruta-->
        <div data-role="page" id="calcularRuta">
            <div data-role="header">
                <h1><img src="imgs/logo.png" alt="Metroruta DF"/></h1>
            </div>
            <div data-role="content">
                <button id="selEstacionCercana">Seleccionar estación más cercana</button>
                <div data-role="fieldcontain">
                    <form action="calculaRuta.php" method="GET">
                        <label for="origen">Estación origen:</label>
                        <script>
                            document.write('<select name="idOrigen" id="origen" data-native-menu="false">');
                            for(i=0; i<lineas.length; i++) {
                                document.write('<optgroup label="'+lineas[i].nombre+'">');
                                var estaciones = lineas[i].estaciones;
                                for(j=0; j<estaciones.length; j++) {
                                    document.write('<option value="'+estaciones[j].id+'">'+estaciones[j].nombre+'</option>');
                                }
                                document.write('</optgroup>');
                            }
                            document.write('</select>');
                        </script>
                        <label for="destino">Estación destino:</label>
                        <script>
                            document.write('<select name="idDestino" id="destino" data-native-menu="false">');
                            for(i=0; i<lineas.length; i++) {
                                document.write('<optgroup label="'+lineas[i].nombre+'">');
                                var estaciones = lineas[i].estaciones;
                                for(j=0; j<estaciones.length; j++) {
                                    document.write('<option value="'+estaciones[j].id+'">'+estaciones[j].nombre+'</option>');
                                }
                                document.write('</optgroup>');
                            }
                            document.write('</select>');
                        </script>
                        <button type="submit">Calcular ruta</button>
                    </form>
                </div>
                <div data-role="footer">
                    <h5>Metroruta DF</h5>
                </div>
            </div>
        </div>
        <!--Buscar estaciones cercanas-->
        <div data-role="page" id="estacionesCercanas">
            <div data-role="header">
                <h1><img src="imgs/logo.png" alt="Metroruta DF"/></h1>
            </div>
            <div data-role="content" id="listaEstacionesCercanas"></div>
            <div data-role="footer">
                <h5>Metroruta DF</h5>
            </div>
        </div>
        <!--Acerca de-->
        <div data-role="page" id="acerca">
            <div data-role="header">
                <h1><img src="imgs/logo.png" alt="Metroruta DF"/></h1>
            </div>
            <div data-role="content">
            </div>
            <div data-role="footer">
                <h5>Metroruta DF</h5>
            </div>
        </div>
    </body>
</html>