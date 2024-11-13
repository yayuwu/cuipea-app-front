const loadTemplate = async (url) => {
    const res = await fetch(url)
    return res.text()
}

console.log('Template Botón')

const urlButtonAgregar = './templates/buttonAgregar.hbs'

document.addEventListener('DOMContentLoaded', () => {
    // Retrasa la ejecución del código 200ms (ajusta el tiempo según sea necesario)
    setTimeout(() => {
        loadTemplate(urlButtonAgregar)
            .then(template => {
                const buttonTemplate = Handlebars.compile(template)
                const dataBtn = { text: 'control' }
                const btnHtml = buttonTemplate(dataBtn)

                const containerRedirect = document.querySelector('.btn-nino-sano')
                if (containerRedirect) {
                    containerRedirect.innerHTML = btnHtml
                    const btnAgregarRedirect = containerRedirect.querySelector('.btn-agregar');
                    btnAgregarRedirect.classList.add('btn-agregar-pink')
                    btnAgregarRedirect.addEventListener('click', () => {
                        window.location.href = '/agregar-control'
                    });
                }

                const containerOnClick = document.querySelector('#btn-agregar-control')
                if (containerOnClick) {
                    containerOnClick.innerHTML = btnHtml
                    const btnAgregarOnClick = containerOnClick.querySelector('.btn-agregar');
                    btnAgregarOnClick.classList.add('btn-agregar-pink')
                    btnAgregarOnClick.addEventListener('click', () => {
                        alert('Formulario enviado')
                    });
                }
            })
            .catch(error => console.error('Error al cargar el template:', error))
    }, 200)
})
