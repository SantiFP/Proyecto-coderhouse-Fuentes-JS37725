// Realice una simulacion de tienda de guitarras que cuenta con guitarras electricas,acusticas y electroacusticas
// Este simulador ofrece distintos productos, distintos colores segun el producto seleccionado, y distintos planes de pago
// Tambien permite eliminar productos y calcula el iva sobre el monto total

let list = '';
let guitarNumberInList = '';
let electricGuitars = [];
let acousticGuitars = [];
let electricAcousticGuitars = [];
let cart = [];
let selectedGuitar = '';
let selectedColor = '';
let colorslist = '';
let confirmAddToCart = false;
let continuePurchasing = false;
let old = '';
let cantidadCuotas = 0;

// Esta funcion se encarga de filtrar guitarras por su propiedad type

const typeFilter = (match) => {
    const filteredGuitars = guitars.filter(guitar => guitar.type == match);
    return filteredGuitars
};

// Esta funcion se encarga de recorrer el array de colores de cada guitarra para poder mostrar los distintos colores y que el usuario elija

const displayColorsList = (array) =>{
    colorslist = '';
    for (let i = 0; i < array.length; i++) {
        colorslist += `${i + 1}: ${array[i]}
        `;
    } 
    return colorslist
};

// Esta funcion recibe un array y recorre sus elementos numerandolos en una lista y mostrando algunas propiedades

const displayGuitars = (array) =>{
    list = '';
    let numberInList = 1;
    for (const el of array) {
        list += `${numberInList++}: Marca: ${el.brand}, Modelo: ${el.model}, Precio: $${el.price}
    `      
    };
    return list;
};

// Esta funcion deveuelve el valor del elemento del array que selecciono el usuario cortando la iteracion y devolviendo dicho elemento cuando el
// numero en la lista(numero digitado por el usuario) es igual al indice mas uno (i + 1),es decir si el usuario digita 1, devuelve el primer 
// elemento del array, el ubicado en la posicion 0, ya que numberInList es igual a i + 1, por lo tanto obtendremos el elemento
// en la posicion array[i],siendo i=0 en este caso, es decir el primer elemento

const itemInArray = (array,numberInList) =>{

    for (let i = 0; i < array.length; i++) {
        if(numberInList == (i + 1)){
           return array[i]
        };   
    }

};

// Esta funcion calcula el precio total a pagar

const totalPrice = (array) => {
    
    let total = 0;
    array.forEach(product => {
        total += product.amount * product.price;
    })

    return total;
};

// Esta funcion acumula la cantidad total de productos comprados

const cantidadTotal = (array) =>{
    let total = 0;
    array.forEach(product => {
        total += product.amount
    })
    return total
}

// Esta funcion calcula las cuotas, en caso de que se pague de esta manera

const cuotasCalculo = (precio,cuotas) =>{
    return Math.round(precio / cuotas)
};

// Esta funcion se encarga del calculo del iva

const iva = (price) => {
    resultado = price + (price * 0.22);
    return Math.round(resultado);
}


alert('Hola bienvenido a nuestra tienda de guitarras');

alert('Tenemos una amplia variedad de guitarras. Acústicas, electricas y electroacústicas.');

do{   

let choice = Number(prompt(`Que esta interesado en comprar?
1:Guitarras eléctricas
2:Guitarras acústicas
3:Guitarras eléctroacústicas`));

if (choice == 1) {
    electricGuitars = typeFilter('electric');
    list = displayGuitars(electricGuitars);
    // aqui debajo el usuario elige un número que corresponde a la guitarra que desea comprar, y ese numero seleccionado se relaciona
    // con la posicion de esa guitarra en el nuevo array generado por la funcion typeFilter, esa relacion sucede en la funcion itemInArray
    // que recibe el numero ingresado por el usuario y el array antes mencionado, devolviendo el item del array que corresponde a la seleccion 
    // del usuario mediante el numero, luego se almacena como selectedGuitar.
    guitarNumberInList = Number(prompt(`Estas son nuestras guitarras eléctricas:
    Digite el número correspondiente de la cual le interesa comprar:
    ${list}
    `));
    if(guitarNumberInList > 0 && guitarNumberInList <= electricGuitars.length) {
        selectedGuitar = itemInArray(electricGuitars,guitarNumberInList);
        // lo mismo sucede con los colores, utillizo la funcion itemInArray para relacionar el numero de color seleccionado con la posicion 
        // correspondiente de ese color en el array de colores que existe en la propiedad color del item almacenado en selectedGuitar
        // la funcion displayColorsList recorre el array de colores y muestra la lista de colores disponibles
        colorNumberInList = Number(prompt(`Elegiste una guitarra ${selectedGuitar.brand} ${selectedGuitar.model}.
        Estos son los colores disponibles para esa guitarra: 
        Ingrese número según su color de preferencia:
        ${displayColorsList(selectedGuitar.color)}`));
            if(colorNumberInList > 0 && colorNumberInList <= selectedGuitar.color.length){
                selectedColor = itemInArray(selectedGuitar.color,colorNumberInList);
                }else{alert('Color seleccionado incorrecto o inexistente')}
    }else{
        alert('Datos ingresados incorrectos')
    }
}else if(choice == 2){
    acousticGuitars = typeFilter('acoustic');
    list = displayGuitars(acousticGuitars);
    guitarNumberInList = Number(prompt(`Estas son nuestras guitarras acústicas:
    Digite el número correspondiente de la cual le interesa comprar:
    ${list}
    `));
    if(guitarNumberInList > 0 && guitarNumberInList <= acousticGuitars.length){  
        selectedGuitar = itemInArray(acousticGuitars,guitarNumberInList);
        colorNumberInList = Number(prompt(`Elegiste una guitarra ${selectedGuitar.brand} ${selectedGuitar.model}.
        Estos son los colores disponibles para esa guitarra: 
        Ingrese número según su color de preferencia:
        ${displayColorsList(selectedGuitar.color)}`));
            if(colorNumberInList > 0 && colorNumberInList <= selectedGuitar.color.length){
            selectedColor = itemInArray(selectedGuitar.color,colorNumberInList);
            }else{alert('Color seleccionado incorrecto o inexistente')}
    }else{
        alert('Datos ingresados incorrectos')
    }
}else if(choice == 3){
    electricAcousticGuitars = typeFilter('electroacoustic');
    displayGuitars(electricAcousticGuitars);
    guitarNumberInList = Number(prompt(`Estas son nuestras guitarras acústicas:
    Digite el número correspondiente de la cual le interesa comprar:
    ${list}
    `));
    if(guitarNumberInList > 0 && guitarNumberInList <= electricAcousticGuitars.length ){ 
        selectedGuitar = itemInArray(electricAcousticGuitars,guitarNumberInList);
        colorNumberInList = Number(prompt(`Elegiste una guitarra ${selectedGuitar.brand} ${selectedGuitar.model}.
        Estos son los colores disponibles para esa guitarra: 
        Ingrese número según su color de preferencia:
        ${displayColorsList(selectedGuitar.color)}`));
            if(colorNumberInList > 0 && colorNumberInList <= selectedGuitar.color.length){
            selectedColor = itemInArray(selectedGuitar.color,colorNumberInList);
        
                }else{alert('Color seleccionado incorrecto o inexistente')}
    }else{
        alert('Datos ingresados incorrectos')
    }
}else{
    alert('Datos ingresados incorrectos');
}

continuePurchasing = true;

// Aqui se confirma la compra y se agrega al carrito, o se incrementa la cantidad en 1 si ya existe en el carrito el producto seleccionado

if(selectedGuitar && selectedColor ){
    confirmAddToCart = confirm(`Desea agregar al carrito una guitarra ${selectedGuitar.brand} modelo ${selectedGuitar.model}
color ${selectedColor} por $${selectedGuitar.price}?`);
    if(confirmAddToCart){
        alert(`Se ha agregado al carrito una guitarra ${selectedGuitar.brand} ${selectedGuitar.model}
color ${selectedColor} por $${(selectedGuitar.price)}.`)
        if(cart.includes(selectedGuitar)){
            selectedGuitar.amount ++;
        }else{ 
            cart.push(selectedGuitar);
        }
    }
    list = '';
    for (const el of cart) {
        list += `${el.brand} ${el.model} $${el.price} cantidad: ${el.amount}
`
    };
    alert(`Su carrito:
${list}
Total: $${iva(totalPrice(cart))} iva inc.`);

// Aqui sucede un ciclo que se repetira en caso de que el usuario eliga eliminar un producto, volviendo a consultar por finalizar compra,
// eliminar compra o seguir comprando, si elige finalizar compra ofrece planes de pago y si se confirma el pago finaliza el programa,
// en caso de continuar volvera a mostrar el catalogo de productos

    let condition = true;

    while(condition){

        let ask = Number(prompt(`Que desea hacer?
        1-Finalizar compra y ver total a pagar
        2-Eliminar un producto
        3-Seguir comprando`))
    
        switch(ask){
            case 1:
                total = iva(totalPrice(cart));
                alert(`Su total a pagar es de $${total} iva inc.`);
                let payment = Number(prompt(`Desea abonar en cuotas? Ingrese número:
                1:Si
                2:No`));
                if(payment == 1){
                    let fees = Number(prompt(`En cuantas cuotas desea abonar?
                    1:6 cuotas
                    2:12 cuotas`));
                    if(fees == 1){
                        cantidadCuotas = 6;
                    }else if(fees == 2){
                        cantidadCuotas = 12;
                    }else{
                        alert('Datos ingresados incorrectos');
                        condition = true;
                    };
                    if (fees == 1 || fees == 2) {
                       confirmPurchase = confirm(`Confirma el pago en ${cantidadCuotas} cuotas de $${cuotasCalculo(total,cantidadCuotas)} iva inc.?`);
                       if(confirmPurchase){
                        Swal.fire(
                        `Usted ha comprado ${cantidadTotal(cart)} guitarra/s en ${cantidadCuotas} cuotas de $${cuotasCalculo(total,cantidadCuotas)} `,
                        `Vuelva pronto`,
                        `success`);
                        condition = false;
                        continuePurchasing = false;

                       }
                    }
                }else if(payment == 2){
                    confirmPurchase = confirm(`Confirma el pago al contado de ${cantidadTotal(cart)} guitarra/s por $${total} iva inc.?`);
                    if(confirmPurchase){
                        Swal.fire(
                        `Usted ha comprado ${cantidadTotal(cart)} guitarra/s con un total de $${total} `,
                        `Vuelva pronto`,
                        `success`);
                        condition = false;
                        continuePurchasing = false;
                    }
                }else{ alert('Datos ingresados incorrectos');
                condition = true;
            }
                break;
            case 2:
                let numberInList = 1;
                list = '';
                for (const el of cart) {
                    list  += `${numberInList ++}: ${el.brand} ${el.model} $${el.price} cantidad: ${el.amount}
            `
                }
                let productInList = Number(prompt(`Que producto desea eliminar del carrito? Ingrese número según elección:
            ${list}
            `));
                if(productInList > 0 && productInList <= cart.length){
                    productToDelete = itemInArray(cart,productInList);
                    let confirmDelete = confirm(`Confirma la eliminación de una guitarra ${productToDelete.brand} ${productToDelete.model} de costo $${productToDelete.price}?`);
                    if(confirmDelete){ 
                        if(productToDelete.amount > 1){
                            productToDelete.amount --;
                        }else{
                            cart.splice(cart.indexOf(productToDelete), 1);
                        }
                        alert(`Se eliminó una guitarra ${productToDelete.brand} ${productToDelete.model} del carrito.`)};
                }else{
                    alert('Datos ingresados incorrectos')
                }
                condition = true
                break;
            case 3:
                condition = false;
                continuePurchasing = true;
                break;
            default:
                alert('Datos ingresados incorrectos');
            break;
        }
    
    }

    } 

selectedGuitar = '';
selectedColor = '';


}while(continuePurchasing)






