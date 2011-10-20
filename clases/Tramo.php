<?php

include_once 'PuntoRuta.php';

class Tramo extends PuntoRuta {

    private $direccion;

    public function __construct($estacionInicio, $estacionFin, $direccion) {
        parent::__construct($estacionInicio, $estacionFin);
        $this->direccion = $direccion;
    }

    public function __toString() {
        $instruccion = 'En la Línea ' . $this->estacionInicio->getLinea()->getId()
                . ' aborde la estación ' . $this->estacionInicio->getNombre()
                . ' en dirección ' . $this->direccion . '.'
                . ' Continue hasta la estación ' . $this->estacionFin->getNombre().'.';
        return $instruccion;
    }

    public function getDireccion() {
        return $this->direccion;
    }

}

?>