Metroruta DF
============

Metroruta DF comenzó como una app web en PHP y MySQL que calculaba la ruta más corta con el algoritmo de Dijkstra y la mostraba en texto. Entonces sólo existía una app muy buena de info recopilada y que permite especificar muchos parámetros para el cálculo de las rutas pero muy mala para usar, experiencia de usuario no tan padre, aparte implementada en tecnologías M*crosoft ([Via DF](http://www.viadf.com.mx)). Metroruta DF también hasta la fecha parece ser el único proyecto Open Source del tipo.

Después se portó a Javascript para hacerla una aplicación móvil con Phonegap y JQueryMobile, entonces sólo había pocas apps para hacer esto pero todas con código nativo Java para Android y Open Source ni pensarla. Esta app hasta la fecha [está publicada en el Google Play](https://play.google.com/store/apps/details?id=com.metrorutadf&hl=en) con ca. 770 usuarios instalados y sólo el 13% que todavía la tienen instalada.

Las funcionalidades que implementa hasta el momento en la app móvil son:

- Ver mapa interactivo (Con la API de GMaps ya la 3 creo)
- Ver líneas de metro y navegar las estaciones de cada línea
- Buscar estación por nombre
- Calcular ruta más corta entre dos estaciones (con Dijkstra, una implementación externa)
- Buscar estaciones cercanas (lineal entre dos puntos)
- Ver información de las estaciones (la del origen del nombre, logo, etc)

### El proyecto actual

Se está haciendo un rediseño y refactor del proyecto para que tenga estos componentes:

1. API implementada en Node.js 
2. Wrapper (Plugin JQuery?) para consumir la API en scripts/aplicaciones con Javascript
3. App móvil con JQuery Mobile y Phonegap, publicada en el market de Google (para Android)
4. App web standalone en PHP para calcular (No se le da soporte pero fue la primera versión, habrá quien le sirva)

### TODOs

- El core que calcula las rutas más cortas ya está en Javascript, hay que hacer un diseño de la API y portarlo a Node.js
- La app para móvil funciona buggientamente, hay que refactorearla con un MVC más sólido (Backbone, Ember?)
- Tests unitarios en Node.js y en el client-side javascript. Para cliente se puede usar Jasmine (http://pivotal.github.io/jasmine), para Node.js TBD.
- Buscar en el baúl la versión inicial en PHP / MySQL y subirla, ponerle comentarios pa que se entienda
- Incluir Ecobicis, Ecobús, RTP, Metrobús (Transportes no concesionados)
- Incluir Sitios de Taxis y Transporte concesionado
- Opciones de cálculo (Más barato, menos transbordos, etc)
- Integrar API de tráfico de Bing (la de Google no tiene API :S)