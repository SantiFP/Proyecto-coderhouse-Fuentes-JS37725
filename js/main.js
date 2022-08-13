// Obtengo el carro del storage y si existe el arreglo cart pasara a contener estos datos obtenidos de la clave 'cart' del storage
 
let cart = [];
let cartInLs = JSON.parse(localStorage.getItem('cart'));
if (cartInLs) {
    cart = cartInLs
};

// Capturo los elementos del dom con los que voy a definir los eventos

const total = document.getElementById('total');
const continueToPayment = document.getElementById('continuaralpago');
const allGuitarsButton = document.getElementById('allguitars');
const electricGuitarButton = document.getElementById('electricguitarbutton');
const acousticGuitarButton = document.getElementById('acousticguitarbutton');
const electricAcousticGuitarButton = document.getElementById('electricacousticguitarbutton');
const paymentDiv = document.getElementById('pagodiv');
const guitarsHtml = document.getElementById('renderguitars');

// Cada boton captura un evento click y la función manejadora renderiza las guitarras filtradas por tipo o todas las guitarras en el div con 
// id renderguitar y remueve de este mismo div el total a pagar,el boton de continuar al pago y el div con el form de pago(el total a pagar y 
// el boton de continuar al pago son visibles solamente al hacer click en ver carrito siempre que haya productos en el carrito,
// y el form solamente es visible al hacer click en continuar al pago)

allGuitarsButton.addEventListener('click', async () => {
    let guitars = await getGuitars();
    renderGuitars(guitars);
    toggleClass();
})

electricGuitarButton.addEventListener('click', () => {
    renderGuitars(typeFilter('electric')),
    toggleClass()
});

acousticGuitarButton.addEventListener('click', () => {
    renderGuitars(typeFilter('acoustic')),
    toggleClass()
})

electricAcousticGuitarButton.addEventListener('click', () => {
    renderGuitars(typeFilter('electroacoustic')),
    toggleClass()
})

// Esta función define la reacción al evento click del botón vercarrito, renderizando el carrito obtenido del storage y el total a pagar así 
// como el botón de continuar al pago, tambien esconde el div del form de pago,este solo se verá al hacer click en continuar al pago.
// Si no se obtiene del localStorage un item con la clave cart, en el div con id renderguitars se mostrará un mensaje indicando que no 
// hay guitarras en el carrito.

const seeCart = () => {
    if (localStorage.getItem('cart')) {
        const fromJson = JSON.parse(localStorage.getItem('cart'));
        renderGuitarsCart(fromJson)
        renderTotal();
        paymentDiv.classList.add('hidden')
    }else{
        guitarsHtml.innerHTML = `<p class="text-white text-lg px-6 py-8 bg-blue-500 mt-4 lg:mt-0 lg:ml-60">No hay guitarras en el carrito</p>`
    }
};

// Aquí en esta funcion se agregan clases para ocultar el total a pagar,el boton de continuar al pago, y el form de pago.

const toggleClass = () => {
    total.classList.add('hidden');
    continueToPayment.classList.add('hidden');
    paymentDiv.classList.add('hidden')
}

// Renderizo el carro que esta en el storage si esta definido

const getCartStorage = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cart"));
    renderGuitarsCart(cartStorage);
};



