import * as yup from 'yup'
import loadTemplate from "./loadTemplate"
import Swal from 'sweetalert2'

let guardias = [
    { title: 'Guardia 1', date: '29/07/24'},
    { title: 'Guardia 2', date: '30/07/24'},
    { title: 'Guardia 3', date: '01/08/24'},
    { title: 'Guardia 4', date: '02/08/24'}
]

const urlBox = './templates/box.hbs' 
const urlBtn = './templates/buttonAgregar.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Carga de datos Boxes
        loadTemplate(urlBox)
            .then(template => {
                const boxTemplate = Handlebars.compile(template)
                const boxHtml = guardias.map(guardias => boxTemplate(guardias)).join('')

                const currentLocation = window.location.pathname

                if (currentLocation === '/atencion-guardia') {
                    Swal.fire({
                        title: 'Cargando...',
                        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                        didOpen: () => {
                            Swal.showLoading() // Activa el spinner de carga
                        },
                    })
                }

                const containerBoxes = document.getElementById('consultaGuardiasContainer')

                if(containerBoxes){
                    containerBoxes.innerHTML = boxHtml
                    const boxes = document.querySelectorAll('.box-container')
                    boxes.forEach(box => box.classList.add('green-box'))
                    Swal.close()
                }
            })
            .catch(err => console.log(err))
        // // Botones
        // loadTemplate(urlBtn)
        //     .then(template => {
        //         const btnTemplate = Handlebars.compile(template)
        //         const data = {
        //             text: 'consulta'
        //         }
        //         const btnHtml = btnTemplate(data)
        //         const containerBtn = document.getElementById('btn-consultas-enfermedad')
        //         const containerBtnAgregarConsulta = document.getElementById('btn-agregar-consulta')

        //         if (containerBtn) {
        //             containerBtn.innerHTML = btnHtml
        //             const btnConsulta = containerBtn.querySelector('.btn-agregar')
        //             btnConsulta.classList.add('btn-agregar-violet')
        //             btnConsulta.addEventListener('click', () => {
        //                 window.location.href = '/agregar-consulta'
        //             })
        //         }

        //         if (containerBtnAgregarConsulta) {
        //             containerBtnAgregarConsulta.innerHTML = btnHtml
        //             const btnConsulta = containerBtnAgregarConsulta.querySelector('.btn-agregar')
        //             btnConsulta.classList.add('btn-agregar-violet')
        //             btnConsulta.type = 'submit'
        //         }
                
        //     })
            
        // Envío de datos formulario
        const form = document.getElementById('guardia-form')
        // console.log('Formulario: ', form)
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                const schema = yup.object().shape({
                    fecha: yup.date().required('Este campo es obligatorio'),
                    Motivo: yup.string().required('Este campo es requerido'),
                })

                const formData = {
                    fecha: document.getElementById('fecha-guardia').value,
                    motivo: document.getElementById('motivo-guardia').value,
                    profesional: document.getElementById('profesional-guardia').value,
                    observaciones: document.getElementById('observaciones-guardia').value,
                }
                
                try {
                    await schema.validate(formData, { abortEarly: false })
                    alert('Formulario válido')
                } catch (errors) {
                   console.log(errors)
                   errors.inner.forEach(error => { 
                        const errorElement = document.getElementById(`${error.path}-guardiaError`)
                        if (errorElement) { 
                            errorElement.style.display = 'block'
                        } 
                    })
                }
            })
        }
    }, 200)
})
