Template.prototype.graph3dTemplate = () => `
    <canvas id="canvas3D"></canvas>

<div id="options3D">
    <div>
        <input type="checkbox" id="checkPoint"> </input>
        <label for="checkPoint">Отображать вершины</label>
    </div>
    <div>
        <input type="checkbox" id="checkEdge"> </input>
        <label for="checkEdge">Отображать ребра</label>
    </div>
    <div>
        <input type="checkbox" id="checkPolygone"> </input>
        <label for="checkPolygone">Отображать грани</label>
    </div>
</div>
    <div id="surfaces">
       <button id="cone">Конус</button>
       <button id="sphere">Сфера</button>
       <button id="ellipse">Эллипс</button>
       <button id="hyperCylinder">Гиперболический цилиндр</button>
       <button id="ellipseCylinder"> Эллиптический цилиндр</button>
       <button id="cube">Куб</button>
       <button id="hyperOne">1 гиперболоид</button>
       <button id="hyperTwo">2 гиперболоид</button>
       <button id="hyperParabol">Седло</button>
    </div>
`;
