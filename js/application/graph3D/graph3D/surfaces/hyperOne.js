Surfaces.prototype.hyperOne = (count = 10, size = 7, a = 2, b = 1, c = 1, alpha) => {
    const points = [];
    for (let z = -count; z <= count; z++) {
        for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI * 2 / count) {
            points.push(
                new Point(
                    Math.pow(1 + z ** 2 / c ** 2, 0.5) * Math.cos(alpha),
                    Math.pow(1 + z ** 2 / c ** 2, 0.5) * Math.sin(alpha),
                    z)
            )
        }
    }
    const edges = [];
    for (let i = 0; i < points.length; i++) {
        if (points[i + 1]) {
            if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count))
            } else {
                edges.push(new Edge(i, i + 1))
            }
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count))
        }
    }

    const polygones = [];
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) % count === 0) {
            if (points[i + count]) {
                polygones.push(
                    new Polygon(
                        [
                            i,
                            i + 1 - count,
                            i + 1,
                            i + count,//почему + а не -
                        ])
                );
            }
        } else {
            if (points[i + count + 1])
                polygones.push(
                    new Polygon([
                        i,
                        i + 1,
                        i + 1 + count,
                        i + count
                    ])
                )
        }
    }
    return new Subject(points, edges, polygones);
}