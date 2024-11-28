// Variables globales --------------------------
// Array de palabras posibles
let palabras = [
  "LAPIZ",
  "CUADERNO",
  "LAPICERO",
  "PLUMA",
  "BORRADOR",
  "SACAPUNTAS",
  "MESA",
  "SILLA",
  "PIZARRON",
  "VENTILADOR",
  "FOCO",
  "LIBROS",
  "MOCHILA",
  "LONCHERA",
];

// Variables de juego
let letra;
let estadoPalabra;
let palabrasUsadas;

// Variables de palabra secreta
let palabra = "-";
let letrasAdivinadas;
let longitud;
let letraAdivinada;

// Variables de muñeco/ahorcado
let partesMunieco;
let vidasRestantes;

// Fin de variables globales --------------------

// Logica para identificar las teclas en la pantalla -------------
// Contenedor de botones (letras)
const palabraAdivinarElement = document.getElementById("palabraAdivinar");
const letrasArriba = document.querySelector(".letras-arriba");
const letrasCentro = document.querySelector(".letras-centro");
const letrasAbajo = document.querySelector(".letras-abajo");

// Crear los botones de las letras del letra
const alfabeto = "QWERTYUIOPASDFGHJKLÑZXCVBNM".split("");
const letrasContainer = [letrasArriba, letrasCentro, letrasAbajo];
const letrasDistribuidas = [
  alfabeto.slice(0, 10),
  alfabeto.slice(10, 20),
  alfabeto.slice(20),
];

letrasDistribuidas.forEach((grupo, index) => {
  grupo.forEach((letra) => {
    const boton = document.createElement("button");
    boton.innerText = letra;
    boton.setAttribute("data-letter", letra); // Establecer un atributo 'data-letter'
    boton.onclick = (e) => AdivinarLetra(e.target);
    letrasContainer[index].appendChild(boton);
  });
});

// Fin de logica de las teclas de la fantalla --------------

if (palabra === "-") {
  IniciarJuego();
}

function IniciarJuego() {
  palabrasUsadas = Array("-");
  letra = "-";
  palabra = palabras[Math.floor(Math.random() * palabras.length)];
  longitud = palabra.length;
  letrasAdivinadas = Array(longitud).fill("_"); // Inicializar con "_"
  palabraAdivinarElement.innerText = letrasAdivinadas.join(" ");
  estadoPalabra = "incompleto";
  letraAdivinada = "-";
  partesMunieco = "-";
  vidasRestantes = 10; // Número máximo de vidasRestantess (10 partes del cuerpo)

  // Borrar en producción solo es visual
  // console.log("------------------Iniciar Juego------------------");
  // console.log({ palabrasUsadas });
  // console.log("Letra:", letra);
  // console.log("Palabra:", palabra);
  // console.log("Longitud: ", longitud);
  // console.log({ letrasAdivinadas });
  // console.log("Estado de palabra:", estadoPalabra);
  // console.log("Letra adivinada:", letraAdivinada);
  // console.log("partes de muñeco:", partesMunieco);
  // console.log("Vidas restantes:", vidasRestantes);
  // Seleccionamos todos los botones de letras
  const botones = document.querySelectorAll(
    ".letras-arriba button, .letras-centro button, .letras-abajo button"
  );

  // Recorremos todos los botones y reseteamos el estilo y el estado deshabilitado
  botones.forEach((boton) => {
    boton.style = ""; // Restablecer el estilo al estado original (sin estilos inline)
    boton.disabled = false; // Habilitar el botón
  });
}

function AdivinarLetra(boton) {
  // Borrar en producción solo es visual
  // console.log("------------------Adivinar Letra------------------");
  letra = boton.getAttribute("data-letter"); // Obtener la letra del atributo
  // console.log("Se presionó una letra:", letra);
  boton.disabled = true; // Deshabilitar el botón
  letraAdivinada = false; // Variable para determinar si la letra está en la palabra

  // Si la letra está en la palabra, actualizar la palabra a adivinar
  palabra.split("").forEach((char, index) => {
    if (char === letra) {
      letrasAdivinadas[index] = letra;
      letraAdivinada = true; // La letra fue encontrada
    }
  });

  // console.log("Letra adivinada:", letraAdivinada);
  // Llamar a la función de pintado de tecla fuera del bucle
  PintarTecla(letra, letraAdivinada);
}

function PintarTecla(letra, letraAdivinada) {
  // console.log("------------------Pintar Tecla------------------");
  const boton = document.querySelector(`button[data-letter="${letra}"]`);

  if (letraAdivinada) {
    boton.style = "background-color: green; color: white;";
    letraAdivinada = "-";

    // console.log("Tecla pintada verde:", letra);
    // console.log("Letra adivinada:", letraAdivinada);
    MostrarLetrasCoincidentes();
  } else {
    boton.style = "background-color: red; color: white;";
    letraAdivinada = "-";

    // console.log("Tecla pintada en rojo:", letra);
    // console.log("Letra adivinada:", letraAdivinada);
    PenalizarIntento();
  }
}

function MostrarLetrasCoincidentes() {
  console.log("------Mostrar Letras Coincidentes------");

  palabraAdivinarElement.innerText = letrasAdivinadas.join(" ");
  VerificarEstadoPalabra(letrasAdivinadas);
  letra = "-";

  console.log("Letras adivinadas:", letrasAdivinadas);
  console.log("Letra:", letra);
}

function PenalizarIntento() {
  vidasRestantes--;
  document.getElementById("vidas-restante").innerText = vidasRestantes;
  MostrarParteMunieco(vidasRestantes);
}

// Función para mostrar partes del cuerpo
function MostrarParteMunieco(vidasRestantes) {
  const partes = [
    "piernaDer",
    "piernaIzq",
    "brazoDer",
    "brazoIzq",
    "torso",
    "cabeza",
    "nudo",
    "cuerda",
    "tronco",
    "pasto",
  ];

  if (vidasRestantes < partes.length) {
    const parteMunieco = partes[vidasRestantes];
    document.getElementById(parteMunieco).style.display = "block";
  }
  VerificarEstadoJuego();
}

function VerificarEstadoPalabra(letrasAdivinadas) {
  // console.log("------Verificar Estado de Palabra------");

  if (!letrasAdivinadas.includes("_")) {
    estadoPalabra = "completo";
  } else {
    estadoPalabra = "incompleto";
  }
  VerificarEstadoJuego();
}

function VerificarEstadoJuego() {
  if (vidasRestantes > 0 && estadoPalabra == "completo") {
    Swal.fire({
      title: "¡Felicidades! 😎",
      text: "Has adivinado la palabra: " + palabra,
      confirmButtonText: "Siguiente Palabra",
    });
    SiguientePalabra();
  } else if (vidasRestantes < 1 && estadoPalabra == "incompleto") {
    Swal.fire({
      title: "¡Has perdido! 😢",
      text: "La palabra era " + palabra,
      confirmButtonText: "Jugar Otra Vez",
      
      // preConfirm: () => {
      //   // Esta función se ejecutará cuando el usuario haga clic en el botón "Jugar Otra Vez"
      //   palabra = "-"; // Resetear la palabra
      //   return new Promise((resolve) => {
          
      //   });
      // },
    });
    setTimeout(() => location.reload(), 2000);
  }
}

function SiguientePalabra() {
  // Ingresar a palabras usadas la palabra adivinada
  palabrasUsadas.push(palabra);
  // Quitamos la palabra del array original
  palabras = palabras.filter((item) => item != palabra);
  // Asignamos la nueva palabra
  palabra = palabras[Math.floor(Math.random() * palabras.length)];
  // Operador IsAWiner Preguntamos si existen todavia palabras
  if (palabras.length != 0) {
    longitud = palabra.length;
  } else {
    alert("¡Enhorabuena!, te has salvado. Eres el ganador.");
    setTimeout(() => location.reload(), 2000);
  }
  letrasAdivinadas = Array(longitud).fill("_"); // Inicializar con "_"
  palabraAdivinarElement.innerText = letrasAdivinadas.join(" ");
  estadoPalabra = "incompleto";
  letraAdivinada = "-";

  // Borrar en producción solo es visual
  // console.log("------------------Siguiente Palabra------------------");
  // console.log({ palabrasUsadas });
  // console.log("Palabras que quedan:", palabras);
  // console.log("Letra:", letra);
  // console.log("Palabra:", palabra);
  // console.log("Longitud: ", longitud);
  // console.log({ letrasAdivinadas });
  // console.log("Estado de palabra:", estadoPalabra);
  // console.log("Letra adivinada:", letraAdivinada);
  // console.log("partes de muñeco:", partesMunieco);
  // console.log("Vidas restantes:", vidasRestantes);

  // Seleccionamos todos los botones de letras
  const botones = document.querySelectorAll(
    ".letras-arriba button, .letras-centro button, .letras-abajo button"
  );

  // Recorremos todos los botones y reseteamos el estilo y el estado deshabilitado
  botones.forEach((boton) => {
    boton.style = ""; // Restablecer el estilo al estado original (sin estilos inline)
    boton.disabled = false; // Habilitar el botón
  });
}
