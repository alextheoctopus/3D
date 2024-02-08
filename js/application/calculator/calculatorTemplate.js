Template.prototype.calculatorTemplate = () => `
    <div>
        <div class='info'>
            <div id='calcElement'>Информация по элементу</div>
            <div id='matrixSize'>Размер матрицы</div>
            <div id='vectorSize'>Длина вектора</div>
            <button id='clearElement'>Очистить</button>
        </div>
        <div class='contols'>
            <div>
                <button id='addMatrix'>+</button>
                <button id='subMatrixsize'>-</button>
                <button id='addMatrixsize'>+</button>

                <button id='addVector'>+</button>
                <button id='subVectorsize'>-</button>
                <button id='addVectorsize'>+</button>

                <button id='addComplex'>+Комплексное число</button>
            </div>
        </div>
        <div class='calculator'>
            <div id='elemA'></div>
            <div>
                <button id='add'>сложение</button>
                <button id='sub'>вычитание</button>
                <button id='mult'>умножение</button>
                <button id='div'>деление</button>
            </div>
            <div id='elemB'></div>
        </div>
    </div>
`