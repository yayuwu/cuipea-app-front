import * as yup from 'yup'
import loadTemplate from './loadTemplate'
import { postData } from './utils/peticiones'

const urlBtn = '/templates/buttonAgregar.hbs'
const urlTable = '/templates/tableRowsVacunacion.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Carga de datos en la tabla 
        loadTemplate(urlTable)
         .then(async (template) => {
            const tableTemplate = Handlebars.compile(template)

            // Obtener todas las vacunas

            const getVacunas = await postData(`${import.meta.env.VITE_BACK_URL}/vacunas/getAll`, {userId: '673900031499522c7a4928da'})

            const vacunasObtenidas = await getVacunas.json()

            const tableHtml = vacunasObtenidas.vacunas.map(vacuna => tableTemplate(vacuna)).join('')
            const containerVacunas = document.getElementById('rows-vacunacion')
            if (containerVacunas) {
                containerVacunas.innerHTML = tableHtml
            }
         })
        // Botones
        loadTemplate(urlBtn)
         .then(template => {
            const btnTemplate = Handlebars.compile(template)
            const data = {
                text: 'vacuna'
            }
            const btnHtml = btnTemplate(data)
            // console.log(btnHtml)

            const containerBtn = document.getElementById('btn-vacuna')
            // console.log(containerBtn)
            const containerBtnAgregarVacuna = document.getElementById('btn-agregar-vacuna')

            if (containerBtn) {
                containerBtn.innerHTML = btnHtml
                const btnVacuna = containerBtn.querySelector('.btn-agregar')
                btnVacuna.classList.add('btn-agregar-salmon')
                btnVacuna.addEventListener('click', () => {
                    window.location.href = '/agregar-vacuna'
                })
            }

            if (containerBtnAgregarVacuna) {
                containerBtnAgregarVacuna.innerHTML = btnHtml
                const btnVacuna = containerBtnAgregarVacuna.querySelector('.btn-agregar')
                btnVacuna.classList.add('btn-agregar-salmon')
                btnVacuna.type = 'submit'
            }

        })
        // Envío de datos formulario
        const form = document.getElementById('vacuna-form')
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                // Schema con yup para manejar las validaciones
                const schema = yup.object().shape({
                    vacuna: yup.string().required('Es requerido seleccionar una opción'),
                    dosisVacuna: yup.string().required('Es requerido seleccionar una opción'),
                    edadVacuna: yup.string().required('Es requerido seleccionar una opción'),
                    dateVacuna: yup.date().required('Es requerido seleccionar una fecha')
                })

                // Obtenemos los datos del fomrulario
                const formData = {
                    vacuna: document.getElementById('vacuna').value,
                    dosisVacuna: document.getElementById('dosisVacuna').value,
                    edadVacuna: document.getElementById('edadVacuna').value,
                    dateVacuna: document.getElementById('dateVacuna').value,
                    userId: '673900031499522c7a4928da',
                }

                try {
                    await schema.validate(formData, { abortEarly: false })
                    console.log('Datos enviados: ', formData)
                    const response = await postData(`${import.meta.env.VITE_BACK_URL}/vacunas/crear`, formData)
    
                    if (response) {
                        alert('Formulario enviado correctamente');
                    } else {
                        alert('Ocurrió un error al enviar los datos');
                    }
                } catch (errors) {
                    console.log('Ocurrió un error: ', errors)
                    errors.inner.forEach(error => {
                        const errorElement = document.getElementById(`${error.path}-error`)
                        if (errorElement) {
                            errorElement.style.display = 'block'
                        }
                    })
                }
            })
        }
    }, 200)
})

