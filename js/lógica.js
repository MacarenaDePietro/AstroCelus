
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("carro")) || [];


const getPorduct = async()=>{
    const response = await fetch("data.json");
    const data = await response.json();

//DOM
//productos

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src=${product.foto}
            <h3>${product.nombre}</h3>
            <p class="price"> $ ${product.precio}</p>
            `;
    
        shopContent.append(content);
    
        let comprar = document.createElement("button")
        comprar.innerText = "Comprar";
        comprar.className = "comprar"
    
        content.append(comprar);
    
        comprar.addEventListener("click", () => {
    
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
    
            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                })
            } else {
                carrito.push({
                    id: product.id,
                    img: product.foto,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
            }
            console.log(carrito);
            Swal.fire({
                title: 'Muy bien!',
                text: `Agregaste ${product.nombre} al carrito`,
                imageUrl: product.foto,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: product.nombre,
            })
            carritoCounter();
            guardarCarrito();
        })
    });

};

getPorduct();

//localStorage
const guardarCarrito = () => {
    localStorage.setItem("carro", JSON.stringify(carrito))
}