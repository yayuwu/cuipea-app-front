import loadTemplate from './loadTemplate.js'

let registros = [
    { title: 'Registro 1', date: '12/04/24'},
    { title: 'Registro 2', date: '15/03/24'},
    { title: 'Registro 3', date: '22/07/24'},
    { title: 'Registro 4', date: '02/02/24'}
]

const urlBox = './templates/box.hbs' 
const urlBtn = './templates/buttonAgregar.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        // Cargo todos los boxes
        loadTemplate(urlBox)
            .then(template => {
                const boxTemplate = Handlebars.compile(template)
                const boxHtml = registros.map(registro => boxTemplate(registro)).join('')
                const containerBoxes = document.getElementById('registroBoxesContainer')

                if(containerBoxes) {
                    containerBoxes.innerHTML = boxHtml
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

                // Cargo el botón para redireccionar
                if(containerBtn){
                    containerBtn.innerHTML = btnHtml
                    const btnRegistro = document.querySelector('.btn-agregar')
                    btnRegistro.classList.add('btn-agregar-green')
                    btnRegistro.addEventListener('click', () => {
                        window.location.href = '/agregar-sintoma'
                    })
                }

                // Cargo el botón para subir el formulario
                if(containerBtnAgregarSintoma) {
                    containerBtnAgregarSintoma.innerHTML = btnHtml
                    const btnRegistro = document.querySelector('.btn-agregar')
                    btnRegistro.classList.add('btn-agregar-green')
                    btnRegistro.addEventListener('click', () => {
                        alert('Formulario enviado')
                    })
                }
            })
            .catch(err => console.log(err))
    }, 200)
})