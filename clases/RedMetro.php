<?php

include_once 'BaseDatos.php';
include_once 'Linea.php';
include_once 'Estacion.php';

class RedMetro {

    public static $horario = 'Lunes - Viernes: \n
    Sabado: \n
    Domingo: \n
    Días feriados: ';
    public static $precio = 3;
    public static $velocidad = 600;
    public static $tiempoParadas = 0.35;
    public static $numLineas = 11;

    public static function construyeGrafo() {
        // convertir distancias de tramos a tiempos y construir arreglo con tramos y transbordos
        $db = BaseDatos::getInstance()->getDb();
        $consulta = 'SELECT idestacionorigen,idestaciondestino,distancia/' . self::$velocidad . '+' . self::$tiempoParadas . ' FROM tramos';
        $consulta = $db->escape($consulta);
        $tramos = $db->get_results($consulta, ARRAY_N);
        $consulta = 'SELECT * FROM transbordos';
        $consulta = $db->escape($consulta);
        $transbordos = $db->get_results($consulta, ARRAY_N);
        return array_merge($tramos, $transbordos);
    }

    public static function buscaEstacion($idEstacion) {
        $db = BaseDatos::getInstance()->getDb();
        $consulta = 'SELECT id,nombre,latitud,longitud,idlinea,posicion FROM estaciones,estaciones_lineas WHERE id=' . $idEstacion . ' AND idestacion=' . $idEstacion;
        $consulta = $db->escape($consulta);
        $estacion = $db->get_row($consulta);
        $linea = self::buscaLinea($estacion->idlinea);
        return new Estacion($estacion->id, utf8_encode($estacion->nombre), $estacion->latitud, $estacion->latitud, $linea, $estacion->posicion);
    }

    public static function buscaLinea($idLinea) {
        $db = BaseDatos::getInstance()->getDb();
        $consulta = 'SELECT * FROM lineas WHERE id=' . $idLinea;
        $consulta = $db->escape($consulta);
        $linea = $db->get_row($consulta);
        $consulta = 'SELECT idestacion FROM estaciones_lineas WHERE idlinea=' . $idLinea . ' ORDER BY posicion ASC';
        $consulta = $db->escape($consulta);
        $estaciones = $db->get_col($consulta, 0);
        return new Linea($linea->id, $linea->nombre, $linea->colorhex, $estaciones);
    }

    public static function obtenDistancia($puntosRuta) {
        // suma distancias entre puntos de la ruta en una consulta
        $db = BaseDatos::getInstance()->getDb();
        $consulta = 'SELECT SUM(distancia) FROM tramos WHERE ((idestacionorigen=' . $puntosRuta[0]->getEstacionInicio()->getId() . ' AND idestaciondestino=' . $puntosRuta[0]->getEstacionFin()->getID() . ') OR (idestaciondestino=' . $puntosRuta[0]->getEstacionInicio()->getId() . ' AND idestacionorigen=' . $puntosRuta[0]->getEstacionFin()->getID() . '))';
        for ($i = 1; $i < count($puntosRuta); $i++)
            if ($puntosRuta[$i] instanceof Tramo)
                $consulta .= ' OR ((idestacionorigen=' . $puntosRuta[$i]->getEstacionInicio()->getId() . ' AND idestaciondestino=' . $puntosRuta[$i]->getEstacionFin()->getID() . ') OR (idestaciondestino=' . $puntosRuta[$i]->getEstacionInicio()->getId() . ' AND idestacionorigen=' . $puntosRuta[$i]->getEstacionFin()->getID() . '))';
        $consulta = $db->escape($consulta);
        return $db->get_var($consulta);
    }

    public static function buscaEstacionesCercanas($latitud, $longitud, $numResultados) {
        $db = BaseDatos::getInstance()->getDb();
        $consulta = 'SELECT id,nombre,3956*2*ASIN(SQRT(POWER(SIN(('.$latitud.'-ABS(latitud))*PI()/180/2),2)+COS('.$latitud.'*PI()/180)*COS(ABS(latitud)*pi()/180)*POWER(SIN(('.$longitud.'-longitud)*PI()/180/2),2))) as distancia FROM estaciones GROUP BY nombre ORDER BY distancia limit '.$numResultados;
        $consulta = $db->escape($consulta);
        return $db->get_results($consulta);
    }

    public static function constuyeEstacionesGraficar($idLinea) {
        $db = BaseDatos::getInstance()->getDb();
        $consulta = 'SELECT estaciones.id,colorhex,latitud,longitud FROM lineas,estaciones,estaciones_lineas WHERE estaciones.id=idEstacion AND lineas.id=' . $idLinea . ' AND idLinea=' . $idLinea . ' ORDER BY posicion';
        $consulta = $db->escape($consulta);
        return $db->get_results($consulta);
    }

    public static function buscaLineas() {
        $db = BaseDatos::getInstance()->getDb();
        $lineas = array();
        for($i = 1; $i < self::$numLineas; $i++) {
            $estaciones = array();
            $consulta = "SELECT lineas.nombre AS 'nombrelinea', lineas.colorhex, estaciones_lineas.idlinea, estaciones_lineas.idestacion, estaciones.nombre AS 'nombreestacion', estaciones.latitud, estaciones.longitud from lineas, estaciones join estaciones_lineas on estaciones.id = estaciones_lineas.idestacion WHERE estaciones_lineas.idlinea = $i AND lineas.id = $i ORDER BY estaciones_lineas.idlinea, estaciones_lineas.posicion";
            $resultados = $db->get_results($consulta);
            $linea = new Linea($resultados[0]->idlinea, $resultados[0]->nombrelinea, $resultados[0]->colorhex);
            foreach($resultados as $resultado)
                $linea->agregaEstacion(new Estacion($resultado->idestacion, $resultado->nombreestacion, $resultado->latitud, $resultado->longitud));
            $lineas[] = $linea;
        }
        return $lineas;
    }

}

?>