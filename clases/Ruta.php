<?php

class Ruta {

    private $distancia, $tiempo, $puntos;

    public function __construct($distancia, $tiempo) {
        $this->distancia = $distancia;
        $this->tiempo = $tiempo;
        $this->puntos = array();
    }

    public function getDistancia() {
        return $this->distancia;
    }

    public function getTiempo() {
        return $this->tiempo;
    }

    public function getPuntos() {
        return $this->puntos;
    }

    public function agregaPunto($puntoRuta) {
        $this->puntos[] = $puntoRuta;
    }

    public function __toString() {
        $instrucciones = '';
        for ($i = 0; $i < count($this->puntos); $i++)
            $instrucciones .= '<p><span class="numeros">' . ($i + 1) . '. </span>' . (string) $this->puntos[$i] . '</br></p>';
        $instrucciones .= 'Distancia: ' . round($this->distancia / 1000, 2) . ' km.</br>';
        $instrucciones .= 'Tiempo aprox. del recorrido: ' . round($this->tiempo) . ' min.</br>';
        return $instrucciones;
    }

}

?>