class VectorCalculator extends RealCalculator {
    add(a, b) {
        const calc = this.get(a.values[0]);
        return new VectorCalculator(a.values.map((elem, i) => calc.add(elem, b.values[i])));
    }
    sub(a, b) {
        const calc = this.get(a.values[0]);
        return new VectorCalculator(a.values.map((elem, i) => calc.sub(elem, b.values[i])));
    }
    prod(a, b) {
        const calc = this.get(a.values[0]);
        return new VectorCalculator(a.values.map((elem, i) => calc.prod(elem, b.values[i])));
    }
    mult(a, b) {
        const calc = this.get(a.values[0]);
        if (a.length === 3) {
            return new Vector([
                calc.sub(calc.mult(a[1], b[2]), calc.mult(a[2], b[1])),
                calc.sub(calc.mult(a[2], b[0]), calc.mult(a[0], b[2])),
                calc.sub(calc.mult(a[0], b[1]), calc.mult(a[1], b[0]))
            ]);
        }
    }
    div(a, b) {
        return null;
    }
    one(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.type(calc, elem, 'one'));
        }
        return new Vector(values);
    }
    zero(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.type(calc, elem, 'zero'));
        }
        return new Vector(values);
    }
    pow(a,n){
        let c = this.one(a.values.length, a.values[0]);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }
}