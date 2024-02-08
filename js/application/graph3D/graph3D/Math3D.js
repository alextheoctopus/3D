class Math3D {
    multMatrix(T, m) {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += T[i][j] * m[j];
            }
            c[i] = s;
        }
        return c;
    }

    zoom(delta, point) {
        const array = this.multMatrix(
            [[delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    move(dx, dy, z, point) {
        const array = this.multMatrix([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0]
            [dx, dy, dz, 1]],
            [point.x, point.y, point.z]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateOx(alpha, point) {
        const array = this.multMatrix(
            [[1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateOy(alpha, point) {
        const array = this.multMatrix(
            [[Math.cos(alpha), 0, -Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateOz(alpha, point) {
        const array = this.multMatrix(
            [[Math.cos(alpha), Math.sin(alpha), 0, 0],
            [-Math.sin(alpha), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
}