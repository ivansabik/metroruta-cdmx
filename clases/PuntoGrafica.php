<?php

class PuntoGrafica {

    private $colorHEX, $latitud, $longitud, $pixeles, $icono;

    function __construct($colorHEX, $latitud, $longitud, $pixeles, $icono) {
        $this->colorHEX = $colorHEX;
        $this->latitud = $latitud;
        $this->longitud = $longitud;
        $this->pixeles = $pixeles;
        $this->pixeles = $pixeles;
        $this->icono = $icono;
    }

    public function getColorHEX() {
        return $this->colorHEX;
    } 

    public function getIcono() {
        return $this->icono;
    }

    public function getLatitud() {
        return $this->latitud;
    }

    public function getLongitud() {
        return $this->longitud;
    }

}

?>