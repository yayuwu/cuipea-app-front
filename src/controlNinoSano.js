const loadTemplate = async (url) => {
    const res = await fetch(url)
    return res.text()
}

console.log('Template Botón')

const urlButtonAgregar = './templates/buttonAgregar.hbs'

document.addEventListener('DOMContentLoaded', () => {
    loadTemplate(urlButtonAgregar)
    .then(template => {
        const buttonTemplate = Handlebars.compile(template)

        // Botón que redirige a un enlace
        const dataBtn = {
            text: 'control',
        }

        const btnHtml = buttonTemplate(dataBtn)

        const containerRedirect = document.querySelector('.btn-nino-sano')

        console.log(containerRedirect)
        if (containerRedirect) {
            containerRedirect.innerHTML = btnHtml

            const btnAgregarRedirect = containerRedirect.querySelector('.btn-agregar')
            
            btnAgregarRedirect.classList.add('btn-agregar-pink')
            
            btnAgregarRedirect.addEventListener('click', () => {
                window.location.href = '/agregar-control'
            })
        }

        // Botón que ejecuta una función onclick

        const containerOnClick = document.querySelector('#btn-agregar-control')

        console.log(containerOnClick)
        if (containerOnClick) {
            containerOnClick.innerHTML = btnHtml

            const btnAgregarOnClick = containerOnClick.querySelector('.btn-agregar')

            btnAgregarOnClick.classList.add('btn-agregar-pink')

            btnAgregarOnClick.addEventListener('click', () => {
                alert('Formulario enviado')
            })
        }
    })
    .catch(error => console.error('Error al cargar el template:', error));
})
