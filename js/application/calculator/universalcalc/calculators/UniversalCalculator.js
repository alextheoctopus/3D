class UniversalCalculator extends RealCalculator {
    complex(re, im) {
        return new Complex(re, im);
    }
    vector(values) {
        return new Vector(values);
    }
    matrix(values) {
        return new Matrix(values);

    }
    add(a, b) {
        return this.get(a).add(a, b);
    }
    sub(a, b) {
        return this.get(a).sub(a, b);
    }
    mult(a, b) {
        return this.get(a).mult(a, b);
    }
    div(a, b) {
        return this.get(a).div(a, b);
    }
    prod(a, p) {
        if (typeof p === 'number') {
            return this.get(a).prod(a, p);
        }
        return null;
    }
    pow(a, n) {
        if (typeof n === 'number') {
            return this.get(a).pow(a, n);
        }
        return null;
    }
    one(type, elem) {
        type = type ? type : elem ?
            elem.constructor.name : null;
        switch (type) {
            case 'Complex': return (new ComplexCalculator).one();//?
            case 'Vector': return (new VectorCalculator).one(elem.values.length, elem.values[0]);
            case 'Matrix': default: return super.one();
        }
    }

}
class Member {
    constructor(value = 0, power = 0) {
        this.value = value;
        this.power = power;
    }
}
class Polynomial {
    constructor(members = []) {
        this.poly = members;
        this.poly.sort((a, b) => b.pow - a.pow);
    }
    getValue(x) {
        const calc = new UniversalCalculator;
        return this.poly.reduce((S, elem) =>
            calc.add(S, calc.mult(elem.value, calc.pow(x, elem.power))),
            calc.zero(null, x)
        );
    }
}