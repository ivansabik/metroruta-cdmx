<?php

include_once 'RedMetro.php';
include_once 'Dijkstra.php';
include_once 'Ruta.php';
include_once 'Tramo.php';
include_once 'Transbordo.php';

class CalculadorRuta {

    public static function calculaRuta($idEstacionOrigen, $idEstacionDestino) {
        $tramos = RedMetro::construyeGrafo();
        $dijkstra = new Dijkstra($idEstacionOrigen, $tramos);
        $puntosCamino = $dijkstra->getCompletePathToNode($idEstacionDestino);
        $camino = array();
        // construye tramos y transbordos
        for ($i = 0; $i < count($puntosCamino) - 1; $i++) {
            $estacionOrigen = RedMetro::buscaEstacion($puntosCamino[$i]);
            $estacionDestino = RedMetro::buscaEstacion($puntosCamino[$i + 1]);
            if ($estacionOrigen->getNombre() == $estacionDestino->getNombre())
                $puntosRuta[] = new Transbordo($estacionOrigen, $estacionDestino);
            else {
                $direccion = $estacionOrigen->getLinea()->determinaDireccion($estacionOrigen, $estacionDestino);
                $puntosRuta[] = new Tramo($estacionOrigen, $estacionDestino, $direccion);
            }
        }
        // crea ruta y agrega tramos integrados y transbordos
        $ruta = new Ruta(RedMetro::obtenDistancia($puntosRuta), $dijkstra->getDistanceToNode($idEstacionDestino));
        return self::construyeRuta($ruta, $puntosRuta);
    }

    public static function construyeRuta($ruta, $puntosRuta) {
        for ($i = 0; $i < count($puntosRuta); $i++) {
            if ($puntosRuta[$i] instanceof Transbordo)
                $ruta->agregaPunto($puntosRuta[$i]);
            else {
                $estacionInicio = $puntosRuta[$i]->getEstacionInicio();
                $direccion = $puntosRuta[$i]->getDireccion();
                for ($i; $i < count($puntosRuta) && $puntosRuta[$i] instanceof Tramo; $i++) {
                    null; // sollte nichts machen
                }
                $i--;
                $estacionFin = $puntosRuta[$i]->getEstacionFin();
                $ruta->agregaPunto(new Tramo($estacionInicio, $estacionFin, $direccion));
            }
        }
        return $ruta;
    }

    /*
    public static function calculaRutaJs($idEstacionOrigen, $idEstacionDestino) {
        $ruta = self::calculaRuta($idEstacionOrigen, $idEstacionDestino);
        $arrRuta['distancia'] = $ruta->getDistancia();
        $arrRuta['tiempo'] = $ruta->getTiempo();
        $arrRuta['puntosRuta'] = array();
        $puntosRuta = $ruta->getPuntos();
        for($i=0; $i < sizeof($puntosRuta); $i++) {
            $arrPuntos = &$arrRuta['puntosRuta'];
            $arrPuntos[$i]['estacionInicio'] = array();
            $arrEstacion = &$arrPuntos[$i]['estacionInicio'];
            $arrEstacion['nombre'] = $puntosRuta[$i]->getEstacionInicio()->getNombre();
            $arrEstacion['icono'] =  $puntosRuta[$i]->getEstacionInicio()->getIcono();
            $arrEstacion['linea'] = $puntosRuta[$i]->getEstacionInicio()->getLinea()->getId();
            $arrEstacion['iconoLinea'] = $puntosRuta[$i]->getEstacionInicio()->getLinea()->getIcono();
            $arrPuntos[$i]['estacionFin'] = array();
            $arrEstacion = &$arrPuntos[$i]['estacionFin'];
            $arrEstacion['nombre'] = $puntosRuta[$i]->getEstacionFin()->getNombre();
            $arrEstacion['icono'] =  $puntosRuta[$i]->getEstacionFin()->getIcono();
            $arrEstacion['linea'] = $puntosRuta[$i]->getEstacionFin()->getLinea()->getId();
            $arrEstacion['iconoLinea'] = $puntosRuta[$i]->getEstacionFin()->getLinea()->getIcono();
            if(is_a($puntosRuta[$i], 'Tramo')) {
                $arrPuntos[$i]['tipo'] = 'tramo';
                $arrPuntos[$i]['direccion'] = $puntosRuta[$i]->getDireccion();
            }
            // Es transbordo
            else
                $arrPuntos[$i]['tipo'] = 'transbordo';
        }
        echo json_encode($arrRuta);
    }
    */

}

?>