// Aquí se desarrolla todo lo que tiene que ver con estilos dependiendo de la elección del usuario

const body = document.body;
const toggleMode = document.getElementById('togglemode');
const card = document.getElementById('shadow');
let selectStyle = '';
let btnBlue = '';
let cardShadow = '';
let shadow = '';
let label = '';
let input = '';
let floatingLabel = '';

// Agrego la clase azul al body

body.classList.add('bluebody');

// Defino la función manejadora para el evento click del boton con id togglemode, en esta se agrega el background blanco o se quita
// (dependiendo de si ya lo contiene o no), también cambiaran los estilos de este boton.
// A su vez si el body contiene el background blanco se ejecuta la funcion whiteTheme() y se setea en el storage la clave 'theme' con
// el valor 'white', lo mismo en el caso de que el body contenga el background azul, se ejecuta blueTheme() y se setea en el storage la 
// clave 'theme' con el valor 'blue'.
// Las funciones whiteTheme() y blueTheme() cargan valores de variables que son utilizadas en estilos de elementos de forma dinámica.

toggleMode.addEventListener('click', () => {

    toggleMode.classList.toggle('bluebutton');
    body.classList.toggle('whitebody');

    if (body.classList.contains('whitebody')) {
       whiteTheme();
       localStorage.setItem("theme","white");
    } else if (body.classList.contains('bluebody')) {
      blueTheme();
      localStorage.setItem("theme","blue")
    };

    if (!paymentDiv.classList.contains('hidden')) {
        renderPayment();
    }
});

const whiteTheme = () => {
    
    body.classList.add('whitebody');
    toggleMode.classList.add('bluebutton')
    toggleMode.innerText = 'Blue mode';
    shadow = 'shadow bg-white';
    cardShadow = 'shadow';
    selectStyle = 'flecha2';
    label = 'label1';
    input = 'input1';
    floatingLabel = 'inputstyle2'

};

const blueTheme = () => {

    body.classList.add('bluebody');
    toggleMode.classList.add('white');
    toggleMode.innerText = 'White mode';
    shadow = '';
    cardShadow = '';
    btnBlue = '';
    selectStyle = 'flecha';
    label = 'label2';
    input = 'input2';
    floatingLabel = 'inputstyle1'
};

