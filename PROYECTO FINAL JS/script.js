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


const btnCPU = document.getElementById('btnCPU');
const btnLocal = document.getElementById('btnLocal');
const btnInstrucciones = document.getElementById('btnInstrucciones');
const btnCrearSala = document.getElementById('btnCrearSala');
const btnUnirse = document.getElementById('btnUnirse');
const btnOnline = document.getElementById('btnOnline');
const btnVolver = document.getElementById('btnVolver');
const btnStart = document.getElementById('btnStart');




let nivel = 1;

btnCPU.addEventListener('click', () => seleccionarModo("CPU"));
btnLocal.addEventListener('click', () => seleccionarModo("LOCAL"));
btnInstrucciones.addEventListener('click', () => mostrarInstrucciones());
btnCrearSala.addEventListener('click', () => crearSala());
btnUnirse.addEventListener('click', () => unirseSala());
btnVolver.addEventListener('click', () => volverAlMenu());
btnOnline.addEventListener('click', () => mostrarOnline());
btnStart.addEventListener('click', () => iniciarJuego());


function seleccionarModo(modo) {
    CONFIGURACION.modo = modo;
    mostrarOpcionesModo(modo);
}

function mostrarOpcionesModo(modo) {

    if (modo === "LOCAL" || modo === "ONLINE") {

        switch (nivel) {
            case 1:
                CONFIGURACION.gridSize = 5;
                nivel++;
            case 2:
                CONFIGURACION.gridSize = 7;
                nivel++;
            case 3:
                CONFIGURACION.gridSize = 10;
                nivel++;
            case 4:
                CONFIGURACION.gridSize = 5;
                CONFIGURACION.timerEnabled = true;
                CONFIGURACION.timeLimit = 60;
                nivel = 1; // reset para volver a empezar
                break;
            default:
                CONFIGURACION.gridSize = 5;
                nivel = 1;
                break;
        }


    }

    if (modo === "CPU") {
        let opcion = ["fácil", "medio", "difícil"];
        opcion.forEach(nivel => {
            let btnNivel = document.createElement("button");
            btnNivel.innerText = nivel;
            btnNivel.addEventListener("click", () => {
                CONFIGURACION.cpuLevel = nivel;
                iniciarJuego();
            });
            document.getElementById("menu").appendChild(btnNivel);
        });

    }
}



function iniciarJuego() {

    document.getElementById("menu").style.display = "none";

    console.log("Modo:", CONFIGURACION.modo);
    console.log("Tamaño:", CONFIGURACION.gridSize);
    console.log("CPU:", CONFIGURACION.cpuLevel);
    console.log("Timer:", CONFIGURACION.timerEnabled);








    document.getElementById("menu").style.display = "none";
    dibujarPuntos(CONFIGURACION.gridSize);

}



function mostrarOnline() {
    document.getElementById("onlineMenu").style.display = "block";
}
function mostrarInstrucciones() {
    document.getElementById("instrucciones").style.display = "block";
    document.getElementById("menu").style.display = "none";
}

function volverAlMenu() {
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function setGrid(size) {
    CONFIGURACION.gridSize = size;
    CONFIGURACION.timerEnabled = false;
}//nivel 1, 2 ,3

function activarTimer() {
    CONFIGURACION.gridSize = 5;
    CONFIGURACION.timerEnabled = true;
    CONFIGURACION.timeLimit = 60;
}//por el nivel 4


function crearSala() {
    console.log("Crear sala - función pendiente");




}
function unirseSala() {
    console.log("Unirse a sala - función pendiente");



}

const margin = 50;
const spacing = (canvas.width - margin * 2) / (CONFIGURACION.gridSize - 1);

function dibujarPuntos(gridSize) {


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    let dots = [];  // store coordinates here
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


canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // find closest dot
    dots.forEach((fila, f) => {
        fila.forEach((dot, c) => {
            const distance = Math.hypot(dot.x - mouseX, dot.y - mouseY);
            if (distance < 10) {  // click radius
                console.log("Clicked dot:", f, c);
            }
        });// no funciona no detecta el click en los puntos, revisar luego 
    });
});

function dibujarTodo() {
    // redraw dots
    dibujarPuntos(CONFIGURACION.gridSize);

    // draw all lines
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
    });  // tambien no funciona dibujar las lineas, revisar luego
}


function verificarCuadrado() {


}