import Handlebars from "handlebars";

// ! ¿Cómo inyectamos nuestro template en nuestro html? ¿o como lo haríamos si manejamos muchos datos?
// ! -------------------------------------------------------------------------------------------------

// ! Creamos temporalmente un pequeño array de guardias, esto en realidad lo traeríamos de la base de datos, pero lo tomamos como algo temporal por mientras 

let guardias = [
    { title: 'Guardia 1', date: '12/04/24'},
    { title: 'Guardia 2', date: '15/03/24'},
    { title: 'Guardia 3', date: '22/07/24'},
    { title: 'Guardia 4', date: '02/02/24'}
]

// ! Realizamos una función reutilizable para obtener el template

const loadTemplate = async (url)=> {
    const res = await fetch(url)
    return res.text()
}

// ! Creamos una variable donde almacenaremos nuestra ruta de nuestro template, que lo pondremos en la carpeta /templates siempre

const urlBoxTemplate = '/templates/box.hbs'

// ! Llamamos a la función y la gestionamos
loadTemplate(urlBoxTemplate)
.then(templateSource => { const boxTemplate = Handlebars.compile(templateSource)
    
    // ! Generar el HTML para cada guardia haciendo un map del array de datos guardias
    const generatedHTML = guardias.map(guardia => boxTemplate(guardia)).join('');
    
    // ! Insertar el HTML generado en el contenedor
    const container = document.getElementById('guardia-boxes');
    container.innerHTML = generatedHTML;

    // ! Asignamos la clase correspondiente para los estilos, revisar los estilos disponibles en _box.scss
    const boxes =  container.querySelectorAll('.box-container')
    
    // ! Realizamos un forEach donde recorremos todos los .boxcontainer renderizados para agregarles los estilos
    boxes.forEach(box => {
        box.classList.add('green-box')
    })
})

// ! -----------------------------------------------------
// ! Mismo template de box, pero con otra clase de estilos
// ! -----------------------------------------------------

let consultas = [
    { title: 'Consulta 1', date: '04/01/24'},
    { title: 'Consulta 2', date: '05/11/24'},
    { title: 'Consulta 3', date: '21/07/24'},
    { title: 'Consulta 4', date: '13/09/24'}
]

loadTemplate(urlBoxTemplate)
.then(templateSource => { const boxTemplate = Handlebars.compile(templateSource)
    
    // ! Generar el HTML para cada consulta haciendo un map del array de datos consultas
    const generatedHTML = consultas.map(consulta => boxTemplate(consulta)).join('');
    
    // ! Insertar el HTML generado en el contenedor
    const container = document.getElementById('consultas-boxes');
    container.innerHTML = generatedHTML;

    // ! Asignamos la clase correspondiente para los estilos DENTRO del container, revisar los estilos disponibles en _box.scss
    const boxes =  container.querySelectorAll('.box-container')
    
    // ! Realizamos un forEach donde recorremos todos los .boxcontainer renderizados para agregarles los estilos
    boxes.forEach(box => {
        box.classList.add('blue-box')
    })
})

// ! --------------------------------------------------------------------------
// ! Y si quiero renderizar SOLO UN componente sin involucrar datos, ¿cómo hago? 
// ! --------------------------------------------------------------------------

const urlButtonAgregar = '/templates/buttonAgregar.hbs'

loadTemplate(urlButtonAgregar)
.then(templateSource => { const btnTemplate = Handlebars.compile(templateSource)
    // ! Ingresamos el dato segpun el template (hbs), en este caso text
    const data = {text: 'control'}
    const buttonHTML = btnTemplate(data)
    
    // ! Obtenemos el contenedor para inyectar el botón 
    const container = document.getElementById('btn-consulta')
    container.innerHTML = buttonHTML;

    // ! Obtenemos el botón de ESE CONTENEDOR y le agregamos la clase de estilos, que podrán ver en _btn_agregar.scss
    const btnAgregar = container.querySelector('.btn-agregar')
    btnAgregar.classList.add('btn-agregar-salmon')
})

