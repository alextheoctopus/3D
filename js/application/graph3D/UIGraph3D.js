class UIGraph3D {
    constructor({ callbacks }) {
        document.getElementById('checkPoint').addEventListener('change', () => callbacks.checkPoints());
        document.getElementById('checkEdge').addEventListener('change', () => callbacks.checkEdges());
        document.getElementById('checkPolygone').addEventListener('change', () => callbacks.checkPolygones());
        document.getElementById('cube').addEventListener('click', () => callbacks.setCube());
        document.getElementById('cone').addEventListener('click', () => callbacks.setCone());
        document.getElementById('hyperOne').addEventListener('click', () => callbacks.setHyperOne());
        document.getElementById('hyperTwo').addEventListener('click', () => callbacks.setHyperTwo());
        document.getElementById('hyperParabol').addEventListener('click', () => callbacks.setHyperParabol());
        document.getElementById('sphere').addEventListener('click', () => callbacks.setSphere());
        document.getElementById('ellipse').addEventListener('click', () => callbacks.setEllipse());
        document.getElementById('hyperCylinder').addEventListener('click', () => callbacks.setHyperCylinder());
         document.getElementById('ellipseCylinder').addEventListener('click', () => callbacks.setEllipseCylinder());
 


    }
}