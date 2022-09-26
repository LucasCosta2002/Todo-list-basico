// variables
const formulario = document.querySelector('#formulario');
const listTareas = document.querySelector('#lista-tareas');
let tareas = [];


//event listeners
eventListeners()
function eventListeners() {
    formulario.addEventListener('submit', agregarTarea);

    document.addEventListener('DOMContentLoaded', ()=>{
        tareas = JSON.parse( localStorage.getItem('tareas')) || []; //cargar las tareas del localstorage, si no hay, cargar un array vacio para que no de error null
        crearHTML();
    })
}



// funciones
function agregarTarea(e){
    e.preventDefault();

    const tarea = document.querySelector('#tarea').value; //textarea
 
    if (tarea === '') { //validacion
        mostrarError('Una tarea no puede ir vacia');
        return; //previene que se ejecute el codigo que sigue
    };

    const tareaObj = {
        id: Date.now(),
        tarea
    }

    tareas = [...tareas, tareaObj]; //añadir al array de tareas

    crearHTML(); //crear listado html
       
    formulario.reset();
};

function crearHTML(){

    limpiarHTML();

    if (tareas.length > 0) {
        tareas.forEach( tarea=>{

            const boton = document.createElement('a');
            boton.classList.add('borrar-tarea');
            boton.innerText = "X";

            boton.onclick = ()=>{
                borrarTarea(tarea.id);
            }

            const li = document.createElement('li');
            li.innerHTML = tarea.tarea;
            listTareas.appendChild(li);

            li.appendChild(boton);
            
        });
    };

    sincronizarStorage();
};
//agregar las tareas al localstorage
function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

function borrarTarea(id){
    tareas = tareas.filter( tarea => tarea.id !== id); // borra el id distinto

    crearHTML();
}

function mostrarError(mensaje) {

    const existeError = document.querySelector('.error');
    if (!existeError) {
        const error = document.createElement('p');
        error.classList.add('error');
        error.textContent = mensaje;

        const contenido = document.querySelector('#contenido');

        contenido.appendChild(error)

        setTimeout(() => {
            error.remove()
        }, 4000);
    }

    
};


function limpiarHTML(){
    while(listTareas.firstChild){
        listTareas.removeChild(listTareas.firstChild)
    }
};

