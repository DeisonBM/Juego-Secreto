// Declaración de variables
let numeroSecreto = 0; // Número que el usuario debe adivinar
let numeroIntentos = 0; // Contador de intentos del usuario
let listaNumerosSorteados = []; // Lista para almacenar números sorteados previamente
let numeroMaximo = 1; // Valor máximo para generar el número secreto (puedes cambiar este valor según sea necesario)

// Función para asignar un texto a un elemento HTML
function asignarTextoElemento(elementos, texto){
    let elementosHTML = document.querySelector(elementos);
    elementosHTML.innerHTML = texto;
    return;
}

// Función para verificar el intento del usuario
function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if(numeroDeUsuario === numeroSecreto){
        // Si el usuario adivina el número
        Swal.fire({
            position: "center",
            title: `¡Felicitaciones! Adivinaste el número secreto en ${numeroIntentos} ${numeroIntentos === 1 ? 'vez' : 'veces'}`,
            icon: "success"
        });
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilitar el botón de reinicio
    }else{
        // Si el usuario no adivina
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        }else{
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        numeroIntentos++;
        limpiarCaja(); // Limpiar la caja de entrada del usuario
    }
    return;
}

// Función para limpiar la caja de entrada del usuario
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

// Función para generar un número secreto no repetido
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroSecreto);
    console.log(listaNumerosSorteados);

    // Verificar si ya se han sorteado todos los números posibles
    if(listaNumerosSorteados.length == numeroMaximo){
        Swal.fire({
            icon: "error",
            title: "¡Oops!",
            text: "Ya se han sorteado todos los números posibles."
        });
    }else{
        // Verificar si el número ya está en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto(); // Generar otro número si ya está en la lista
        }else{
            listaNumerosSorteados.push(numeroGenerado); // Agregar el número a la lista
            return numeroGenerado;
        }
    }
}

// Función para establecer las condiciones iniciales del juego
function condicionesInicioales(){
    
    // Mostrar un modal de Swal para solicitar al usuario el número máximo
    Swal.fire({
        title: 'Ingrese el número máximo',
        input: 'number',
        inputAttributes: {
            min: 1,
            step: 1
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value || value < 1) {
                return 'Por favor, ingrese un número válido mayor o igual a 1';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            numeroMaximo = parseInt(result.value);
            
            // Generar mensajes iniciales
            asignarTextoElemento('h1', 'Juego del número secreto');
            asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
            
            // Generar el número aleatorio
            numeroSecreto = generarNumeroSecreto();
            
            // Inicializar número de intentos
            numeroIntentos = 1;
        }
    });
}

// Función para reiniciar el juego
function reiniciarJuego(){
    // Limpiar la caja de texto
    limpiarCaja();

    // Indicar mensaje de intervalos de números
    condicionesInicioales();
    
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Iniciar el juego al cargar la página
condicionesInicioales();
