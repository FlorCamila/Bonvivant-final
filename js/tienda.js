document.addEventListener("DOMContentLoaded", () =>{

    fetchData()

    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }

});

const fetchData = async () =>{

    try{
        const res = await fetch ('./api.json');
        const data = await res.json(); 

        pintarCards(data);
        detectarBotones(data);

    }catch (error){
        console.log(error);
    }

}

const contenedorProductos = document.querySelector('#contenedor-productos')


const pintarCards = data => {

    const template = document.querySelector('#template-card').content;
    const fragment = document.createDocumentFragment();

    data.forEach(producto => {
        
        template.querySelector('h5').textContent = producto.titulo
        template.querySelector('p').textContent = producto.precio
        template.querySelector('img').setAttribute ("src", producto.imagen)
        template.querySelector('.btn').dataset.id = producto.id
        
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}


let carrito = {};

const detectarBotones = (data) => {

    const botones = document.querySelectorAll ('.card button');
    
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = data.find (item => item.id === parseInt (btn.dataset.id))
            producto.cantidad = 1
            if (carrito.hasOwnProperty (producto.id)){
                producto.cantidad = carrito [producto.id].cantidad +1
            }

            carrito [producto.id] = {...producto}

           pintarCarrito()

        })
    })

}

const items = document.querySelector('#items')


const pintarCarrito = () =>{

    items.innerHTML = ""

    const template = document.querySelector('#template-carrito').content;
    const fragment = document.createDocumentFragment();

    Object.values (carrito).forEach(producto =>{
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.titulo
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad

        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true);
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()
    accionBotones()

    localStorage.setItem('carrito', JSON.stringify(carrito))

}

const footer = document.querySelector('#footer-carrito')

const pintarFooter = () =>{

    footer.innerHTML = ""

    if(Object.keys(carrito).length === 0){
        footer.innerHTML = '<th scope="row" colspan="5"> Carrito Vacío </th>'
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment();

    const nCantidad= Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad, 0)
    const nPrecio= Object.values(carrito).reduce((acc, {cantidad, precio})=> acc + cantidad * precio, 0)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true);
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#comprar-carrito')
    boton.addEventListener('click', ()=>{
        Swal.fire({
            text: 'Muchas gracias por su compra!',
            showConfirmButton: false
          })
        carrito = {}
        pintarCarrito()
    })

}   

const accionBotones = () =>{

    const botonesAgregar = document.querySelectorAll ('#items .btn-info');
    const botonesEliminar = document.querySelectorAll ('#items .btn-danger');

    botonesAgregar.forEach(btn =>{
        btn.addEventListener('click', () =>{
            const producto = carrito [btn.dataset.id]
            producto.cantidad++
            carrito[btn.dataset.id] = {...producto}

            pintarCarrito()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad --
            if(producto.cantidad === 0){
                delete carrito[btn.dataset.id] 
                pintarCarrito()
            }else {
                carrito[btn.dataset.id] = {...producto}
                pintarCarrito()
           }
        })
    })
    
}
      