Surfaces.prototype.cone = (size = 7, a = 2, b = 1, c = 1 , stepMeasure = 11) => {
    step = size / stepMeasure;//StepMeasure сколько точек по каждой стороне 

    const points = [];
    
    for (let i = - size; i < size + step; i += step) {//проходим от минусовой координаты x до плюсовой
        for (let j = - size; j < size + step; j += step) {//проходим по y
            points.push(new Point(i / a, j / b, Math.sqrt(i ** 2 + j ** 2) / c));
            //points.push(new Point(i / a, j / b, -Math.sqrt(i ** 2 + j ** 2) / c));
        }
    }

    const edges = [];
    
    for (let j = 0; j < 2 * stepMeasure; j++)//X
        for (let i = j; i < points.length; i += 2 * stepMeasure + 1)
            edges.push(new Edge(i, i + 1));
    for (let i = 0; i < points.length - 2 * stepMeasure - 1; i++)//Y
        edges.push(new Edge(i, i + 2 * stepMeasure + 1));

    const polygones = []; 

    for (let i = 0; i < points.length - 4 * stepMeasure - 1; i += 2 * stepMeasure + 1)//левая нижняя точка I
        for (let j = i; j < i + 2 * stepMeasure; j++)
            polygones.push(new Polygon([j, j + 1, j + 2 * stepMeasure + 2, j + 2 * stepMeasure + 1]));

    return new Subject(points, edges, polygones);

}