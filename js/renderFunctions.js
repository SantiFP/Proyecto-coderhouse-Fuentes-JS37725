// Aquí en esta funcion renderizo un array(ya sea todas las guitarras o las guitarras filtradas) en el div con el id renderguitars

const renderGuitars = async (array) => {

    let htmlGuitars = '';

    let guitars = await array;

    guitars.forEach(el => {

        htmlGuitars += `
                <div  class="flex flex-col items-center w-3/4 mt-4 lg:w-1/4 lg:ml-6 ">

                <div class="w-full shadow flex flex-col bg-white w-full items-center text-center space-y-3 pb-4 font-montserrat font-medium rounded-md">
                    
                    <img class="w-36 pb-2 rounded-lg" src="${el.img}" alt="img">
                    <p>${el.brand}</p>
                    <p>${el.model}</p>
                    <p>$${el.price}</p>
            
                </div>

                <div onclick=pushToCart(${el.id}) class="font-cart text-sm font-semibold cursor-pointer flex hoveragregar bg-blue-300 px-4 py-2 rounded-b-xl">
                    <button >AGREGAR AL CARRITO</button>
                    <img class="h-6 w-6 ml-3" src="../logos/add-to-cart.png" alt="">
                </div>

            </div>
            `;

    });

    guitarsHtml.innerHTML = htmlGuitars

}

// Aquí, con esta función renderizo en el div con id renderguitars las guitarras que se encuentran en el carrito(cart)


const renderGuitarsCart = (array) => {

    let htmlGuitars = '';

    array.forEach((el) => {

        htmlGuitars += `<div  class="flex flex-col items-center w-3/4 mt-4 lg:w-1/4 lg:ml-6 ">

            <div class="w-full shadow flex flex-col bg-white w-full items-center text-center space-y-3 pb-4 font-montserrat font-medium rounded-md">
                
                <img class="w-36 pb-2 rounded-lg" src="${el.img}" alt="img">
                <p>${el.brand}</p>
                <p>${el.model}</p>
                <p>Cantidad: ${el.amount}
                <p>$${el.price * el.amount}</p>
        
            </div>

            <div class="font-cart font-semibold">
                <button onclick=remove(${el.id}) class="hoverborrar bg-red-500 px-4 py-2 rounded-b-xl">ELIMINAR DEL CARRITO</button>
            </div>


        </div>
            `;

    });

    guitarsHtml.innerHTML = htmlGuitars

};

// Esta función se encarga de renderizar el div de total a pagar y el botón de continuar al pago o esconder estos elementos y el form de pago
// en caso de que no haya productos en el carrito

const renderTotal = () => {

    const cartFromStorage = JSON.parse(localStorage.getItem('cart'));

    let totalHtml = iva(totalPrice(cartFromStorage));

    if (totalHtml) {
        total.innerHTML = `<p class="bg-blue-400 px-3 py-2 text-center">Total:$${totalHtml}<br>
        el total tiene el iva incluido</p>`;
        continueToPayment.innerHTML = `<a href="#planesdepago"><button onclick=renderPayment() class="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-base rounded-xl">
        CONTINUAR AL PAGO</button></a>`
        total.classList.remove('hidden');
        continueToPayment.classList.remove('hidden')
    } else {
        total.innerHTML = '';
        total.classList.add('hidden');
        continueToPayment.classList.add('hidden');
        paymentDiv.classList.add('hidden')
    }
}

// Esta funcion se encarga de renderizar el formulario de pago y desarrolla la logica para obtener la eleccion de plan de pago del usuario
// y devolverle en un alert la tarjeta de credito seleccionada y el metodo de pago elegido(1 pago,4 cuotas,etc),tambien borra la
// clave cart del localstorage y recarga la pagina al finalizar la compra.

const renderPayment = () => { 
    
        const cartFromStorage = JSON.parse(localStorage.getItem('cart'));

        let totalHtml = iva(totalPrice(cartFromStorage));

        paymentDiv.classList.remove('hidden');
        paymentDiv.innerHTML = `<div id="planesdepago" class="${shadow} bg-white text-center px-4 py-2 text-blue-900 rounded-md">
                                <p>Seleccione plan de pago:</p>
                                <p>Tarjeta de crédito hasta en 12 cuotas sin recargo</p>
                                <p class="text-xs pt-2">15% de descuento con pago con tarjeta Visa
                            </div>
                            <form id="fullform" class="pl-12 pb-6">

                                <div id="formtarjeta" >
                                    <input class="${input}" type="radio" id="visa" name="payment" value="Visa">
                                    <label class="${label}" for="visa"><img class="w-20 h-20 -mt-1" src="../logos/visa.png" alt=""></label><br>

                                    <input class="${input}" type="radio" id="mastercard" name="payment" value="Mastercard">
                                    <label class="-mt-3 ${label}" for="mastercard"><img class="w-24 h-12" src="../logos/mastercard.png" alt=""></label><br>

                                    <input class="${input}" type="radio" id="diners" name="payment" value="Diners">
                                    <label class="${label}" for="diners"><img class="w-26 h-12" src="../logos/diners.png" alt=""></label>
                                </div>

                                <div id="formcuotas">
                                    <div class="flecha ${selectStyle} pr-10 ">
                                        <select class="selectText ${floatingLabel} cursor-pointer outline-none">
                                            <option value="1 pago">1 pago</option>
                                            <option value="4 cuotas">4 cuotas</option>
                                            <option value="8 cuotas">8 cuotas</option>
                                            <option value="12 cuotas">12 cuotas</option>
                                        </select>
                                        <span class="floating-label">Método de pago</span>
                                    </div>

                                </div>

                                <div class="pb-4 pl-4"><button id="btnsubmit" class="rounded-full py-3 hover:bg-blue-700 px-12 button text-xl">COMPRAR</button></div>

                                    
                            </form>`  

const card = document.getElementById('formtarjeta');
const fees = document.getElementById('formcuotas');
const btnSubmit = document.getElementById('btnsubmit');
const fullForm = document.getElementById('fullform');

let selectedCard;
let selectedFees;

card.addEventListener('click',(e) =>{
    selectedCard = e.target.value;
});

fees.addEventListener('click',(e) =>{
    selectedFees = e.target.value;
});

btnSubmit.addEventListener('click',(e) => {
    e.preventDefault();
    if(selectedCard && selectedFees){ 
        let feesArray = selectedFees.split(' ');
        let numberOfFees = Number(feesArray[0]);
        if(selectedCard == 'Visa'){
            Swal.fire({
                title: `Usted pago con tarjeta ${selectedCard} en ${selectedFees} de $${discount(feesComputation(totalHtml,numberOfFees),0.15)}`,
                text: 'Gracias por su compra',
                footer: '*descuento del %15 aplicado',
                icon: 'success',
                showConfirmButton: false
            });
        }else{
            Swal.fire({
                title: `Usted pago con tarjeta ${selectedCard} en ${selectedFees} de $${feesComputation(totalHtml,numberOfFees)}`,
                text:'Gracias por su compra',
                icon: 'success',
                showConfirmButton: false
            });
        }
        localStorage.removeItem('cart');
        setTimeout(() => {location.reload(),toggleClass();}, 3000);
     }else{
        Swal.fire({
            position: 'center',
            icon: false,
            title: 'Faltan datos',
            showConfirmButton: false,
            timer: 1000
        })
     }  
});

fullForm.addEventListener('submit',(e)=>{
    e.preventDefault();
})

};
