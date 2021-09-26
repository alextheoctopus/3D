Template.prototype.graph2DTemplate = () =>
    ` <button id="toggleMenu">Отобразить/скрыть меню</button>
    <br>
    <canvas id="canvas" ></canvas>
    <div id="menu">
        <button id="addFunction">Добавить ф-цию</button>
        <br>
        <input id="a" placeholder="a" class="graphFuncInput"></input>
        <input id="b" placeholder="b" class="graphFuncInput"></input>
        <br>
        <div id="functions"></div>
    </div>`;