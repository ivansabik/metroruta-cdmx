<?php

include 'RedMetro.php';

class ConvertidorJS {

    public static function getArregloLineas() {
        $lineas = array();
        for ($idLinea = 1; $idLinea <= RedMetro::$numLineas; $idLinea++) {
            foreach (RedMetro::construyePuntosGrafica($idLinea, $pixeles, $opacidad) as $punto) {
            }
        }
    }

}
?>