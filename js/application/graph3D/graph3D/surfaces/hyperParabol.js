Surfaces.prototype.hyperParabol = (count = 2, size = 3, p = 8, q = 7) => {

    const points = [];
    for (let x = -10; x < 10; x++) {
        for (let y = -10; y < 10; y++) {
            points.push(new Point(
                x,
                y,
                (x ** 2) / (2 * p) - (y ** 2) / (2 * q)
            ));
        }
    }

    const edges = [];
    for (let i = 0; i < points.length - 1; i++) {
        if (points[i + 1]) {//по дугам рисует
            if ((i + 1) % 20 === 0) {
                edges.push(new Edge(i, i));
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
    }
    for (let j = 0; j < points.length - 1; j++) {
        if (points[j + 1] && points[j + 20]) {
            if ((j + 1) === 400) {
                edges.push(new Edge(j, j));
            } else {
                edges.push(new Edge(j, j + 20));
            }
        }
    }

    const polygones = [];
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) % 20 === 0) {
            polygones.push(
                new Polygon(
                    [
                        i,
                        i,
                        i,
                        i//почему + а не -
                    ]))
        } else {
            if (points[i + 20 + 1])
                polygones.push(
                    new Polygon([
                        i,
                        i + 1,
                        i + 1 + 20,
                        i + 20
                    ])
                )
        }
    }

    return new Subject(points, edges, polygones );
}
