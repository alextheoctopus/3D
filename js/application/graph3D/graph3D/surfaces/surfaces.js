class Surfaces {
    drawEdges(points, stepMeasure) {
        const edges = [];
        for (let j = 0; j < 2 * stepMeasure; j++)
            for (let i = j; i < s.length; i += 2 * stepMeasure + 1)
                edges.push(new Edge(i, i + 1));
        for (let i = 0; i < points.length - 2 * stepMeasure - 1; i++)
            edges.push(new Edge(i, i + 2 * stepMeasure + 1));
        return edges;
    }

    drawPolygones(points, stepMeasure) {
        const polygones = [];
        for (let i = 0; i < points.length - 2 * stepMeasure - 1; i += 2 * stepMeasure + 1)
            for (let j = i; j < i + 2 * stepMeasure; j++)
                polygones.push(new Polygon([j, j + 1, j + 2 * stepMeasure + 2, j + 2 * stepMeasure + 1]));
        return polygones;
    }
}