// Aquí se desarrolla la lógica para el registro e inicio de sesión de usuarios, sus validaciones, guardado en base de datos y carga de 
// contenido del DOM dependiendo de ciertos factores.
// Entiendo que el localStorage nunca debe almacenar usuarios y mucho menos contraseñas, pero utilicé este recurso (localStorage) para
// guardar usuarios, debido a que simula una base de datos de forma mas estable y duradera que lo que podria simular un array vacío.

const btnLogin = document.getElementById('btnlogin');
const btnSignUp = document.getElementById('btnregistro')
const formSignUp = document.getElementById('formregistro');
const formLogin = document.getElementById('formlogin');
const init = document.getElementById('inicio');
const nav = document.getElementById('nav');
const signUp = document.getElementById('registro');
const view = document.getElementById('view');
const header = document.getElementById('header');
const home = document.getElementById('home');
const logOut = document.getElementById('cerrarsesion');
const welcomeText = document.getElementById('welcome');
const session = JSON.parse(localStorage.getItem('login'));
let login = false;

// Con estos eventos al hacer click en el boton para iniciar sesión se despliega el formulario para esta acción y se esconden otros
// elementos. Lo mismo para el boton de registrarse.

btnLogin.addEventListener('click', () => {
    init.classList.add('hidden');
    formLogin.classList.remove('hidden');
    nav.classList.remove('hidden');
    nav.innerText = 'Ir al registro'
})

btnSignUp.addEventListener('click', () => {
    init.classList.add('hidden');
    formSignUp.classList.remove('hidden');
    nav.classList.remove('hidden');
    nav.innerText = 'Ir al login'
});

// Aquí se desarrolla la lógica del botón que permite navegar entre form de registro y de iniciar sesión.

nav.addEventListener('click', () => {

    if (formSignUp.classList.contains('hidden')) {

        nav.innerText = 'Ir al login';
        formLogin.classList.add('hidden')
        formSignUp.classList.remove('hidden')

    } else if (formLogin.classList.contains('hidden')) {

        nav.innerText = 'Ir al registro';
        formSignUp.classList.add('hidden')
        formLogin.classList.remove('hidden');
    }
})

// Este array vacío existe para guardar los usuarios que hayan pasado todas las validaciones, y luego ese array se envía
// al localStorage(base de datos), también aquí debajo ocurre la lógica de validaciones para que el usuario sea ingresado.

let users = [];

formSignUp.addEventListener('submit', (e) => {

    e.preventDefault();

    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    const getUsers = localStorage.getItem('users');
    const getUsersFromJson = JSON.parse(getUsers);

    // Las variables check se encargan de verificar que el nombre de usuario y mail ingresado no exista en la base de datos, en el bucle 
    // de debajo estas variables se setean como false en caso de que encuentre una coincidencia entre el nombre y mail ingresado y estos 
    // mismos datos de algún usuario existente en la base de datos, si se encuentra la coincidencia se corta el bucle, dependiendo de la 
    // coincidencia encontrada(nombre o mail), se seteara como false la variable check que corresponda.
    // Todo esto siempre que exista esta base de datos.  

    let checkName = true;
    let checkEmail = true;

    // Aquí este objeto con propiedades como strings vacíos será cargado con datos del usuario en el caso de que pase todas las
    // validaciones

    const userData = {
        name: '',
        email: '',
        password: ''
    };

    if (getUsersFromJson) {
        for (let i = 0; i < getUsersFromJson.length; i++) {
            if (getUsersFromJson[i].name === userName) {
                checkName = false;
                break;
            }
        }
        for (let i = 0; i < getUsersFromJson.length; i++) {
            if (getUsersFromJson[i].email === userEmail) {
                checkEmail = false;
                break;
            }
        }
    }

    // Aquí se desarrollan las validaciones para ingresar un usuario, enviando un Swal como respuesta en caso de que no cumpla los requisitos
    // necesarios, en caso de que si se cumplan todos los requisitos, el objeto userData ahora tendra en la propiedad que corresponda
    // el dato ingresado por el usuario

    (confirmPassword === userPassword && userPassword.length >= 4) ? (userData.password = userPassword) : Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        showConfirmButton: false,
        timer: 1500
    });

    (userPassword.length < 4) && Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Contraseña muy corta',
        showConfirmButton: false,
        timer: 1500
    });

    (userEmail.length > 3 && checkEmail) ? (userData.email = userEmail) : Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Email invalido o ya existente',
        showConfirmButton: false,
        timer: 1500
    });

    (userName.length > 2 && checkName) ? (userData.name = userName) : Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Nombre de usuario invalido o ya existente',
        showConfirmButton: false,
        timer: 1500
    });

    // Aquí debajo desestructuro userData para analizar sus propiedades, en caso de que todas las propiedades sean distintas de un string 
    // vacío(true) procedo a ingresar el usuario a la base de datos,si es el primer usuario se realiza un push al array users y este array se 
    // guardará en el localStorage creando la "base de datos", si no es el primer usuario se obtiene el arreglo de usuarios del localStorage y
    // se pushea el usuario nuevo a este array que es enviado nuevamente al localStorage.
    // Por último, luego de realizar el registro, se despliega un Swal indicando el registro exitoso con la posibilidad de inicar sesión y se
    // renderiza el form de iniciar sesión, escondiendo el de registro.

    const { name, email, password } = userData;

    if (name && email && password) {

        const getUsers = localStorage.getItem('users');
        const getUsersFromJson = JSON.parse(getUsers);

        if (getUsersFromJson) {
            getUsersFromJson.push(userData);
            let toJson = JSON.stringify(getUsersFromJson);
            localStorage.setItem('users', toJson);
        } else {
            users.push(userData);
            let toJson = JSON.stringify(users);
            localStorage.setItem('users', toJson)
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Puedes iniciar sesión',
            showConfirmButton: false,
            timer: 2000
        });

        formSignUp.classList.add('hidden');
        formLogin.classList.remove('hidden');
        nav.innerText = 'Ir al registro'
    }
});

// Aquí debajo existe la lógica para que el usuario pueda iniciar sesión, la asincronía en este función se debe a que mas adelante, si se 
// inicia la sesión con éxito se renderizan las guitarras obtenidas del fetch.

formLogin.addEventListener('submit', async (e) => {

    e.preventDefault();

    const name = document.getElementById('loginname').value;
    const password = document.getElementById('loginpassword').value;

    // Similar a lo que sucede en el registro, la variable checkUser verifica que los datos ingresados coincidan con un usuario registrado en
    // la base de datos, se utiliza el bucle para cargar la variable con el valor true(si existe esta coincidencia) o false (en caso de que 
    // no exista la coincidencia).

    let checkUser = false;

    const getUsers = localStorage.getItem('users');
    const getUsersFromJson = JSON.parse(getUsers);

    console.log(getUsersFromJson);

    if (getUsersFromJson) {
        for (let i = 0; i < getUsersFromJson.length; i++) {
            if (getUsersFromJson[i].name === name && getUsersFromJson[i].password === password) {
                checkUser = true;
                break;
            } else {
                checkUser = false;
            }
        }
    } 

    // Aquí debajo si checkUser tiene el valor false se envía un mensaje por Swal de datos incorrectos, si el valor es true, el Swal
    // comunicará que está iniciando sesión,luego se renderizará el div con el id "view" obteniendo las guitarras de la función getGuitars(),
    // definida en el archivo fetch.js (o el carrito dependiendo de si existe o no este carrito) ,el formulario y la página de inicio se 
    // esconderán, el innerText de la etiqueta <p> con el id welcome pasará a contener 'hola' seguido del nombre del usuario que inició sesión.
    // Por último se setea en el localStorage una variable login con el valor true y otra name con el nombre con el que se inició la sesión.

    if (!checkUser) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El usuario no existe o los datos son incorrectos',
            showConfirmButton: false,
            timer: 1500
        })
    } else {

        Swal.fire({
            title: 'Iniciando sesión',
            timer: 2000,
            didOpen: () => {
                Swal.showLoading()
            },
        });

        formLogin.classList.add('hidden');
        header.classList.add('hidden');
        view.classList.remove('hidden');

        welcomeText.innerText = `Hola ${name}`
        localStorage.setItem('login', 'true');
        JSON.stringify(localStorage.setItem('name', `${name}`))


        if (localStorage.getItem('cart') == null) {
            let guitars = await getGuitars();
            renderGuitars(guitars);
            toggleClass();
        } else {
            getCartStorage();
            renderTotal();
        }
    }
});

// Este eventListener del logOut setea en el storage la variable login con el valor false, dispara un mensaje de cerrando sesión
// y recarga la página

logOut.addEventListener('click', () => {
    localStorage.setItem('login', 'false');
    Swal.fire({
        title: 'Cerrando sesión',
        timer: 1500,
        didOpen: () => {
            Swal.showLoading()
        },
    });
    setTimeout(() => {
        location.reload()
    }, 1500);
})

// Todo lo relativo a la carga del documento se desarrolla aquí, si la variable session(que refiere al valor de la clave login en el 
// localStorage) es true, no veremos el home(inicio) sino que al cargar el documento veremos el div con id view, si no hay guitarras en el 
// carrito veremos todas las guitarras, si existen guitarras en el carrito veremos el carrito guardado en el localStorage como cart, junto al
// total a pagar y el botón de continuar al pago. Siempre que session sea true, el inner text del <p> con id welcome, contendrá el saludo 
// junto al nombre seteado en el localStorage y se obtendrá del localStorage el tema de color selecionado .
// Si la variable session es false simplemente se setea en el storage la clave 'theme' con el valor 'blue',
// y se ejecuta la función blueTheme().

document.addEventListener("DOMContentLoaded", async () => {
    if (session) {
        home.classList.add('hidden');
        view.classList.remove('hidden');
        welcomeText.innerText = `Hola ${localStorage.getItem('name')}`
        if (localStorage.getItem('cart') == null) {
            let guitars = await getGuitars();
            renderGuitars(guitars);
            toggleClass();
        } else {
            getCartStorage();
            renderTotal();
        }
        localStorage.getItem("theme") == "white" ? whiteTheme() :  blueTheme();
    } else {
        localStorage.setItem('theme','blue');
        blueTheme();
    }
})