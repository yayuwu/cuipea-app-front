import page from 'page';

// Manejo de autenticacion
const isAuthenticated = () => {
    return true
}

 // Rutas privadas
 const protectRoute = (ctx, next) => {
    if (isAuthenticated()) {
        next()
    } else {
        page.redirect('/pagina-no-encontrada')
    }
 }

 // Cargar vista dinámica
 const loadView = async (view) => {
    try {
        document.getElementById("content").innerHTML = " ";
        const response = await fetch(`./${view}.html`);
        if (response.ok) {
            const html = await response.text();
            document.getElementById("content").innerHTML = html;
        } else {
            document.getElementById("content").innerHTML = "<p>Error al cargar la vista</p>";
        }
    } catch (error) {
        console.log("Error: ", error);
        document.getElementById("content").innerHTML = "<p>Error al cargar la vista</p>";
    }
}

const checkAuth = () => {
    return localStorage.getItem('userData') !== null
}

// Rutas 
page('/', () => {
    loadView('home'); 
})

page('/foro', () => {
    loadView('foro_1');
})


// Ruta login y regsitro

page('/ingreso-sesion', () => {
    if (checkAuth()) {
        page.redirect('/pagina-no-encontrada');
    } else {
        loadView('ingresoSesion');
    }
})

page('/registro-tutor', () => {
    if (checkAuth()) {
        page.redirect('/pagina-no-encontrada');
    } else {
        loadView('registroTutor');
    }
})

page('/registro-infante', () => {
    if (checkAuth()) {
        page.redirect('/pagina-no-encontrada');
    } else {
        loadView('registroInfante');
    }
})

page('/registro-exitoso', () => {
    if (checkAuth()) {
        page.redirect('/pagina-no-encontrada');
    } else {
        loadView('registroExitoso');
    }
})

// Rutas control de niño sano

page('/control', () => {
    if (    !checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('controlNinoSano')
    }
})

page('/agregar-control', () => {
    if (    !checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('agregarControl')
    }
})

// Rutas registro de síntomas

page('/registro-sintomas',  () => {
   if (!checkAuth()) {
    page.redirect('/pagina-no-encontrada')
   } else {
    loadView('resgitroSintomas')
   }
})

page('/agregar-sintoma', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('agregarRegistroSintoma')
    }
})

// Rutas consulta por enfermedad 

page('/consulta-enfermedad', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('consultaEnfermedad')
    }
})

page('/agregar-consulta', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('agregarConsultaEnfermedad')
    }
})

// Rutas consulta estudios

page('/consulta-estudios', () => {
    loadView('consultaEstudios'); 
})

// Ruta de la sección de donaciones

page('/donaciones', () => {
    loadView('donar'); 
})

// Ruta de información: Lactancia

// Ruta de la sección de donaciones

page('/lactancia', () => {
    loadView('lactancia'); 
})



// Rutas libreta vacunación 

page('/vacunas', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('libretaVacunacion')
    }
})

page('/agregar-vacuna', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('agregarVacuna')
    }
})

// Rutas datos clínicos

page('/datos-clinicos/post', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('formDataClinic')
    }
})

page('/pagina-no-encontrada', () => {
    loadView('pageNotFound')
})

page('*', () => {
    loadView('pageNotFound')
})

page()

