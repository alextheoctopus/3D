class Graph3D {
    constructor({ WINDOW }) {
        this.WINDOW = WINDOW;
        this.math = new Math3D;
    }

    zoom(delta, point) {
        this.math.zoom(delta, point);
    }

    rotateOx(alpha, point) {
        this.math.rotateOx(alpha, point);
    }

    rotateOy(alpha, point) {
        this.math.rotateOy(alpha, point);
    }

    rotateOz(alpha, point) {
        this.math.rotateOz(alpha, point);
    }

    move(sx, sy, sz, point) {
        this.math.move(sx, sy, sz, point);
    }

    xs(point) {
        const zs = this.WINDOW.CENTER.z;
        const z0 = this.WINDOW.CAMERA.z;
        const x0 = this.WINDOW.CAMERA.x;
        return (point.x - x0) / (point.z - z0) * (zs - z0) + x0;
    }

    ys(point) {
        const zs = this.WINDOW.CENTER.z;
        const z0 = this.WINDOW.CAMERA.z;
        const y0 = this.WINDOW.CAMERA.y;

        return (point.y - y0) / (point.z - z0) * (zs - z0) + y0;
    }

    calcDistance(subject, endPoint, name) {
        for (let i = 0; i < subject.polygones.length; i++) {
            const points = subject.polygones[i].points;
            let x = 0, y = 0, z = 0;
            for (let j = 0; j < points.length; j++) {
                x += subject.points[points[j]].x;
                y += subject.points[points[j]].y;
                z += subject.points[points[j]].z;
            }
            x /= points.length;
            y /= points.length;
            z /= points.length;

            subject.polygones[i][name] =
                Math.sqrt(
                    Math.pow((endPoint.x - x), 2) +
                    Math.pow((endPoint.y - y), 2) +
                    Math.pow((endPoint.z - z), 2)
                );
        }
    }

    sortByArtistAlgorithm(subject) {
        subject.polygones.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
    }

    calcIllumination(distance, lumen) {
        const illum = distance ? lumen / Math.pow(distance, 3) : 1;
        return illum > 1 ? 1 : illum;
    }
}