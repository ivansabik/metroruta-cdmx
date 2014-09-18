Metroruta DF
============

Refactor de la app móvil:

- Ember.js
- Phonegap

### Modelos

- Linea
- Estacion
- Metro
- Dikstra
- Usuario

DIAGRAMAS

### Vistas

- Menu
- Mapa
- Estaciones por línea
- Buscar estación
- Info estación
- Ruta 
  - Seleccionar
  - Instrucciones
- Estaciones cercanas

### Controladores

- Ver menú principal (index)
- Ver mapa
- Ver líneas / estaciones
- Buscar estación
- Ver info de estación
- Configurar ruta
- Calcular ruta
- Buscar estaciones cercanas

| Funcionalidad        | Nombre Ruta        | Controlador             | Path                        | Template          |
|----------------------|--------------------|-------------------------|-----------------------------|-------------------|
| Menú principal       | index              | IndexRoute              | /                           | index             |
| Mapa con estaciones  | mapa               | MapaRoute               | /mapa                       | mapa              |
| Líneas y estaciones  | lineas             | LineasRoute             | /lineas                     | lineas            |
| Buscar estación      | estacion.buscar    | EstacionBuscarRoute     | /estacion                   | estacion          |
| Info de una estación | estacion.info      | EstacionInfoRoute       | /estacion/info/:id_estacion | estacion/info     |
| Configurar ruta      | ruta               | RutaRoute               | /ruta                       | ruta              |
| Calcular ruta        | ruta.calcular      | RutaCalcularRoute       | /ruta/calcular              | ruta/calcular     |
| Estaciones cercanas  | estacione.cercanas | EstacionesCercanasRoute | /estacion/cercanas          | estacion/cercanas |
