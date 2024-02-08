class Calculator extends Component {
    constructor(options) {
        super(options);
        this.calc = new UniversalCalculator;
        this.a = null;
        this.b = null;
        this.matrixSize = 2;
        this.vectorSize = 2;
        this.clearElement();
    }
    addEventListeners() {
        document.getElementById('clearElement').addEventListener('click', () => this.clearElement());

        document.getElementById('addMatrix').addEventListener('click', () => this.addMatrix());
        document.getElementById('subMatrixsize').addEventListener('click', () => this.subMatrixsize());
        document.getElementById('addMatrixsize').addEventListener('click', () => this.addMatrixsize());

        document.getElementById('addVector').addEventListener('click', () => this.addVector());
        document.getElementById('subVectorsize').addEventListener('click', () => this.subVectorsize());
        document.getElementById('addVectorsize').addEventListener('click', () => this.addVectorsize());

        document.getElementById('add').addEventListener('click', () => this.add());
        document.getElementById('sub').addEventListener('click', () => this.sub());
        document.getElementById('mult').addEventListener('click', () => this.mult());
        document.getElementById('div').addEventListener('click', () => this.div());

        document.getElementById('addComplex').addEventListener('click', () => this.addComplex());

    }
    fillInfo() {
        const divElem = document.getElementById('calcElement');
        if (typeof this.a === 'number') {
            divElem.innerHTML = 'Вещественное число';
        } else if (this.a instanceof Complex) {
            divElem.innerHTML = 'Комплексное число'
        }
        document.getElementById('matrixSize').innerHTML = `Размер матрицы:${this.matrixSize}`;
        document.getElementById('vectorSize').innerHTML = `Длина вектора:${this.vectorSize}`;
    }
    clearElement() {
        this.a = this.calc.zero();
        this.b = this.calc.zero();
        this.fillInfo();
    }
    addMatrix() {
        const values = [];
        for (let i = 0; i < this.matrixSize; i++) {
            values.push([]);
            for (let j = 0; j < this.matrixSize; j++) {
                values[i].push(this.a);
            }
        }
        this.a = this.calc.zero(null, this.calc.matrix(values));
        this.b = this.calc.zero(null, this.calc.matrix(values));
        this.fillInfo();
    }
    addMatrixsize() {
        this.matrixSize++;
        this.fillInfo();
    }
    subMatrixsize() {
        if (this.matrixSize > 1) {
            this.matrixSize--;
        }
        this.fillInfo();
    }
    addvector() {//а я не знаю чо тут происходит
        const values = [];
        for (let i = 0; i < this.vectorSize; i++) {
            values.push(this.a);
        }
        this.a = this.calc.zero(null, this.calc.vector(values));
        this.b = this.calc.zero(null, this.calc.vector(values));
        this.fillInfo();
    }
    addVectorsize() {
        this.matrixSize++;
        this.fillInfo();
    }
    subVectorsize() {
        if (this.vectorSize > 1) {
            this.vectorSize--;
        }
        this.fillInfo();

    }
    fillCalculator() {
        document.getElementById('elemB').innerHTML = this.getCalculatorHTML(this.b, 'b');
        document.getElementById('elemA').innerHTML = this.getCalculatorHTML(this.a, 'a');
    }
    genCalculatorHTML(elem, className) {
        if (elem instanceof Matrix) {
            return this.genMatrixHTML(elem.values.length, this.genCalculatorHTML(elem.values[0][0], className));
        } else if (elem instanceof Vector) {
            return this.genVectorHTML(elem.values.length,
                this.genCalculatorHTML(elem.values[0].className));
        } else if (elem instanceof Complex) {
            return `<input class='${className}' value='${elem.re}'>+i*<input class='${className}' value='${elem.im}'>`
        } return `<input class='${className}' value='${elem}'>`;

    }
    genMatrixHTML(size, elem) {
        let str = '';
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                str += `${elem}, `;
            } str += '<br>';
        } return `<span>(</span>${str}<span>)</span>`;
    }
    genVectorHTML(size, elem) {
        let str = '';
        for (let i = 0; i < size; i++) {
            str += `${elem}, `;
        } return `<span>(</span>${str}<span>)</span>`;
    }
    addElments() {
        this.fillelements();
        const c = this.calc.add(this.a, this.b);

    }
    subElemts() {
        this.fillelements();
        const c = this.calc.sub(this.a, this.b);

    }
    divElements() {
        this.fillelements();
        const c = this.calc.div(this.a, this.b);
    }
    multElements() {
        this.fillelements();
        const c = this.calc.mult(this.a, this.b);
    }
    fillElements() {
        this.goToElementValues(this.a, document.querySelectorAll('.a'));
        this.goToElementValues(this.b, document.querySelectorAll('.b'));
    }
    goToElementValues(elem, values, num = 0, length = 0) {
        if (elem instanceof Matrix) {
            elem.values.forEach((column, j) => column.forEach((el, i) => {
                const index = j * elem.vakues.length + 1;
                if (typeof el === 'number') {
                    elem.values[j][i] = values[index].value - 0;
                }
                else {
                    this.goToElementValues(elem.values[i][j], values, index, elem.values, length + 1);
                }
            }));
        } else if (elem instanceof Vector) {
            elem.values.forEach((el, i) => {
                const index = i + num * length;
                if (typeof el === 'number') {
                    elem.values[i] = values[index].value - 0;
                } else {
                    this.goToElementValues(elem.values[i], values, index, elem.values.length + 1);
                }
            });
        } else if (elem instanceof Complex) {
            elem.re = values[num * 2].value - 0;
            elem.im = values[num * 2 + 1].value - 0;
        }
    }
}