let cart = [];
let cartInLs = JSON.parse(localStorage.getItem('cart'));
if (cartInLs) {
    cart = cartInLs
}
// Capturo los elementos del dom con los que voy a definir los eventos
const verCarrito = document.getElementById('vercarrito');
const total = document.getElementById('total');
const continueToPayment = document.getElementById('continuaralpago');
const electricGuitarButton = document.getElementById('electricguitarbutton');
const acousticGuitarButton = document.getElementById('acousticguitarbutton');
const electricAcousticGuitarButton = document.getElementById('electricacousticguitarbutton');
const paymentDiv = document.getElementById('pagodiv');
const guitarshtml = document.getElementById('renderguitars');

// Cada boton captura un evento click y la función manejadora renderiza las guitarras filtradas por tipo en el div con id renderguitar
// y remueve de este mismo div el total a pagar,el boton de continuar al pago y el div con el form de pago(el total a pagar y el boton
// de continuar al pago son visibles solamente al hacer click en ver carrito,y el form solamente es visible al hacer click en continuar al pago
// siempre que haya productos en el carrito)

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

// Esta función define la reacción al evento click del botón vercarrito, renderizando el carrito obtenido del storage(o un array vacio 
// si no hay datos en el storage) y el total a pagar así como el botón de continuar al pago, tambien esconde el div del form de pago,este solo se 
// ve al hacer click en continuar al pago

verCarrito.addEventListener('click', () => {
    if (localStorage.getItem('cart')) {
        const fromJson = JSON.parse(localStorage.getItem('cart'));
        renderGuitarsCart(fromJson)
        renderTotal();
        paymentDiv.classList.add('hidden')
    }else{
        renderGuitarsCart(cart)
    }
})

// Aquí en esta funcion se agregan clases para ocultar el total a pagar,el boton de continuar al pago(solo visible en ver carrito), 
// y el form de pago

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

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cart")) {
        getCartStorage();
        renderTotal();
    }
})