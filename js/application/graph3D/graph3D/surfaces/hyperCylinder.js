Surfaces.prototype.hyperCylinder = (size = 10, a = 10, stepsInUnit = 12) => {

    step = size / stepsInUnit;

    const points = [];

    for (let i = - size; i < size + step; i += step) {
        for (let j = - size; j < size + step; j += step) {
            points.push(new Point(i, j, + Math.sqrt((1 + j ** 2 / size ** 2) * (a ** 2))));
        }
    }
    
    for (let i = - size; i < size + step; i += step) {
        for (let j = - size; j < size + step; j += step) {
            points.push(new Point(i, j, - Math.sqrt((1 + j ** 2 / size ** 2) * (a ** 2))));
        }
    }


    const edges = [];
    for (let j = 0; j < 2 * stepsInUnit; j++)
        for (let i = j; i < points.length; i += 2 * stepsInUnit + 1)
            edges.push(new Edge(i, i + 1));
    for (let i = 0; i < points.length / 2 - 2 * stepsInUnit - 1; i++)
        edges.push(new Edge(i, i + 2 * stepsInUnit + 1));
    for (let i = points.length / 2; i < points.length - 2 * stepsInUnit - 1; i++)
        edges.push(new Edge(i, i + 2 * stepsInUnit + 1));


    const polygones = [];
    for (let i = 0; i < points.length / 2 - 2 * stepsInUnit - 1; i += 2 * stepsInUnit + 1)
        for (let j = i; j < i + 2 * stepsInUnit; j++)
            polygones.push(new Polygon([j, j + 1, j + 2 * stepsInUnit + 2, j + 2 * stepsInUnit + 1]));
    for (let i = points.length / 2; i < points.length - 2 * stepsInUnit - 1; i += 2 * stepsInUnit + 1)
        for (let j = i; j < i + 2 * stepsInUnit; j++)
            polygones.push(new Polygon([j, j + 1, j + 2 * stepsInUnit + 2, j + 2 * stepsInUnit + 1]));


    return new Subject(points, edges, polygones);

}