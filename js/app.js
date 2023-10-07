// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarcarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

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
     // console.log(curso);

     // Crear un objeto con el contenido del curso actual
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1,
     }

     console.log(infoCurso);
}
