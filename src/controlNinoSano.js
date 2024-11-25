import loadTemplate from './loadTemplate'
import Swal from 'sweetalert2'

let controlesNinoSano = [ 
    { edad: '2 meses', fecha: '2024-01-14', peso: 6.5, talla: 60, pc: 40, ta: '90/60', observaciones: 'Vacunación y seguimiento del desarrollo' }, 
    { edad: '4 meses', fecha: '2024-03-14', peso: 7.5, talla: 65, pc: 42, ta: '95/65', observaciones: 'Revisión de hitos del desarrollo, alimentación complementaria' }, 
    { edad: '6 meses', fecha: '2024-05-14', peso: 8.5, talla: 70, pc: 44, ta: '100/70', observaciones: 'Chequeo de nutrición y desarrollo, vacunación' }, 
    { edad: '9 meses', fecha: '2024-08-14', peso: 9, talla: 75, pc: 46, ta: '105/75', observaciones: 'Evaluación del desarrollo motor, vacunas' }, 
    { edad: '12 meses', fecha: '2024-11-14', peso: 10, talla: 78, pc: 47, ta: '110/75', observaciones: 'Chequeo general, vacunación de 1 año' } 
]

const urlButtonAgregar = '/templates/buttonAgregar.hbs'
const urlTable = '/templates/tableRowsControl.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Carga de datos de la tabla
        loadTemplate(urlTable)
            .then(template => {
                const tableTemplate = Handlebars.compile(template)
                const tableHtml = controlesNinoSano.map(control => tableTemplate(control)).join('')
                const currentLocation = window.location.pathname

                if (currentLocation === '/Control') {
                    Swal.fire({
                        title: 'Cargando...',
                        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                        didOpen: () => {
                            Swal.showLoading() // Activa el spinner de carga
                        },
                    })
                }
                const containerTableBody = document.getElementById('rows-control')
                if (containerTableBody) {
                    containerTableBody.innerHTML = tableHtml
                    Swal.close()
                }
            })
        // Botones
        // loadTemplate(urlButtonAgregar)
        //     .then(template => {
        //         const buttonTemplate = Handlebars.compile(template)
        //         const dataBtn = { text: 'control' }
        //         const btnHtml = buttonTemplate(dataBtn)

        //         const containerRedirect = document.querySelector('.btn-nino-sano')
        //         if (containerRedirect) {
        //             containerRedirect.innerHTML = btnHtml
        //             const btnAgregarRedirect = containerRedirect.querySelector('.btn-agregar');
        //             btnAgregarRedirect.classList.add('btn-agregar-pink')
        //             btnAgregarRedirect.addEventListener('click', () => {
        //                 window.location.href = '/agregar-control'
        //             });
        //         }

        //         const containerOnClick = document.querySelector('#btn-agregar-control')
        //         if (containerOnClick) {
        //             containerOnClick.innerHTML = btnHtml
        //             const btnAgregarOnClick = containerOnClick.querySelector('.btn-agregar');
        //             btnAgregarOnClick.classList.add('btn-agregar-pink')
        //             btnAgregarOnClick.addEventListener('click', (e) => {
        //                 e.preventDefault()

        //                 alert('Formulario enviado')
        //             });
        //         }
        //     })
        //     .catch(error => console.error('Error al cargar el template:', error))
    }, 200)
})
