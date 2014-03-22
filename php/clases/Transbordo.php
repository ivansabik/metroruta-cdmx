<?php

class Transbordo extends PuntoRuta {

    public function __toString() {
        $instruccion = 'En la estación ' . $this->estacionInicio->getNombre()
                . ' transborde hacia la Línea ' . $this->estacionFin->getLinea()->getId().'.';
        return $instruccion;
    }

}

?>