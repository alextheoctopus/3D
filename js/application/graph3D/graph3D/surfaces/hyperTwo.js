Surfaces.prototype.hyperTwo = (count = 5, size = 5, a = 2, b = 1, c = 1) => {

    const points = [];
    for (let z = c + count; z >= c; z--) {
        for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI * 2 / count) {
            points.push(new Point(
                Math.pow(-1 + z ** 2 / c ** 2, 0.5) * Math.cos(alpha),
                Math.pow(-1 + z ** 2 / c ** 2, 0.5) * Math.sin(alpha),
                z
            ));
        }
    }
    for (let z = -c; z >= -c - count; z--) {
        for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI * 2 / count) {
            points.push(new Point(
                Math.pow(-1 + z ** 2 / c ** 2, 0.5) * Math.cos(alpha),
                Math.pow(-1 + z ** 2 / c ** 2, 0.5) * Math.sin(alpha),
                z
            ));
        }
    }

    const edges = [];

    for (let i = 0; i < points.length / 2 - count; i++) {
        if (points[i + 1]) {
            if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count)) //0 и 4 соединяет
            } else {
                edges.push(new Edge(i, i + 1))
            }
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count))
        }
    }
    for (let j = points.length - 1; j > points.length / 2 - 1; j--) {
        if (points[j + 1]) {
            if ((j + 1) % count === 0) {
                edges.push(new Edge(j, j + 1 - count))
            } else {
                edges.push(new Edge(j, j + 1))
            }
        }
        if (points[j + count]) {
            edges.push(new Edge(j, j + count))
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