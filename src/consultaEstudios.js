import * as yup from 'yup'
import loadTemplate from "./loadTemplate"

let estudios = [
    { title: 'Estudio 1', date: '29/07/24'},
    { title: 'Estudio 2', date: '29/07/24'},
    { title: 'Estudio 3', date: '01/08/24'},
    { title: 'Estudio 4', date: '02/08/24'}
]

const urlBox = './templates/box.hbs' 
const urlBtn = './templates/buttonAgregar.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Carga de datos Boxes
        loadTemplate(urlBox)
            .then(template => {
                const boxTemplate = Handlebars.compile(template)
                const boxHtml = consultas.map(estudios => boxTemplate(estudios)).join('')

                const estudiosBoxes = document.getElementById('estudios-container')

                if(estudiosBoxes){
                    estudiosBoxes.innerHTML = boxHtml
                    const boxes = document.querySelectorAll('.box-container')
                    boxes.forEach(box => box.classList.add('blue-box'))
                }
            })
            .catch(err => console.log(err))

        // Botones
        loadTemplate(urlBtn)
            .then(template => {
                const btnTemplate = Handlebars.compile(template)
                const data = {
                    text: 'guardia'
                }
                const btnHtml = btnTemplate(data)
                const containerBtn = document.getElementById('btn-estudios')
                const containerBtnAgregarConsulta = document.getElementById('btn-agregar-estudio')

                if (containerBtn) {
                    containerBtn.innerHTML = btnHtml
                    const btnConsulta = containerBtn.querySelector('.btn-agregar')
                    btnConsulta.classList.add('btn-agregar-blue')
                    btnConsulta.addEventListener('click', () => {
                        window.location.href = '/agregar-estudio'
                    })
                }

                if (containerBtnAgregarEstudio) {
                    containerBtnAgregarEstudio.innerHTML = btnHtml
                    const btnEstudio = containerBtnAgregarEstudio.querySelector('.btn-agregar')
                    btnEstudio.classList.add('.btn-agregar-blue')
                    btnEstudio.type = 'submit'
                }
                
            })
        // Envío de datos formulario
        const form = document.getElementById('estudio-form')
        console.log('Formulario: ', form)
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                const schema = yup.object().shape({
                    fecha: yup.date().required('Este campo es obligatorio'),
                    tipo: yup.string().required('Este campo es requerido'),
                    Motivo: yup.string().required('Este campo es requerido'),
                })

                const formData = {
                    fecha: document.getElementById('fecha-estudio').value,
                    tipo: document.getElementById('tipo-estudio').value,
                    motivo: document.getElementById('motivo-estudio').value,
                    resultado: document.getElementById('resultado-estudio').value,
                    detalle: document.getElementById('detalle-estudio').value,
                    archivo: document.getElementById('archivo-estudio').value
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
