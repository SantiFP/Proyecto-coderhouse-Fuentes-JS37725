// Aquí, con esta función renderizo en el div las guitarras según elección del ususario(acústicas,eléctricas o electroacústicas)

const renderGuitars = (array) => {

    let htmlguitars = '';

    array.forEach(el => {

        htmlguitars += `<div class=" w-3/4 mx-auto  ">
            <div id="shadow" class="bg-white rounded-3xl pt-4 guitar flex flex-col  lg:p-0 lg:flex lg:flex-row justify-center guitar   ">
                <div class="border-b-2 border-blue-400 pb-5 lg:border-b-0 lg:border-r-2 lg:py-4 lg:w-1/3 flex items-center "> <img class="imglogo h-20 mx-auto " src=${el.logo} alt="img"></div>
                <div class="flex flex-col border-b-2 border-blue-400 pb-6 items-center justify-center space-y-2 py-4 lg:border-b-0 lg:border-r-2 lg:p-0 lg:w-1/3 ">
                    <div class="text-xl">${el.brand}</div>
                    <div class=" text-xl">${el.model}</div>
                </div>
                <div class="flex flex-col pb-6 lg:p-0  lg:w-1/3 items-center py-4 space-y-2 justify-center">
                    <div class="text-xl">$${el.price}</div>
                </div>
            </div>
            <div class="flex justify-center -mb-5">
                <button onclick="pushToCart(${el.id})" class="hoveragregar bg-blue-300 px-4 py-2 rounded-b-xl" >Agregar al carrito</button>
            </div>
        </div>
            `;

    });

    guitarshtml.innerHTML = htmlguitars

}

// Aquí, con esta función renderizo en el div con id renderguitars las guitarras que se encuentran en el carrito(cart)


const renderGuitarsCart = (array) => {

    let htmlguitars = '';

    array.forEach((el) => {

        htmlguitars += `<div class=" w-3/4 mx-auto  ">
            <div id="shadow" class="bg-white rounded-3xl pt-4 guitar flex flex-col  lg:p-0 lg:flex lg:flex-row justify-center guitar   ">
                <div class="border-b-2 border-blue-400 pb-5 lg:border-b-0 lg:border-r-2 lg:py-4 lg:w-1/3 flex items-center "> <img class="imglogo h-20 mx-auto " src=${el.logo} alt="img"></div>
                <div class="flex flex-col border-b-2 border-blue-400 pb-6 items-center justify-center space-y-2 py-4 lg:border-b-0 lg:border-r-2 lg:p-0 lg:w-1/3 ">
                    <div class="text-xl">${el.brand}</div>
                    <div class=" text-xl">${el.model}</div>
                </div>
                <div class="flex flex-col pb-6 lg:p-0  lg:w-1/3 items-center py-4 space-y-2 justify-center">
                    <div class=" text-xl">Cantidad: ${el.amount}</div>
                    <div class="text-sm ">$${el.amount * el.price}</div>
                </div>
            </div>
            <div class="flex justify-center -mb-5">
                <button onclick="remove(${el.id})" class="hoverborrar bg-red-500 px-4 py-2 rounded-b-xl" >Eliminar del carrito</button>
            </div>
        </div>
            `;

    });

    guitarshtml.innerHTML = htmlguitars

};

// Esta función se encarga de renderizar el div de total a pagar y el botón de continuar al pago o esconder estos elementos y el form de pago
// en caso de que no haya productos en el carrito

const renderTotal = () => {

    const cartFromStorage = JSON.parse(localStorage.getItem('cart'));

    let totalHtml = iva(totalPrice(cartFromStorage));

    if (totalHtml) {
        total.innerHTML = `<p class="bg-blue-400 px-3 py-2 text-center">Total:$${totalHtml}<br>
        el total tiene el iva incluido</p>`;
        continueToPayment.innerHTML = `<a href="#planesdepago"><button onclick=renderPayment() class="bg-blue-500 hovercompra px-8 py-2 text-base rounded-xl">
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
// y devolverle en un alert la tarjeta de credito seleccionada y el metodo de pago elegido(1 pago,4 cuotas,etc),tambien limpia el localstorage
// y recarga la pagina al finalizar la compra

const renderPayment = () => { 

        const cartFromStorage = JSON.parse(localStorage.getItem('cart'));

        let totalHtml = iva(totalPrice(cartFromStorage));

        paymentDiv.classList.remove('hidden');
        paymentDiv.innerHTML = `<div id="planesdepago" class=" bg-white text-center px-4 py-2 text-blue-900 rounded-md lg:-mt-20">
                                <p>Seleccione plan de pago:</p>
                                <p>Tarjeta de crédito hasta en 12 cuotas sin recargo</p>
                                <p class="text-xs pt-2">15% de descuento con pago con tarjeta Visa
                            </div>
                            <form id="fullform" class="pl-12 pb-6">

                                <div id="formtarjeta" >
                                    <input type="radio" id="visa" name="payment" value="Visa">
                                    <label  for="visa"><img class="w-20 h-20 -mt-1" src="./logos/visa.png" alt=""></label><br>

                                    <input type="radio" id="mastercard" name="payment" value="Mastercard">
                                    <label class="-mt-3" for="mastercard"><img class="w-24 h-12" src="./logos/mastercard.png" alt=""></label><br>

                                    <input type="radio" id="diners" name="payment" value="Diners">
                                    <label for="diners"><img class="w-26 h-12" src="./logos/diners.png" alt=""></label>
                                </div>

                                <div id="formcuotas">
                                    <div class="flecha pr-10 ">
                                        <select class="selectText inputstyle cursor-pointer outline-none " id="" name="">
                                            <option value="1 pago">1 pago</option>
                                            <option value="4 cuotas">4 cuotas</option>
                                            <option value="8 cuotas">8 cuotas</option>
                                            <option value="12 cuotas">12 cuotas</option>
                                        </select>
                                        <span class="floating-label">Método de pago</span>
                                    </div>

                                </div>

                                <div class="pb-4 pl-4"><button id="btnsubmit" class="rounded-full py-3 px-12 button text-xl">COMPRAR</button></div>
                                    
                            </form>`  

const card = document.getElementById('formtarjeta');
const fees = document.getElementById('formcuotas');
const btnSubmit = document.getElementById('btnsubmit');
const fullForm = document.getElementById('fullform')

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
            Swal.fire(`Usted pago con tarjeta ${selectedCard} en ${selectedFees} de $${discount(feesComputation(totalHtml,numberOfFees),0.15)}`,
            'Descuento del 15% aplicado vuelva pronto',
            'success',
            );
        }else{
            Swal.fire(`Usted pago con tarjeta ${selectedCard} en ${selectedFees} de $${feesComputation(totalHtml,numberOfFees)}`,
            'Vuelva pronto',
            'success');
        }
        localStorage.removeItem('cart');
        setTimeout(() => location.reload(), 3000);
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
