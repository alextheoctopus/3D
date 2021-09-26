class ComplexCalculator extends RealCalculator {
    add(a, b) {
        return new Complex(
            super.add(a.re, b.re),
            super.add(a.im, b.im)
        )

    }
    sub(a, b) {
        return new Complex(
            super.sub(a.re, b.re),
            super.sub(a.im, b.im)
        )
    }
    mult(a, b) {
        return new Complex(
            super.sub(super.mult(a.re, b.re), super.mult(a.im, b.im)),
            super.add(super.mult(a.re, b.im), super.mult(a.im, b.re))
        )
    }

    div(a, b) {
        const c = super.mult(b.re, b.re);
        const d = super.mult(b.im, b.im);
        return new Complex(
            super.div(super.add(super.mult(a.re, b.re), super.mult(a.im, b.im)), super.add(c, d)),
            super.div(super.sub(super.mult(b.re, a.im), super.mult(a.re, b.im)), super.add(c, d))
        )
    }
    prod(a, b) {
        return new Complex(
            super.mult(a, b.re),
            super.mult(a, b.im)
        )
    }

    pow(a, b) {
        let z = a;
        let i = 1;
        while (i < b) {
            z = this.mult(z, a);
            i++;
        }
        return z;
    }

    one(a) {
        return new Complex(1)
    }

    zero(a) {
        return new Complex(0)    
    }

    abs(a) {
        return super.pow(super.add(super.pow(a.re, 2), super.pow(a.im, 2)), 0.5);
    }

}