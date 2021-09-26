class App extends Component {
    constructor(options) {
        super(options);
        this.header = new Header({
            id: 'header',
            parent: this.id,
            template: template.headerTemplate,
            callbacks: {
                showGraph2D: () => this.showGraph2D(),
                showGraph3D: () => this.showGraph3D(),
                showCalculator: () => this.showCalculator(),
            }
        });
        this.graph2D = new Graph2D({
            id: 'graph2D',
            parent: this.id,
            template: template.graph2DTemplate,
        });
        this.graph3D = new graph3DComponent({
            id: 'graph3D',
            parent: this.id,
            template: template.graph3dTemplate,
        });
        this.calculator = new Calculator({
            id: 'calculator',
            parent: this.id,
            template: template.calculatorTemplate,
        });

        // start point
        this.graph3D.hide();
        this.calculator.hide();
    }

    showGraph2D() {
        this.graph2D.show();
        this.graph3D.hide();
        this.calculator.hide();
    };
    showGraph3D() {
        this.graph2D.hide();
        this.graph3D.show();
        this.calculator.hide();
    };
    showCalculator() {
        this.graph2D.hide();
        this.graph3D.hide();
        this.calculator.show();
    };
}
