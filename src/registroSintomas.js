import loadTemplate from './loadTemplate.js'
import Swal from 'sweetalert2'

let registros = [
    { title: 'Registro 1', date: '12/04/24'},
    { title: 'Registro 2', date: '15/03/24'},
    { title: 'Registro 3', date: '22/07/24'},
    { title: 'Registro 4', date: '02/02/24'}
]

const urlBox = '/templates/box.hbs' 
const urlBtn = '/templates/buttonAgregar.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        // Cargo todos los boxes
        loadTemplate(urlBox)
            .then(template => {
                const boxTemplate = Handlebars.compile(template)
                const boxHtml = registros.map(registro => boxTemplate(registro)).join('')
                const containerBoxes = document.getElementById('registroBoxesContainer')

                const currentLocation = window.location.pathname

                if (currentLocation === '/registro-sintomas') {
                    Swal.fire({
                        title: 'Cargando...',
                        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                        didOpen: () => {
                            Swal.showLoading() // Activa el spinner de carga
                        },
                    })
                }
    
                if(containerBoxes) {
                    containerBoxes.innerHTML = boxHtml
                    Swal.close()
                    const boxes = containerBoxes.querySelectorAll('.box-container')
                    boxes.forEach(box => {
                        box.classList.add('green-box')
                    })
                }

            })
            .catch(err => console.log(err))
        // Cargo el botón    
        loadTemplate(urlBtn)
            .then(template => {
                const btnTemplate = Handlebars.compile(template)
                const data = {
                    text: 'registro'
                }
                const btnHtml = btnTemplate(data)
                const containerBtn = document.getElementById('btn-registro-sintomas')
                const containerBtnAgregarSintoma = document.getElementById('agregar-sintoma-btn')

                const currentLocation = window.location.pathname

                if (currentLocation === '/registro-sintomas') {
                    Swal.fire({
                        title: 'Cargando...',
                        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                        didOpen: () => {
                            Swal.showLoading() // Activa el spinner de carga
                        },
                    })
                }

                // Cargo el botón para redireccionar
                if(containerBtn){
                    containerBtn.innerHTML = btnHtml
                    const btnRegistro = document.querySelector('.btn-agregar')
                    btnRegistro.classList.add('btn-agregar-green')
                    btnRegistro.addEventListener('click', () => {
                        window.location.href = '/agregar-sintoma'
                    })
                    Swal.close()
                }

                // Cargo el botón para subir el formulario
                if(containerBtnAgregarSintoma) {
                    containerBtnAgregarSintoma.innerHTML = btnHtml
                    const btnRegistro = document.querySelector('.btn-agregar')
                    btnRegistro.classList.add('btn-agregar-green')
                    btnRegistro.addEventListener('click', (e) => {
                        e.preventDefault()
                        
                        alert('Formulario enviado')
                    })
                    Swal.close()
                }
            })
            .catch(err => console.log(err))
    }, 200)
})