<?php

include 'clases/RedMetro.php';
header('content-type: application/json; charset=utf-8');
if (isset($_GET['multiples'])) {
    $estaciones = RedMetro::buscaEstacionesCercanas($_POST["latitud"], $_POST["longitud"], 10);
    echo '<ul data-role="listview">';
    foreach ($estaciones as $estacion) {
        echo '<li><img src="imgs/iconosEstaciones/' . $estacion->id . '.png" class="ui-li-icon ui-li-thumb"><a href="#">';
        echo '<h4>' . $estacion->nombre . '</h4>';
        echo '<p>' . round($estacion->distancia, 2) . ' km.</p>';
        echo '</a></li>';
    }
    echo '</ul>';
} else {
    $estaciones = RedMetro::buscaEstacionesCercanas($_POST["latitud"], $_POST["longitud"], 1);
    echo json_encode($estaciones[0]);
}
?>
