// Esta funcion se encarga de filtrar guitarras por su propiedad type

const typeFilter = (match) => {
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
    resultado = price + (price * 0.22);
    return Math.round(resultado);
}

// Aquí defino la función remove para remover guitarras del carrito y actualizar el carrito en el storage

const remove = (id) => {

    let guitarIndex = cart.findIndex(guitar => guitar.id === id);

    let guitar = cart.find(guitar => guitar.id === id);

    if (guitar && guitar.amount > 1) {
        guitar.amount--
    } else {
        cart.splice(guitarIndex, 1)
    };
    enJson = JSON.stringify(cart);
    localStorage.setItem('cart', enJson);
    renderGuitarsCart(cart);
    renderTotal();
}

// Aquí defino la función para agregar guitarras al carrito y guardarlas en el localstorage

const pushToCart = (id) => {

    let guitar = guitars.find(guitar => guitar.id === id);

    let productInCart = cart.find(guitar => guitar.id === id);

    if (productInCart) {
        productInCart.amount++;
    } else {
        guitar.amount = 1;
        cart.push(guitar);
    };

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