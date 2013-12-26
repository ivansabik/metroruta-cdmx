dijkstra = new Object();

/*
 * dijkstra.js
 *
 * Dijkstra's single source shortest path algorithm in JavaScript.
 *
 * Cameron McCormack <cam (at) mcc.id.au>
 *
 * Permission is hereby granted to use, copy, modify and distribute this
 * code for any purpose, without fee.
 *
 * Initial version: October 21, 2004
 */

dijkstra.construyePuntosRuta = function(edges, numVertices, startVertex) {
    startVertex -= 1;
    var done = new Array(numVertices);
    done[startVertex] = true;
    var pathLengths = new Array(numVertices);
    var predecessors = new Array(numVertices);
    for (var i = 0; i < numVertices; i++) {
        pathLengths[i] = edges[startVertex][i];
        if (edges[startVertex][i] != Infinity) {
            predecessors[i] = startVertex;
        }
    }
    pathLengths[startVertex] = 0;
    for (var i = 0; i < numVertices - 1; i++) {
        var closest = -1;
        var closestDistance = Infinity;
        for (var j = 0; j < numVertices; j++) {
            if (!done[j] && pathLengths[j] < closestDistance) {
                closestDistance = pathLengths[j];
                closest = j;
            }
        }
        done[closest] = true;
        for (var j = 0; j < numVertices; j++) {
            if (!done[j]) {
                var possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
                if (possiblyCloserDistance < pathLengths[j]) {
                    pathLengths[j] = possiblyCloserDistance;
                    predecessors[j] = closest;
                }
            }
        }
    }
    return {
        "startVertex": startVertex,
        "pathLengths": pathLengths,
        "predecessors": predecessors
    };
}

dijkstra.construyeRuta = function(shortestPathInfo, endVertex) {
    endVertex -= 1;
    var tiempo = shortestPathInfo.pathLengths[endVertex];
    var estacionInicio = shortestPathInfo.startVertex;
    var path = [];
    while (endVertex != shortestPathInfo.startVertex) {
        path.unshift(endVertex);
        endVertex = shortestPathInfo.predecessors[endVertex];
    }
    path.unshift(estacionInicio);
    var puntosRuta = new Array();
    for (var i = 0; i < path.length - 1; i++) {
        var estacionOrigen = metro.buscarEstacion(path[i] + 1);
        var estacionDestino = metro.buscarEstacion(path[i+1] + 1);
        if (estacionOrigen.nombre == estacionDestino.nombre)
            puntosRuta.push({
                tipoPunto: "transbordo", 
                estacionOrigen: estacionOrigen, 
                estacionDestino: estacionDestino
            });
        else {
            var direccion = metro.determinaDireccion(estacionOrigen, estacionDestino);
            puntosRuta.push({
                tipoPunto: "tramo", 
                estacionOrigen: estacionOrigen, 
                estacionDestino: estacionDestino,
                direccion: direccion
            });
        }
    }
    return {
        "puntosRuta": puntosRuta, 
        "tiempo": tiempo
    };
}         