<?php

class PuntoRuta {

    protected $estacionInicio, $estacionFin;

    public function __construct($estacionInicio, $estacionFin) {
        $this->estacionInicio = $estacionInicio;
        $this->estacionFin = $estacionFin;
    }

    public function getEstacionInicio() {
        return $this->estacionInicio;
    }

    public function getEstacionFin() {
        return $this->estacionFin;
    }

}

?>