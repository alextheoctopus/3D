class RealCalculator {
    add(a, b) {
        return a + b;
    }
    sub(a, b) {
        return a - b;
    }
    mult(a, b) {
        return a * b;
    }
    div(a, b) {
        return a / b;
    }
    pow(a, b) {
        return a ** b;
    }
    one() {
        return 1;
    }
    prod(a, b) {
        return a * b;
    }
    zero() {
        return 0;
    }
    sin(a) {
        return Math.sin(a);
    }
    cos(a) {
        return Math.cos(a);
    }
    atan(a) {
        return Math.atan(a);
    }
    sqrt(a) {
        Math.sqrt(a);
    }
    abs(a) {
        return Math.abs(a);
    }

    get(a) {
        return (a instanceof Matrix) ? new MatrixCalculator :
            (a instanceof Complex) ? new ComplexCalculator :
                (a instanceof Vector) ? new VectorCalculator :
                    new RealCalculator;
    }

    type(calc, elem, method) {
        if (elem instanceof Matrix) {
            return calc[method](elem.values.length, elem.values[0][0])
        } else if (elem instanceof Vector) {
            return calc[method](elem.values.length, elem.values[0]);
        } return calc[method]();
    }

}