import loadTemplate from './loadTemplate'

const urlBtn = '/templates/buttonAgregar.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
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
                btnVacuna.addEventListener('click', (e) => {
                    e.preventDefault()
                    alert('Formulario enviado')
                })
            }

         })
    }, 200)
})