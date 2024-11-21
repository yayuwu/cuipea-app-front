// import { nextSlide, prevSlide } from './home/carouselForo.js';
import Swal from 'sweetalert2'
import './routes/router.js'
import './ingreso.js'
import './registro.js'
import './controlNinoSano.js'
import './registroSintomas.js'
import './consultaEnfermedad.js'
import './vacunacion.js'
import './perfil.js'
// import './clinicData.js'
// import './postClinicData.js'
// import './home/carouselInfo.js'


// Funciones del CAROUSEL del FORO (HOME)
// window.nextSlide = nextSlide;
// window.prevSlide = prevSlide;

document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('userData')
    const btnPerfil = document.getElementById('btn-perfil');
    const linkIngreso = document.getElementById('ingreso-link')
    console.log(linkIngreso)

    if(userData) {
        linkIngreso.style.display = 'none'
        btnPerfil.addEventListener('click', () => {
            window.location.href = '/perfil'
        })
        
    } else {
        linkIngreso.style.display = 'block'
        btnPerfil.addEventListener('click', () => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Para acceder al perfil debes iniciar sesión",
            })
        })
    }
})
