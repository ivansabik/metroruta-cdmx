<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/metrorutadf/libs/ez_sql/shared/ez_sql_core.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/metrorutadf/libs/ez_sql/mysql/ez_sql_mysql.php';

class BaseDatos {

    private static $bd;
    private $db;

    private function __construct() {
        $this->db = new ezSQL_mysql('braindep_mrdf', '5p=urV;93Q5]^rD', 'braindep_metrorutadf', 'localhost');
        //$this->db = new ezSQL_mysql('root', '', 'braindep_metrorutadf', 'localhost');
    }

    public static function getInstance() {
        if (!isset(self::$bd))
            self::$bd = new BaseDatos();
        return self::$bd;
    }

    public function getDb() {
        return $this->db;
    }

}

?>