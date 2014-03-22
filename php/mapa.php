<!DOCTYPE html>
<html>
    <head>
        <title>Metroruta DF</title>
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.css" />
        <script src="http://code.jquery.com/jquery-1.5.2.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.js"></script>
        <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
    </head>
    <body>
        <div data-role="page" class="page-map">
            <style>
                .page-map, .ui-content, #map-canvas { width: 100%; height: 100%; padding: 0; }
            </style>
            <script>
                $('.page-map').live("pagecreate", function() {
                    // Coordenadas por defecto
                    var lat = 19.42705;
                    var lng = -99.127571;
                    // Intenta obtener localizacion
                    if( navigator.geolocation ) {
                        // Se obtuvieron coordenadas
                        function gpsSuccess(pos){
                            if( pos.coords ){
                                lat = pos.coords.latitude;
                                lng = pos.coords.longitude;
                            }
                            else{
                                lat = pos.latitude;
                                lng = pos.longitude;
                            }
                            creaMapa(lat, lng);
                        }
                        // Geolocalizacion habilitada pero no se obtuvieron coordenadas
                        function gpsFail(){
                            creaMapa(lat, lng);
                        }
                        navigator.geolocation.getCurrentPosition(gpsSuccess, gpsFail, {enableHighAccuracy:true, maximumAge: 300000});
                    }
                    else {
                        creaMapa(lat, lng);
                    }
                });

                function creaMapa(lat, lng) {
                    var latlng = new google.maps.LatLng(lat, lng);
                    var myOptions = {
                        zoom: 15,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("map-canvas"),myOptions);

                    // Marca posicion
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });

                    // Dibuja lineas y marca estaciones
                    var lineas = <?php include 'clases/Linea.php'; Linea::imprimeEstacionesJavascript();?>;
                    for(i=0; i<lineas.length; i++) {
                        var color = lineas[i].colorHex;
                        var estaciones = lineas[i].estaciones;
                        var coordenadasLineas = new Array();
                        for(j=0; j<estaciones.length; j++) {
                            coordenadasLineas[j] =  new google.maps.LatLng(estaciones[j].latitud, estaciones[j].longitud);
                            var image = 'imgs/iconosEstaciones/'+estaciones[j].id+'.png';
                            var marcadorEstacion = new google.maps.Marker({
                                position: coordenadasLineas[j],
                                map: map,
                                icon: image
                            });
                        }
                        var caminoLinea = new google.maps.Polyline({
                            path: coordenadasLineas,
                            strokeColor: color,
                            strokeOpacity: 0.6,
                            strokeWeight: 10
                        });
                        caminoLinea.setMap(map);
                    }
                }
            </script>
            <div data-role="header">
                <h1><img src="imgs/logo.png" alt="Metroruta DF"/></h1>
            </div>
            <div data-role="content">
                <div id="map-canvas"></div>
            </div>
        </div>
    </body>
</html>