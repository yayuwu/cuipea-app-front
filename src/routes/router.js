import page from 'page';

 // Cargar vista dinámica
 const loadView = async (view) => {
    try {
        document.getElementById("content").innerHTML = " ";
        const response = await fetch(`./views/${view}.html`);
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

page('/info', () => {
    loadView('informacion')
})

page('/nosotras', () => {
    loadView('nosotras')
})


// Ruta login y regsitro

page('/ingreso-sesion', () => {
    if (checkAuth()) {
        page.redirect('/perfiles');
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

// Ruta perfil

page('/perfiles', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('perfiles');
    }
})

page('/perfil', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('perfil')
    }
})

page('/editar-perfil', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('editarPerfil')
    }
})

page('/editar-datos', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('editarDatos')
    }
})

// Historial clínico


page('/historial', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('historial')
    }
})

// Rutas turnos

page('/turnos', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('turnos')
    }
})




// Rutas control de niño sano

page('/control', () => {
    if (!checkAuth()) {
        page.redirect('/pagina-no-encontrada')
    } else {
        loadView('controlNinoSano')
    }
})

page('/agregar-control', () => {
    if (!checkAuth()) {
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

page('/agregar-estudios', () => {
    loadView('agregarEstudios'); 
})

// Rutas consulta guardia

page('/atencion-guardia', () => {
    loadView('consultaGuardias'); 
})

page('/agregar-guardia', () => {
    loadView('agregarGuardias'); 
})

// Ruta NOSOTROS MISION Y VISION

page('/nosotros', () => {
    loadView('nosotrosCuipea'); 
})

// Ruta de la sección de donaciones

page('/donaciones', () => {
    loadView('donar'); 
})

// Ruta de información: Lactancia

page('/lactancia', () => {
    loadView('lactancia'); 
})

page('/pasos-lactancia', () => {
    loadView('pasosAlmacenar'); 
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

