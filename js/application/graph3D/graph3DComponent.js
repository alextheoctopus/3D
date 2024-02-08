class graph3DComponent extends Component {
    constructor(options) {

        super(options);
        this.WINDOW = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50)
        }

        this.graph2D = new Graph({
            id: 'canvas3D',
            width: 640,
            height: 640,
            WINDOW: this.WINDOW,
            callbacks: {
                mousewheel: (event) => this.mousewheel(event),
                mouseup: () => this.mouseup(),
                mouseout: () => this.mouseout(),
                mousedown: (event) => this.mousedown(event),
                mousemove: (event) => this.mousemove(event)
            }
        });

        this.ui = new UIGraph3D({
            callbacks: {
                checkPoints: () => this.showPoints = (this.showPoints) ? false : true,
                checkEdges: () => this.showEdges = (this.showEdges) ? false : true,
                checkPolygones: () => this.showPolygones = (this.showPolygones) ? false : true,

                setCone: () => this.setSurface(this.cone),
                setCube: () => this.setSurface(this.cube),
                setHyperOne: () => this.setSurface(this.hyperOne),
                setHyperTwo: () => this.setSurface(this.hyperTwo),
                setHyperParabol: () => this.setSurface(this.hyperParabol),
                setSphere: () => this.setSurface(this.sphere),
                setEllipse: () => this.setSurface(this.ellipse),
                setHyperCylinder: () => this.setSurface(this.hyperCylinder),
                setEllipseCylinder: () => this.setSurface(this.ellipseCylinder),

            }
        });

        document.addEventListener('keydown', (event) => this.keydown(event));

        this.LIGHT = new Light(-40, 2, 0, 25000);
        const sur = new Surfaces;
        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.sur = new Surfaces;

        this.cone = this.sur.cone();
        this.hyperOne = this.sur.hyperOne();
        this.hyperTwo = this.sur.hyperTwo();
        this.hyperParabol = this.sur.hyperParabol();
        this.sphere = this.sur.sphere();
        this.ellipse = this.sur.ellipse();
        this.hyperCylinder = this.sur.hyperCylinder();
        this.ellipseCylinder = this.sur.ellipseCylinder();

        this.cube = this.sur.cube(-5, -5);

        this.subjects = [];

        this.showPoints = true;
        this.showPolygones = false;
        this.showEdges = true;
        document.getElementById("checkPoint").checked = true;
        document.getElementById("checkEdge").checked = true;
        this.canRotate = false;
        this.dx = 0;
        this.dy = 0;

        this.printScene();
    }

    mouseup() {
        this.canRotate = false;
    }

    mouseout() {
        this.canRotate = false;
    }

    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    mousemove(event) {
        if (this.canRotate) {
            const gradus = 2 * Math.PI / 3600;
            this.subjects.forEach(subject =>
                subject.points.forEach(point => {
                    this.graph3D.rotateOy((this.dx - event.offsetX) * gradus, point);
                    this.graph3D.rotateOx((this.dy - event.offsetY) * gradus, point);
                })
            );
            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.printScene();
        }
    }

    clear() {
        this.graph2D.clear();
    }

    mousewheel(event) {
        let delta = (event.deltaY > 0) ? 1.1 : 0.9;
        this.subjects.forEach(subject => subject.points.forEach(point => this.graph3D.zoom(delta, point)));
        this.printScene();
    }
    printSubject(subject) {

        this.graph3D.calcDistance(subject, this.WINDOW.CAMERA, 'distance');
        this.graph3D.calcDistance(subject, this.LIGHT, 'lumen');
        //this.graph3D.sortByArtistAlgorithm(subject);
        //полигоны
        if (this.showPolygones) {
            for (let i = 0; i < subject.polygones.length; i++) {
                const polygon = subject.polygones[i];
                const array = [];
                const points = polygon.points;
                for (let j = 0; j < points.length; j++) {
                    array.push({
                        x: this.graph3D.xs(subject.points[points[j]]),
                        y: this.graph3D.ys(subject.points[points[j]])
                    });
                }
                function color() {
                    return {
                        r: Math.round(Math.random()* 255),
                        g: Math.round(Math.random()* 255) ,
                        b: Math.round(Math.random()* 255)
                    }
                }

                let { r, g, b } = color();

                const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                // let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph2D.drawPolygon(array, polygon.rgbToHex(r, g, b),color);

            }
        }
        //ребра
        if (this.showEdges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                const p1 = subject.points[edge.p1];
                const p2 = subject.points[edge.p2];
                this.graph2D.drawLine(
                    this.graph3D.xs(p1), this.graph3D.ys(p1),
                    this.graph3D.xs(p2), this.graph3D.ys(p2)
                );/* 
                const edges = subject.edges[i];
                let r = 0;
                let g = 50;
                let b = 255;
                for (let i = 0; i < subject.edges.length; i += 3) {
                    const edge = subject.edges[i];
                    this.graph2D.drawPoint(this.graph3D.xs(point), this.graph3D.ys(point), `rgb(${r}, ${g}, ${b})`);
                    r += 10;
                    g += 10;
                    b -= 1;
                } */
            }
        }
        //рисуем точки
        if (this.showPoints) {
            for (let i = 0; i < subject.points.length; i++) {
                const point = subject.points[i];
                this.graph2D.drawPoint(this.graph3D.xs(point), this.graph3D.ys(point));
                this.graph2D.drawText(this.graph3D.xs(point), this.graph3D.ys(point), i, 16, 5, 5);
                /*  const point = subject.points[i];
                 let r = 0;
                 let g = 50;
                 let b = 255;
                 for (let i = 0; i < subject.points.length; i+=3) {
                     const point = subject.points[i];
                     this.graph2D.drawPoint(this.graph3D.xs(point), this.graph3D.ys(point), `rgb(${r}, ${g}, ${b})`);
                     r += 10;
                     g += 10;
                     b -= 1; 
                 }*/
            }
        }

    }

    setSurface(surface) {
        this.subjects = [];
        this.subjects.push(surface);
    }

    printScene() {
        this.clear();
        for (let i = 0; i < this.subjects.length; i++) {
            this.printSubject(this.subjects[i]);
        }
    }
}

