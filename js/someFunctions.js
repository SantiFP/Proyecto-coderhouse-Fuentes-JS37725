// Esta funcion se encarga de filtrar guitarras por su propiedad type

const typeFilter = async (match) => {
    let guitars = await getGuitars();
    const filteredGuitars = guitars.filter(guitar => guitar.type == match);
    return filteredGuitars
};

// Esta funcion calcula el precio total a pagar

const totalPrice = (array) => {
    const total = array.reduce((acc, el) => acc + (el.price * el.amount), 0);
    return total;
};

// Esta funcion calcula las cuotas

const feesComputation = (price, fees) => {
    return Math.round(price / fees)
};

// Esta funcion acumula la cantidad total de productos comprados

const totalAmount = (array) => {
    const total = array.reduce((acc, el) => acc + el.amount, 0);
    return total;
}

// Esta funcion se encarga del calculo del iva

const iva = (price) => {
    result = price + (price * 0.22);
    return Math.round(result);
}

// Aquí defino la función remove para remover guitarras del carrito y actualizar el carrito en el storage, también al eliminar la última 
// guitarra se renderiza en el div un mensaje de no hay guitarras en el carrito.

const remove = (id) => {

    let guitarIndex = cart.findIndex(guitar => guitar.id === id);

    let guitar = cart.find(guitar => guitar.id === id);

    (guitar && guitar.amount > 1) ? guitar.amount--: cart.splice(guitarIndex, 1);

    enJson = JSON.stringify(cart);
    localStorage.setItem('cart', enJson);
    renderGuitarsCart(cart);
    renderTotal();
    
    if(cart.length == 0)(
    localStorage.removeItem('cart'),
    guitarsHtml.innerHTML = `<p class="text-white text-lg px-6 py-8 bg-blue-500 mt-4 lg:mt-0 lg:ml-60">No hay guitarras en el carrito</p>`
    );

    Toastify({
        text: 'Guitarra eliminada del carrito',
        duration: 1500,
        style: {
            background: 'white',
            color: 'blue'
        },
    }).showToast();
}

// Aquí defino la función para agregar guitarras al carrito y guardarlas en el localstorage dentro de la clave cart.

const pushToCart = (id) => {

    let guitar = guitars.find(guitar => guitar.id === id);

    let productInCart = cart.find(guitar => guitar.id === id);

    productInCart ? productInCart.amount++ : (guitar.amount = 1, cart.push(guitar))

    const enJson = JSON.stringify(cart);
    localStorage.setItem('cart', enJson);

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se ha agregado al carrito una guitarra ${guitar.brand} ${guitar.model} $${guitar.price}`,
        showConfirmButton: false,
        timer: 1100
    })
};

// Esta funcion calcula descuentos

const discount = (price, number) => {
    return Math.round(price - (price * number));
};