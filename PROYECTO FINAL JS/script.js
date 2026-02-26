const CONFIGURACION = {

    modo: null,          // "CPU", "LOCAL", "ONLINE"
    gridSize: 5,         // 5, 7, 10
    cpuLevel: "easy",    // easy, medium, hard
    timerEnabled: false,
    timeLimit: 60        // seconds

};

const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;
let margin = 40;
let spacing;

const btnCPU = document.getElementById('btnCPU');
const btnLocal = document.getElementById('btnLocal');
const btnInstrucciones = document.getElementById('btnInstrucciones');
const btnCrearSala = document.getElementById('btnCrearSala');
const btnUnirse = document.getElementById('btnUnirse');
const btnOnline = document.getElementById('btnOnline');
const btnVolver = document.querySelectorAll('.btnVolver');
const btnStart = document.getElementById('btnStart');
const btnFacil = document.getElementById("btnFacil");
const btnMedio = document.getElementById("btnMedio");
const btnDificil = document.getElementById("btnDificil");
const btn5 = document.getElementById("btn5");
const btn7 = document.getElementById("btn7");
const btn10 = document.getElementById("btn10");
const btnRapido = document.getElementById("btnRapido");
const codigoInput = document.getElementById('codigoInput')


let turnoJugador = true;

const min = 10001
const max = 99999
let codigoSala;

btnCPU.addEventListener('click', () => seleccionarModo("CPU"));
btnLocal.addEventListener('click', () => seleccionarModo("LOCAL"));
btnInstrucciones.addEventListener('click', () => mostrarInstrucciones());
btnCrearSala.addEventListener('click', () => crearSala());
btnUnirse.addEventListener('click', () => unirseSala());
btnVolver.forEach(btn => {
    btn.addEventListener('click', () => volverAlMenu());
})
btnOnline.addEventListener('click', () => mostrarOnline());
btnStart.addEventListener('click', () => iniciarJuego());
btnFacil.addEventListener("click", () => setCPU("facil", 5));
btnMedio.addEventListener("click", () => setCPU("medio", 5));
btnDificil.addEventListener("click", () => setCPU("dificil", 5));
btn5.addEventListener('click', () => setGrid(5));
btn7.addEventListener('click', () => setGrid(7));
btn10.addEventListener('click', () => setGrid(10));
btnRapido.addEventListener('click', () => setGrid(5, true));


function seleccionarModo(modo) {
    CONFIGURACION.modo = modo;

    document.getElementById("menu").style.display = "none";
    if (modo == "CPU") {
        document.getElementById('cpuLevels').style.display = "block";
    } else if (modo == "LOCAL" || modo == "ONLINE") {
        document.getElementById('gridSize').style.display = "block";
    }

}


function setCPU(level, size) {

    document.getElementById("cpuLevels").style.display = "none";
    document.getElementById("gridSize").style.display = "none";
    CONFIGURACION.cpuLevel = level;
    CONFIGURACION.gridSize = size;
    dibujarPuntos(CONFIGURACION.gridSize);
    iniciarJuego();
}

function iniciarJuego() {

    document.getElementById("menu").style.display = "none";
    document.getElementById("gridSize").style.display = "none";
    document.getElementById("cpuLevels").style.display = "none";

    console.log("Modo:", CONFIGURACION.modo);
    console.log("Tamaño:", CONFIGURACION.gridSize);
    console.log("CPU:", CONFIGURACION.cpuLevel);
    console.log("Timer:", CONFIGURACION.timerEnabled);
    turnoJugador = true;

    crearTablero(CONFIGURACION.gridSize);
}


function mostrarOnline() {
    document.getElementById("onlineMenu").style.display = "block";
    document.getElementById("menu").style.display = "none";
}
function mostrarInstrucciones() {
    document.getElementById("instrucciones").style.display = "block";
    document.getElementById("menu").style.display = "none";
}

function volverAlMenu() {
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("cpuLevels").style.display = "none";
    document.getElementById('gridSize').style.display = "none";
    document.getElementById("onlineMenu").style.display = "none";
    document.getElementById("menu").style.display = "block";
}


function setGrid(size, timer) {
    CONFIGURACION.gridSize = size;
    CONFIGURACION.timerEnabled = timer;
    if (timer) {
        CONFIGURACION.timeLimit = 60;
    }
    console.log("Modo:", CONFIGURACION.modo);
    console.log("Grid:", CONFIGURACION.gridSize);
    console.log("CPU:", CONFIGURACION.cpuLevel);
    console.log("Timer:", CONFIGURACION.timerEnabled);


    crearTablero(CONFIGURACION.gridSize);


}



function crearSala() {
    console.log("Crear sala - función pendiente");
    codigoSala = Math.floor(Math.random() * (max - min) + min);
    console.log(codigoSala)
    codigoInput.value = codigoSala;

}


function unirseSala() {
    console.log("Unirse a sala - función pendiente");

}


function dibujarPuntos(gridSize) {
    const spacing = calcularSpacing(gridSize);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    dots = [];
    for (let fila = 0; fila < gridSize; fila++) {
        dots[fila] = [];
        for (let col = 0; col < gridSize; col++) {
            let x = margin + col * spacing;
            let y = margin + fila * spacing;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
            dots[fila][col] = { x, y };
        }
    }
}
//this is working very well

function calcularSpacing(gridSize) {
    return (canvas.width - margin * 2) / (gridSize - 1);
}


let squares = [];

function Square(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.top = false;
    this.bottom = false;
    this.left = false;
    this.right = false;

    this.owner = null;
}

function crearTablero(size) {
    squares = [];
    const spacing = calcularSpacing(size); // Ahora sí tenemos el valor

    for (let row = 0; row < size - 1; row++) {
        squares[row] = [];
        for (let col = 0; col < size - 1; col++) {
            let x = margin + col * spacing;
            let y = margin + row * spacing;
            squares[row][col] = new Square(x, y, spacing);
        }
    }
    dibujarTodo();
}

function dibujarTodo() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarPuntos(CONFIGURACION.gridSize);

    for (let row of squares) {
        for (let square of row) {

            ctx.lineWidth = 3;
            ctx.strokeStyle = "black";

            if (square.top)
                drawLine(square.x, square.y, square.x + square.size, square.y);

            if (square.bottom)
                drawLine(square.x, square.y + square.size, square.x + square.size, square.y + square.size);

            if (square.left)
                drawLine(square.x, square.y, square.x, square.y + square.size);

            if (square.right)
                drawLine(square.x + square.size, square.y, square.x + square.size, square.y + square.size);

            if (square.owner !== null) {

                ctx.fillStyle = square.owner ? "blue" : "red";

                ctx.fillRect(
                    square.x + 5,
                    square.y + 5,
                    square.size - 10,
                    square.size - 10
                );
            }
        }
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

canvas.addEventListener("click", function (e) {
    if (squares.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    for (let r = 0; r < squares.length; r++) {
        for (let c = 0; c < squares[r].length; c++) {
            const square = squares[r][c];
            if (mx >= square.x && mx <= square.x + square.size && my >= square.y && my <= square.y + square.size) {
                const side = detectarLado(square, mx, my);
                if (!side) return;
                if (square[side]) return; // lado marcado

                marcarLinea(square, side, r, c);
                return;
            }
        }
    }
});

function detectarLado(square, mx, my) {

    const marginSide = 15;

    const topDist = Math.abs(my - square.y);
    const bottomDist = Math.abs(my - (square.y + square.size));
    const leftDist = Math.abs(mx - square.x);
    const rightDist = Math.abs(mx - (square.x + square.size));

    const min = Math.min(topDist, bottomDist, leftDist, rightDist);

    if (min > marginSide) return null;

    if (min === topDist) return "top";
    if (min === bottomDist) return "bottom";
    if (min === leftDist) return "left";
    if (min === rightDist) return "right";
}

function marcarLinea(square, side, row, col) {
    // Marcar lado del cuadrado actual
    square[side] = true; 

    // Determinar el cuadrado vecino y su lado correspondiente
    let vecinoRow = row;
    let vecinoCol = col;
    let ladoVecino = "";

    switch (side) {
        case "top":
            vecinoRow = row - 1;
            ladoVecino = "bottom";
            break;
        case "bottom":
            vecinoRow = row + 1;
            ladoVecino = "top";
            break;
        case "left":
            vecinoCol = col - 1;
            ladoVecino = "right";
            break;
        case "right":
            vecinoCol = col + 1;
            ladoVecino = "left";
            break;
    }

    // Si el vecino existe, marcar su lado
    if (vecinoRow >= 0 && vecinoRow < squares.length && vecinoCol >= 0 && vecinoCol < squares[0].length) {
        squares[vecinoRow][vecinoCol][ladoVecino] = true;
    }

    // Verificar si se completó algún cuadrado (el actual o el vecino)
    let completo = false;
    if (square.top && square.bottom && square.left && square.right) {
        square.owner = turnoJugador;
        completo = true;
    }
    if (vecinoRow >= 0 && vecinoRow < squares.length && vecinoCol >= 0 && vecinoCol < squares[0].length) {
        let vecino = squares[vecinoRow][vecinoCol];
        if (vecino.top && vecino.bottom && vecino.left && vecino.right) {
            vecino.owner = turnoJugador;
            completo = true;
        }
    }

    // Si no se completó ningún cuadrado, cambia el turno
    if (!completo) {
        turnoJugador = !turnoJugador;
    }

    dibujarTodo();

    // Si ahora es turno de la CPU y estamos en modo CPU, llamar a la función correspondiente
    if (CONFIGURACION.modo === "CPU" && !turnoJugador) {
        setTimeout(turnoCPU, 200); // Pequeño retraso para que se vea la jugada
    }
}


function turnoCPU() {
    if (turnoJugador) return; // No es turno de la CPU
    // lados no marcados
    let disponibles = [];
    for (let r = 0; r < squares.length; r++) {
        for (let c = 0; c < squares[r].length; c++) {
            const square = squares[r][c];
            const sides = ["top", "bottom", "left", "right"];
            for (let side of sides) {
                    if (!square[side]) {
                    disponibles.push({ r, c, side });
                }
            }
        }
    }

    if (disponibles.length === 0) return;

    // choose one randomly
    const randomIndex = Math.floor(Math.random() * disponibles.length);
    const { r, c, side } = disponibles[randomIndex];

    // Marcar la línea (simula un clic)
    marcarLinea(squares[r][c], side, r, c);
}
// function turnoCPU() {  //TURNO CPU

//     if (turnoJugador) return;

//     if (CONFIGURACION.cpuLevel === "facil") {
//         cpuFacil();
//     }

//     if (CONFIGURACION.cpuLevel === "medio") {
//         cpuMedio();
//     }

//     if (CONFIGURACION.cpuLevel === "dificil") {
//         cpuDificil();
//     }

//     turnoJugador = true;
// }


// function cpuFacil() {

//     let posibles = obtenerLineasDisponibles();
//     if (posibles.length === 0) return;
//     let random = posibles[Math.floor(Math.random() * posibles.length)];
//     agregarLinea(random, false);
// }

// function cpuMedio() {

//     let cerrar = buscarCuadradoCon3Lados();

//     if (cerrar) {
//         agregarLinea(cerrar, false);
//         return;
//     }

//     cpuFacil();
// }

// function cpuDificil() {

//     let cerrar = buscarCuadradoCon3Lados();

//     if (cerrar) {
//         agregarLinea(cerrar, false);
//         return;
//     }

//     let seguras = obtenerLineasSeguras();

//     if (seguras.length > 0) {
//         let random = seguras[Math.floor(Math.random() * seguras.length)];
//         agregarLinea(random, false);
//         return;
//     }

//     cpuFacil();
// }


