Surfaces.prototype.ellipse = (count = 10, r = 1, a = 1, b = 2) => {

    const points = [];
    for (let teta = 0; teta <= Math.PI; teta += Math.PI / count) {
        for (let fi = 0; fi < Math.PI * 2; fi += Math.PI / count) {
            points.push(new Point(
                r * Math.cos(fi) * Math.sin(teta) * a,
                r * Math.sin(fi) * Math.sin(teta) * b,
                r * Math.cos(teta)
            ));
        }
    }

    
    const edges = [];

    for (let i = 0; i <= points.length - 1; i++) {
        if (points[i + 1]) {
            if ((i + 1) % (2 * count) === 0) {
                edges.push(new Edge(i, i - 2 * count + 1)) //0 и 4 соединяет
            } else {
                edges.push(new Edge(i, i + 1))
            }
        }
        if (points[i + 2 * count]) {
            edges.push(new Edge(i, i + 2 * count))
        }
    }

    const polygones = [];
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) % (2 * count) === 0) {
            if (points[i + 2 * count]) {
                polygones.push(
                    new Polygon(
                        [
                            i,
                            i + 1 - 2 * count,
                            i + 1,
                            i + 2 * count,//почему + а не -
                        ])
                );
            }
        } else {
            if (points[i + 2 * count + 1])
                polygones.push(
                    new Polygon([
                        i,
                        i + 1,
                        i + 1 + 2 * count,
                        i + 2 * count
                    ])
                )
        }
    }

    return new Subject(points, edges, polygones);

}