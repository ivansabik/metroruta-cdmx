<?php include_once 'clases/CalculadorRuta.php' ?>
<!DOCTYPE html>
<html>
    <head>
        <title>Metroruta DF</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.css" />
        <script src="http://code.jquery.com/jquery-1.5.2.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.js"></script>
    </head>
    <body>
        <div data-role="page">
            <div data-role="header">
                <h1><img src="imgs/logo.png" alt="Metroruta DF"/></h1>
            </div>
            <div data-role="content">
                <p class="titulo"><strong>Ruta:</strong><p>
                <ol class=" ui-listview  ui-listview-inset ui-corner-all ui-shadow " data-role="listview" data-inset="true" id="lista">
                    <?php
                    $ruta = CalculadorRuta::calculaRuta($_GET["idOrigen"], $_GET["idDestino"]);
                    $puntosRuta = $ruta->getPuntos();
                    for($i = 0; $i < sizeof($puntosRuta); $i++) {
                        if($i == 0)
                            echo '<li class="ui-li ui-li-static ui-corner-top">'.(string)$puntosRuta[$i].'</li>';
                        elseif($i == sizeof($puntosRuta)-1)
                            echo '<li class="ui-li ui-li-static ui-corner-bottom">'.(string)$puntosRuta[$i].'</li>';
                        else
                            echo '<li class="ui-li ui-li-static">'.(string)$puntosRuta[$i].'</li>';
                    }
                    ?>
                </ol>
                <p class="titulo">
                    <strong>Distancia: </strong><?php echo round ($ruta->getDistancia()/1000, 2)?> km.</br>
                    <strong>Tiempo aprox. del recorrido: </strong><?php echo round($ruta->getTiempo())?> min.
                </p>
            </div>
            <div data-role="footer">
                <h5>http://www.metrorutadf.com</h5>
            </div>
        </div>
    </body>
</html>