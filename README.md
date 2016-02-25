![](https://raw.githubusercontent.com/mandroslabs/metroruta-cdmx/master/doc/logo.png) Metroruta CDMX
============

Metroruta CDMX (antes Metroruta DF) es una app móvil para ayudar al viajero chilango en el metro. Permite ver las líneas/estaciones en un mapa, encontrar estaciones cercanas y calcular la ruta entre dos estaciones usando el algoritmo de Dijkstra.

![](https://raw.githubusercontent.com/mandroslabs/metroruta-cdmx/master/doc/demo.gif)

## Funcionalidades

- Ver mapa interactivo con líneas y estaciones
- Ver líneas de metro y navegar las estaciones de cada línea
- Buscar estación por nombre
- Calcular ruta más corta entre dos estaciones (con algoritmo de Dijkstra, una implementación externa)
- Buscar estaciones cercanas (lineal entre dos puntos)

## Herramientas

- JQuery Mobile
- jQuery-Geo
- Sticky
- TaffyDB

## Vistas

- menu
- mapa
- lineas
- estacionesLinea

## Rutas

- estacionDialog
- estaciones
- estacionesCercanas
- estacionesLinea
- lineas
- mapa

## Estructura proyecto

- lib - Librerias externas
- routes - Manejadores para las routes contienen logica principal que actualiza vistas directamente
- app.js - Configuraciones globales como ubicacion actual
- db.js - Lineas y estaciones en TaffyJS
