<?php
class Estacion {
    private $id, $nombre, $latitud, $longitud, $linea, $posicionLinea;
    
    public function __construct($id, $nombre, $latitud, $longitud, $linea = null, $posicionLinea = null) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->latitud = $latitud;
        $this->longitud = $longitud;
        $this->linea = $linea;
        $this->posicionLinea = $posicionLinea;
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function getNombre() {
        return $this->nombre;
    }
    
    public function getLatitud() {
        return $this->latitud;
    }
    
    public function getLongitud() {
        return $this->longitud;
    }
    
    public function getLinea() {
        return $this->linea;
    }
    
    public function getPosicionLinea() {
        return $this->posicionLinea;
    }
    
    public function getIcono() {
        return 'imgs/iconosEstaciones/'.$this->id.'.png';
    }

}
?>