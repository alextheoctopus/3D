class Graph2D extends Component {
    constructor(options) {
        super(options)
        this.funcs = [];
        this.WINDOW = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20
        }
        this.graph = new Graph({
            id: "canvas",
            width: 800,
            height: 800,
            WINDOW: this.WINDOW,
            callbacks: {
                mouseUp: this.mouseUp,
                mouseDown: this.mouseDown,
                mouseMove: this.mouseMove,
                mouseWheel: this.mouseWheel,
                mouseout: this.mouseout
            }
        });
        this.ui = new UI({
            callbacks: {
                enterFunction: this.enterFunction,
                removeFunction: this.removeFunction,
                setIntegral: this.setIntegral
            }
        });
        this.zoomStep = 1;
        this.zeroes = 0.5;
        this.canDragGraph = false;
        this.mouseX = 0;
        this.renderOne();
    }

    mouseWheel = (event) => {
        var delta = event.deltaY > 0 ? this.zoomStep : -this.zoomStep;
        if (this.WINDOW.WIDTH + delta > 0) {
            this.WINDOW.WIDTH += delta;
            this.WINDOW.HEIGHT += delta;
            this.WINDOW.LEFT -= delta / 2;
            this.WINDOW.BOTTOM -= delta / 2;
        }
        this.renderOne();
    }

    mouseMove = (event) => {
        if (this.canDragGraph) {
            this.WINDOW.LEFT += -event.movementX / this.graph.getUnitPixelSizeX();
            this.WINDOW.BOTTOM += event.movementY / this.graph.getUnitPixelSizeY();
        }
        this.mouseX = this.WINDOW.LEFT + (event.offsetX / this.graph.getUnitPixelSizeX());
        this.renderOne();
    }

    mouseDown = () => {
        this.canDragGraph = true;
    }

    mouseUp = () => {
        this.canDragGraph = false;
    }

    mouseout = () => {
        this.canDragGraph = false;
    }

    findFuncZero = (func, start, end, eps = 0.01) => {
        var x;
        var a = start;
        var b = end;
        eps *= 2;
        while (Math.abs(a - b) > eps) {
            x = (a + b) / 2;
            if (func(a) * func(x) < 0) {
                b = x;
            } else {
                a = x;
            }
        }
        x = (a + b) / 2;
        if (Math.abs(func(x) - 0) > eps)
            return null;
        else
            return x;
    }

    markFuncZeros = (func, a, b) => {
        var iterCount = 10;
        var delta = Math.abs(b - a) / iterCount;
        var startX = a;
        for (var i = 0; i < iterCount; ++i) {
            var endX = startX + delta;
            var zeroX = this.findFuncZero(func, startX, endX, 0.001);
            if (zeroX != null) {
                this.graph.drawPoint(zeroX, func(zeroX), "red", 1);
            }
            startX = endX;
        }
    }

    getTangentFunc = (f) => {
        return (x) => {
            var x0 = this.mouseX;
            var k = this.getDerivative(f, x0);
            var b = f(x0);
            return k * (x - x0) + b;
        }
    }

    getTangentIntersectX = (f) => {
        var x0 = this.mouseX;
        var k = this.getDerivative(f, x0);
        var b = f(x0);
        return -b / k + x0;
    }

    getDerivative(func, x) {
        var deltaX = 0.001;
        var deltaY = func(x + deltaX) - func(x);
        return deltaY / deltaX;
    }

    calcIntegral(f, a, b) {
        var dx = (b - a) / 1000;
        var x = a;
        var sum = 0;
        while (x <= b) {
            sum += (Math.abs(f(x)) + Math.abs(f(x + dx))) / 2 * dx;
            x += dx;
        }
        return sum;
    }

    enterFunction = (func, num, color, width) => {
        this.funcs[num] = {
            func,
            color,
            width
        };
        this.renderOne();
    }

    removeFunction = (num) => {
        this.funcs[num] = null;
        this.renderOne();
    }

    setIntegral = (isChecked, num) => {
        if (this.funcs[num]) {
            this.funcs[num].integral = isChecked;
            this.renderOne();
        }
    }

    drawFuncGraph(func, color, lineWidth, subdivCount = 1000) {
        var startX = this.WINDOW.LEFT;
        var deltaX = this.WINDOW.WIDTH / subdivCount;
        for (var i = 0; i < subdivCount - 1; ++i) {
            var x = startX + deltaX * i;
            this.graph.drawLine(x, func(x), x + deltaX, func(x + deltaX), color, lineWidth);
        }
    }

    drawFuncIntegral(f, a, b) {
        const divCount = 100;
        if (!isNaN(a) && !isNaN(b) && a != b) {
            if (a > b) {
                var tmp = b;
                b = a;
                a = temp;
            }
            var dx = (b - a) / divCount;
            var x = a;
            var points = [];
            points.push({ x: a, y: 0 });
            while (x <= b) {
                points.push({ x, y: f(x) });
                x += dx;
            }
            points.push({ x: b, y: 0 });
            this.graph.drawPolygon(points);
        }
    }

    drawDerivAngle(intersectX, derValue) {
        var arcAngle = Math.atan(derValue);
        var text = "tg a = " + derValue.toFixed(2);
        if (arcAngle < 0) {
            arcAngle -= Math.PI;
            this.graph.drawText(intersectX, 0, text, 12, 25, 0, "#7b917b", true);
            this.graph.drawArc(intersectX, 0, 25, 0, arcAngle);
        } else {
           
            this.graph.drawText(intersectX, 0, text, 12, 25, 0, "#7b917b", true);
            this.graph.drawArc(intersectX, 0, 25, 0, arcAngle);
        }
    }

    renderOne() {
        this.graph.clear();
        this.graph.drawAxes();

        for (var i = 0; i < this.funcs.length; ++i) {
            if (this.funcs[i]) {
                this.drawFuncGraph(this.funcs[i].func, this.funcs[i].color, this.funcs[i].width);
                this.drawFuncGraph(this.getTangentFunc(this.funcs[i].func), "green", this.funcs[i].width);

                if (this.funcs[i].integral) {
                    const values = this.ui.getAB();
                    const a = values.a;
                    const b = values.b;
                    this.drawFuncIntegral(this.funcs[i].func, a, b);
                    this.graph.drawText((a - b), 0, derValue.toFixed(2), 12, 25, 0, "#7b917b", true);
                }

                var intersectX = this.getTangentIntersectX(this.funcs[i].func);
                this.drawDerivAngle(intersectX, this.getDerivative(this.funcs[i].func, this.mouseX));
                this.markFuncZeros(this.funcs[i].func, 0, 4);
            }
        }
    }
}