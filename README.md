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

| Funcionalidad        | Controlador         | Vista               |
|----------------------|---------------------|---------------------|
| Menú principal       | menu                | menu                |
| Mapa con estaciones  | mapa                | mapa                |
| Líneas y estaciones  | lineas              | lineas              |
| Buscar estación      | buscar-estacion     | buscar-estacion     |
| Info de una estación | info-estacion       | info-estacion       |
| Configurar ruta      | ruta-armar          | ruta-armar          |
| Calcular ruta        | ruta-calcular       | ruta-calcular       |
| Estaciones cercanas  | estaciones-cercanas | estaciones-cercanas |
