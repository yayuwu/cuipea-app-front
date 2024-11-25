import * as yup from 'yup'
import loadTemplate from './loadTemplate'
import { postData, post } from './utils/peticiones'
import Swal from 'sweetalert2'

const urlBtn = '/templates/buttonAgregar.hbs'
const urlTable = '/templates/tableRowsVacunacion.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Carga de datos en la tabla 
        loadTemplate(urlTable)
         .then(async (template) => {
            const tableTemplate = Handlebars.compile(template);

            const userId = JSON.parse(localStorage.getItem('userData')).user.id;
            const token = JSON.parse(localStorage.getItem('userData')).token;

            const currentLocation = window.location.pathname

            if (currentLocation === '/vacunas') {
                Swal.fire({
                    title: 'Cargando...',
                    allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                    didOpen: () => {
                        Swal.showLoading() // Activa el spinner de carga
                    },
                })
            }

            async function loadVacunas() {
                try {
                    // Siempre hacer la petición para obtener vacunas actualizadas
                    const response = await post(`${import.meta.env.VITE_BACK_URL}/vacunas/getAll`, { userId }, token)
                    const vacunasPeticion = await response.json()

                    // Renderizar las vacunas
                    renderVacunas(vacunasPeticion.vacunas)
                } catch (error) {
                    Swal.close()
                    console.error('Error al obtener las vacunas:', error)
                }
            }

            function renderVacunas(vacunas) {
                const tableHtml = vacunas.map(vacuna => tableTemplate(vacuna)).join('');
                const containerVacunas = document.getElementById('rows-vacunacion');
                if (containerVacunas) {
                    containerVacunas.innerHTML = tableHtml;
                    Swal.close()
                }
            }

            // Cargar las vacunas al inicio
            await loadVacunas();
         })
        // Botones
        // loadTemplate(urlBtn)
        //  .then(template => {
        //     const btnTemplate = Handlebars.compile(template)
        //     const data = {
        //         text: 'vacuna'
        //     }
        //     const btnHtml = btnTemplate(data)
        //     // console.log(btnHtml)

        //     const containerBtn = document.getElementById('btn-vacuna')
        //     // console.log(containerBtn)
        //     const containerBtnAgregarVacuna = document.getElementById('btn-agregar-vacuna')

        //     if (containerBtn) {
        //         containerBtn.innerHTML = btnHtml
        //         const btnVacuna = containerBtn.querySelector('.btn-agregar')
        //         btnVacuna.classList.add('btn-agregar-salmon')
        //         btnVacuna.addEventListener('click', () => {
        //             window.location.href = '/agregar-vacuna'
        //         })
        //     }

        //     if (containerBtnAgregarVacuna) {
        //         containerBtnAgregarVacuna.innerHTML = btnHtml
        //         const btnVacuna = containerBtnAgregarVacuna.querySelector('.btn-agregar')
        //         btnVacuna.classList.add('btn-agregar-salmon')
        //         btnVacuna.type = 'submit'
        //     }

        // })
        // Envío de datos formulario
        const form = document.getElementById('vacuna-form')
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                const userId = JSON.parse(localStorage.getItem('userData'))

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
                    userId: userId.user.id,
                }

                try {
                    await schema.validate(formData, { abortEarly: false })
                    console.log('Datos enviados: ', formData)
                    
                    Swal.fire({
                        title: 'Cargando...',
                        text: 'Por favor, espere mientras procesamos su solicitud.',
                        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                        didOpen: () => {
                            Swal.showLoading() // Activa el spinner de carga
                        },
                    })
                    const response = await postData(`${import.meta.env.VITE_BACK_URL}/vacunas/crear`, formData)
    
                    if (response) {
                        Swal.close()
                        Swal.fire({
                            title: "Vacuna subida",
                            text: "¿Quieres agregar otra vacuna?",
                            icon: "success",
                            showDenyButton: true,
                            confirmButtonText: "Si",
                            denyButtonText: `No`
                          }).then(result => {
                            if(result.isConfirmed){
                                form.reset()
                                Swal.close()
                            } else {
                                window.location.href = '/vacunas'
                            }
                          })
                    } else {
                        Swal.close()
                        Swal.fire({
                            title: "Error al subir vacuna",
                            text: "Intentelo de nuevo más tarde",
                            icon: "error",
                            button: 'Ok'
                        })
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

