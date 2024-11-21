import * as yup from 'yup'
import loadTemplate from "./loadTemplate"

let consultas = [
    { title: 'Consulta 1', date: '12/04/24'},
    { title: 'Consulta 2', date: '15/03/24'},
    { title: 'Consulta 3', date: '22/07/24'},
    { title: 'Consulta 4', date: '02/02/24'}
]

const urlBox = './templates/box.hbs' 
const urlBtn = './templates/buttonAgregar.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Carga de datos Boxes
        loadTemplate(urlBox)
            .then(template => {
                const boxTemplate = Handlebars.compile(template)
                const boxHtml = consultas.map(consulta => boxTemplate(consulta)).join('')

                const containerBoxes = document.getElementById('consulta-boxes-container')

                if(containerBoxes){
                    containerBoxes.innerHTML = boxHtml
                    const boxes = document.querySelectorAll('.box-container')
                    boxes.forEach(box => box.classList.add('violet-box'))
                }
            })
            .catch(err => console.log(err))
        // Botones
        loadTemplate(urlBtn)
            .then(template => {
                const btnTemplate = Handlebars.compile(template)
                const data = {
                    text: 'consulta'
                }
                const btnHtml = btnTemplate(data)
                const containerBtn = document.getElementById('btn-consultas-enfermedad')
                const containerBtnAgregarConsulta = document.getElementById('btn-agregar-consulta')

                if (containerBtn) {
                    containerBtn.innerHTML = btnHtml
                    const btnConsulta = containerBtn.querySelector('.btn-agregar')
                    btnConsulta.classList.add('btn-agregar-violet')
                    btnConsulta.addEventListener('click', () => {
                        window.location.href = '/agregar-consulta'
                    })
                }

                if (containerBtnAgregarConsulta) {
                    containerBtnAgregarConsulta.innerHTML = btnHtml
                    const btnConsulta = containerBtnAgregarConsulta.querySelector('.btn-agregar')
                    btnConsulta.classList.add('btn-agregar-violet')
                    btnConsulta.type = 'submit'
                }
                
            })
            
        // Envío de datos formulario
        const form = document.getElementById('consulta-form')
        console.log('Formulario: ', form)
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                const schema = yup.object().shape({
                    fecha: yup.date().required('Este campo es obligatorio'),
                    motivo: yup.string().required('Este campo es requerido'),
                    especialidad: yup.string().required('Este campo es requerido'),
                    datosProfesional: yup.string().required('Este campo es obligatorio').required(),
                    observaciones: yup.string()
                })

                const formData = {
                    fecha: document.getElementById('fecha-consulta').value,
                    motivo: document.getElementById('motivo-consulta').value,
                    especialidad: document.getElementById('especialidad-consulta').value,
                    datosProfesional: document.getElementById('datos-consulta').value,
                    observaciones: document.getElementById('observaciones-consulta').value
                }
                
                try {
                    await schema.validate(formData, { abortEarly: false })
                    alert('Formulario válido')
                } catch (errors) {
                   console.log(errors)
                   errors.inner.forEach(error => { 
                        const errorElement = document.getElementById(`${error.path}-consultaError`)
                        if (errorElement) { 
                            errorElement.style.display = 'block'
                        } 
                    })
                }
            })
        }
    }, 200)
})

