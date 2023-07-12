//mi carrito de compras

const pintarCarrito =()=> {
    modalContainer.innerHTML= "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title"> Carrito </h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () =>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <h3> ${product.nombre}</h3>
            <p>$ ${product.precio}</p>
            <span class="restar"> ➖ </span>
            <p> ${product.cantidad}</p>
            <span class="sumar"> ➕ </span>
            <p>Total: $ ${product.cantidad * product.precio}</p>
            <span class="delete-product"> ❌ </span>
        `;
        
        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector (".restar");
        restar.addEventListener ("click",()=>{
            if(product.cantidad !== 1){
            product.cantidad--;
            }
            guardarCarrito();
            pintarCarrito();
        })

        let sumar = carritoContent.querySelector (".sumar");
        sumar.addEventListener ("click", ()=>{
            product.cantidad ++;
            guardarCarrito();
            pintarCarrito();
        })

        let eliminar = carritoContent.querySelector (".delete-product")
        eliminar.addEventListener ("click",()=>{
            eliminarProducto (product.id);
        })

    });

    const total = carrito.reduce((acc, el)=> acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement ("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar:$ ${total}`;
    modalContainer.append(totalBuying);
    
    //finalizar compra
    const finalizarCompra = document.createElement ("button")
    finalizarCompra.id = "finalizar-compra"
    finalizarCompra.innerText = "Finalizar compra"
    modalContainer.append (finalizarCompra)
    
    let finalizarCarrito = document.getElementById ("finalizar-compra");
    finalizarCarrito.onclick =()=>{
        Swal.fire({
            title: 'Muchas gracias por tu compra, te llegará en los próximos días',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
                },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then(() => {
        carrito.length = 0;
        localStorage.removeItem('modal-container');
        pintarCarrito();
        carritoCounter(); 
        });
    }
;}
verCarrito.addEventListener ("click", pintarCarrito);

const eliminarProducto = (id) =>{
    const foundId = carrito.find ((element) => element.id === id);

    carrito = carrito.filter ((carritoId) => {
        return carritoId !== foundId ;
    });
    carritoCounter();
    guardarCarrito();
    pintarCarrito ();
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem ("carritoLength", JSON.stringify (carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
};

carritoCounter();