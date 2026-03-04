const CONFIGURACION = {

    modo: null,          // "CPU", "LOCAL", "ONLINE"
    gridSize: 5,         // 5, 7, 10
    cpuLevel: "-",    // easy, medium, hard
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

let dots = [];
let lines = [];
const margin = 50;
const Side = {
    BOT: 0,
    LEFT: 1,
    RIGHT: 2,
    TOP: 3
}

let turnoJugador = true;
let cuadrados = [];


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
btn5.addEventListener('click', () => setGrid(5, false));
btn7.addEventListener('click', () => setGrid(7, false));
btn10.addEventListener('click', () => setGrid(10, false));
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


    console.log("Modo:", CONFIGURACION.modo);
    console.log("Tamaño:", CONFIGURACION.gridSize);
    console.log("CPU:", CONFIGURACION.cpuLevel);
    console.log("Timer:", CONFIGURACION.timerEnabled);




    lines = {
        x1, y1,
        x2, y2,
        jugador // true = player, false = cpu
    };
    dots = [];

    if (CONFIGURACION.modo === "CPU") {
        turnoJugador = true;
    }


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

    juegoActivo = false;
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("cpuLevels").style.display = "none";
    document.getElementById('gridSize').style.display = "none";
    document.getElementById("onlineMenu").style.display = "none";
    document.getElementById("menu").style.display = "block";
    puntuacion.style.display = "none";
    document.getElementById('tiempoDisplay').style.display = "none";

}

function setCPU(level, size) {

    document.getElementById("cpuLevels").style.display = "none";
    document.getElementById("gridSize").style.display = "none";
    CONFIGURACION.cpuLevel = level;
    CONFIGURACION.gridSize = size;
    CONFIGURACION.timerEnabled = false;
    iniciarJuego();
}



function setGrid(size, timer) {
    CONFIGURACION.gridSize = size;
    CONFIGURACION.timerEnabled = timer === true;
    if (timer) {
        CONFIGURACION.timeLimit = 60;
    }

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


    dibujarPuntos(CONFIGURACION.gridSize);


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

    const spacing = (canvas.width - margin * 2) / (gridSize - 1);

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

    return dots;
}
//this is working very well 



function turnoCPU() {  //TURNO CPU

    if (turnoJugador) return;

    if (CONFIGURACION.cpuLevel === "facil") {
        cpuFacil();
    }

    if (CONFIGURACION.cpuLevel === "medio") {
        cpuMedio();
    }

    if (CONFIGURACION.cpuLevel === "dificil") {
        cpuDificil();
    }

    turnoJugador = true;
}


function cpuFacil() {

    let posibles = obtenerLineasDisponibles();
    if (posibles.length === 0) return;
    let random = posibles[Math.floor(Math.random() * posibles.length)];
    agregarLinea(random, false);
}

function cpuMedio() {

    let cerrar = buscarCuadradoCon3Lados();

    if (cerrar) {
        agregarLinea(cerrar, false);
        return;
    }

    cpuFacil();
}

function cpuDificil() {

    let cerrar = buscarCuadradoCon3Lados();

    if (cerrar) {
        agregarLinea(cerrar, false);
        return;
    }

    let seguras = obtenerLineasSeguras();

    if (seguras.length > 0) {
        let random = seguras[Math.floor(Math.random() * seguras.length)];
        agregarLinea(random, false);
        return;
    }

    cpuFacil();
}


function obtenerLineasDisponibles() {

    let disponibles = [];

    for (let fila = 0; fila < dots.length; fila++) {
        for (let col = 0; col < dots.length; col++) {

            if (col < dots.length - 1) {
                disponibles.push({
                    x1: dots[fila][col].x,
                    y1: dots[fila][col].y,
                    x2: dots[fila][col + 1].x,
                    y2: dots[fila][col + 1].y
                });
            }

            if (fila < dots.length - 1) {
                disponibles.push({
                    x1: dots[fila][col].x,
                    y1: dots[fila][col].y,
                    x2: dots[fila + 1][col].x,
                    y2: dots[fila + 1][col].y
                });
            }
        }
    }

    return disponibles.filter(l => !lineaExiste(l));
}



function lineaExiste(linea) {
    return lines.some(l =>
    (l.x1 === linea.x1 && l.y1 === linea.y1 &&
        l.x2 === linea.x2 && l.y2 === linea.y2)
    );
}

function verificarCuadrado() {


}

