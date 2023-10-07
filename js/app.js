// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarcarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
// Asignar la variable para seleccionar el carrito de compras
let articulosCarrito = [];

// Función que contiene los eventos agrupados que serás ejecutados
cargarEventListners();
function cargarEventListners() {

     //Evento que se ejecuta cuando se agrega un nuevo curso mediante el botón 'agregar al carrito'
     listaCursos.addEventListener('click',agregarCurso);
}


// Funciones
// Agregar cursos mediante el botón agregar añ carrito
function agregarCurso(e) {

     e.preventDefault();

     // Verifica que el click sea dado en el botón correcto
     if (e.target.classList.contains('agregar-carrito')) {
          const cursoSeleccionado = e.target.parentElement.parentElement;
          leerDatosCurso(cursoSeleccionado);
     }
}

// Lee el contenido del HTML y extrae la información del curso
function leerDatosCurso(curso) {

     // Crear un objeto con el contenido del curso actual
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1,
     }

     // Agrega elementos al arreglo de carrito
     articulosCarrito = [ ...articulosCarrito,infoCurso ];
     console.log(articulosCarrito);
     // Función que se encarga de almacenar los datos en el carrito
     carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

     // Antes de crear el HTML e inyectarlo, hay que limpiar el HTML
     limpiarHtml();

     // Recorre el carrito y genera el HTML
     articulosCarrito.forEach(curso => {

          // Aplicar destructuring para extraer los valores y crear la variable
          const { imagen,titulo,precio,cantidad } = curso;

          // Crea la tabla en la que se almacenarán los datos
          const row = document.createElement('tr');
          row.innerHTML = `
               <td> <img src= "${imagen}" width="100" > </td>
               <td> ${titulo} </td>
               <td> ${precio} </td>
               <td> ${cantidad} </td>
               <td> <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a> </td>
          `;

          // Agrega el HTML del carrito en el carrito
          contenedorCarrito.appendChild(row);
     });
}

// Elimina los cursos del tbody para evitar que se dupliquen
function limpiarHtml() {

     // Forma lenta
     // contenedorCarrito.innerHTML = '';

     // Forma rápida de limpiar el HTML
     while (contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}
