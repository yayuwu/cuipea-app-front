import * as yup from 'yup'
import loadTemplate from './loadTemplate'

let vacunas = [ 
    { vacuna: 'Hepatitis B', dosis: '1ª dosis', edad: 'al nacer', fecha: '2024-11-14' }, 
    { vacuna: 'BCG', dosis: 'única dosis', edad: 'al nacer', fecha: '2024-11-14' }, 
    { vacuna: 'Polio', dosis: '1ª dosis', edad: '2 meses', fecha: '2025-01-14' }, 
    { vacuna: 'Polio', dosis: '2ª dosis', edad: '4 meses', fecha: '2025-03-14' }, 
    { vacuna: 'DTP', dosis: '1ª dosis', edad: '2 meses', fecha: '2025-01-14' }, 
    { vacuna: 'DTP', dosis: '2ª dosis', edad: '4 meses', fecha: '2025-03-14' }, 
    { vacuna: 'Hib', dosis: '1ª dosis', edad: '2 meses', fecha: '2025-01-14' }, 
    { vacuna: 'Hib', dosis: '2ª dosis', edad: '4 meses', fecha: '2025-03-14' }, 
    { vacuna: 'Neumococo', dosis: '1ª dosis', edad: '2 meses', fecha: '2025-01-14' }, 
    { vacuna: 'Neumococo', dosis: '2ª dosis', edad: '4 meses', fecha: '2025-03-14' } 
]

const urlBtn = '/templates/buttonAgregar.hbs'
const urlTable = '/templates/tableRowsVacunacion.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Carga de datos en la tabla 
        loadTemplate(urlTable)
         .then(template => {
            const tableTemplate = Handlebars.compile(template)
            const tableHtml = vacunas.map(vacuna => tableTemplate(vacuna)).join('')
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
                    fechaVacuna: yup.date().required('Es requerido seleccionar una fecha')
                })

                // Obtenemos los datos del fomrulario
                const formData = {
                    vacuna: document.getElementById('vacuna').value,
                    dosisVacuna: document.getElementById('dosisVacuna').value,
                    edadVacuna: document.getElementById('edadVacuna').value,
                    fechaVacuna: document.getElementById('fechaVacuna').value
                }

                try {
                    await schema.validate(formData, { abortEarly: false })
                    console.log('Datos enviados: ', formData)
                    alert('Formulario enviado')
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