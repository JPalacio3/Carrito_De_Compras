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

     // Eimina cursos del carrito
     carrito.addEventListener('click',eiminarCurso);

     // Vaciar el carrito
     vaciarcarritoBtn.addEventListener('click',() => {
          articulosCarrito = []; // Reseteamos el arreglo
          limpiarHtml(); // Limpiamos todo el contenido del carrito
     });
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

// Elimina cursos del carrito
function eiminarCurso(e) {
     if (e.target.classList.contains('borrar-curso')) {
          // Obtenemos el atributo de id para seleccionar correctamente el que queremos eliminar
          const cursoId = e.target.getAttribute('data-id');

          // Elimna del arreglo articulos por el data-id
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
          carritoHTML(); // Volvemos a iterar sobre el carrito y mostrar su html
     };
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

     // Revisa si un elemento ya existe en el carrito, y de ser así, no lo agrega más veces, lo suma a la cantidad
     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
     if (existe) {
          // Actualizamos la cantidad
          const cursos = articulosCarrito.map(curso => {
               if (curso.id === infoCurso.id) {
                    curso.cantidad++;
                    return curso; // Retorna los objetos actualizados
               } else {
                    return curso; // Retorna los objetos que no están duplicados
               }
          });

          articulosCarrito = [ ...cursos ];

     } else {
          // Agrega elementos al arreglo de carrito
          articulosCarrito = [ ...articulosCarrito,infoCurso ];
          console.log(articulosCarrito);
     }

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
