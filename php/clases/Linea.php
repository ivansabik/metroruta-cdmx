<?php

include_once 'RedMetro.php';

class Linea {

    private $id, $nombre, $colorHEX, $idEstaciones, $estaciones;

    public function __construct($id, $nombre, $colorHEX, $idEstaciones = null, $estaciones = null) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->colorHEX = $colorHEX;
        $this->idEstaciones = $idEstaciones;
    }

    public function getID() {
        return $this->id;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getColorHEX() {
        return $this->colorHEX;
    }

    public function getIcono() {
        return 'imgs/iconosLineas/' . $this->id . '.png';
    }

    public function getIdEstaciones() {
        return $this->idEstaciones;
    }

    public function getEstaciones() {
        return $this->estaciones;
    }

    public function agregaEstacion($estacion) {
        $this->estaciones[] = $estacion;
    }

    public function determinaDireccion($estacionInicio, $estacionFin) {
        if ($estacionInicio->getPosicionLinea() == 1)
            return RedMetro::buscaEstacion($this->idEstaciones[count($this->idEstaciones) - 1])->getNombre();
        if ($estacionInicio->getPosicionLinea() == count($this->idEstaciones))
            return RedMetro::buscaEstacion($this->idEstaciones[0])->getNombre();
        if ($this->idEstaciones[$estacionInicio->getPosicionLinea()] == $estacionFin->getId())
            return RedMetro::buscaEstacion($this->idEstaciones[count($this->idEstaciones) - 1])->getNombre();
        return RedMetro::buscaEstacion($this->idEstaciones[0])->getNombre();
    }

    public static function imprimeEstacionesJavascript() {
        $lineas = array();
        for ($idLinea = 1; $idLinea <= RedMetro::$numLineas; $idLinea++) {
            $lineas[] = array('id' =>  $idLinea, 'colorHex' => null, 'estaciones' => null);
            $lineas[sizeof($lineas)-1]['estaciones'] = RedMetro::constuyeEstacionesGraficar($idLinea);
            $lineas[sizeof($lineas)-1]['colorHex'] = $lineas[sizeof($lineas)-1]['estaciones'][0]->colorhex;
        }
        echo json_encode($lineas);
    }

    public static function imprimeLineasJavascript() {
        $lineas = RedMetro::buscaLineas();
        // Construccion de arreglo para poder utilizar json_encode con las propiedades privadas
        $arrLineas = array();
        foreach($lineas as $linea) {
            $arrLineas[] = array('id' => null, 'nombre' => null, 'colorHex' => null, 'icono' => null, 'estaciones' => null);
            $arrLineas[sizeof($arrLineas) - 1]['id'] = $linea->getID();
            $arrLineas[sizeof($arrLineas) - 1]['nombre'] = utf8_encode($linea->getNombre());
            $arrLineas[sizeof($arrLineas) - 1]['colorHex'] = $linea->getColorHEX();
            $arrLineas[sizeof($arrLineas) - 1]['icono'] = $linea->getIcono();
            $arrLineas[sizeof($arrLineas) - 1]['estaciones'] = array();
            $arrEstaciones = &$arrLineas[sizeof($arrLineas) - 1]['estaciones'];
            foreach($linea->getEstaciones() as $estacion) {
                $arrEstaciones[] = array('id' => null, 'nombre' => null, 'latitud' => null, 'longitud' => null, 'icono' => null);
                $arrEstaciones[sizeof($arrEstaciones) - 1]['id'] = $estacion->getId();
                $arrEstaciones[sizeof($arrEstaciones) - 1]['nombre'] = utf8_encode($estacion->getNombre());
                $arrEstaciones[sizeof($arrEstaciones) - 1]['latitud'] = $estacion->getLatitud();
                $arrEstaciones[sizeof($arrEstaciones) - 1]['longitud'] = $estacion->getLongitud();
                $arrEstaciones[sizeof($arrEstaciones) - 1]['icono'] = $estacion->getIcono();
            }
        }
        echo json_encode($arrLineas);
    }

}

?>