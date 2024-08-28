
let questions = [
    { id: 1, question: '¿Ha tenido alguna reacción alérgica significativa?' },
    { id: 2, question: '¿Tiene algún antecedente de enfermedades crónicas? (Por ejemplo, hipertensión, enfermedad renal)' },
    { id: 3, question: '¿Ha sido hospitalizado alguna vez?' },
    { id: 4, question: '¿Tiene alguna condición cardíaca diagnosticada? (Por ejemplo, insuficiencia cardíaca, arritmias)' },
    { id: 5, question: '¿Ha tenido alguna intervención quirúrgica?' },
    { id: 6, question: '¿Hay antecedentes familiares de enfermedades hereditarias? (Por ejemplo, fibrosis quística, distrofia muscular)' },
    { id: 7, question: '¿Ha tenido alguna enfermedad infecciosa importante? (Por ejemplo, tuberculosis, hepatitis)' },
    { id: 8, question: '¿Está en tratamiento actualmente por alguna condición médica? (Incluye medicamentos recetados y terapias)' },
    { id: 9, question: '¿Ha tenido alguna reacción adversa a medicamentos? (Por ejemplo, erupciones, dificultad respiratoria)' },
    { id: 10, question: '¿Tiene alguna condición respiratoria diagnosticada? (Por ejemplo, asma, bronquitis crónica)' },
    { id: 11, question: '¿Nació por parto natural o cesárea?' },
    { id: 12, question: '¿Tiene cáncer o es paciente oncológico?' },
    { id: 13, question: '¿Tiene alguna discapacidad? (Por ejemplo, discapacidad física, visual o auditiva)' },
    { id: 14, question: '¿Tiene alguna enfermedad neurológica diagnosticada? (Por ejemplo, epilepsia, parálisis cerebral)' },
    { id: 15, question: '¿Tiene diabetes? (Especificar tipo si es relevante: tipo 1, tipo 2)' },
    { id: 16, question: '¿Tiene trastornos del desarrollo o del estado de ánimo diagnosticados? (Por ejemplo, TGD, TDAH, trastorno bipolar)' },
    { id: 17, question: '¿Tiene alguna enfermedad congénita? (Por ejemplo, síndrome de Down, cardiopatías congénitas)' },
    { id: 18, question: '¿Tiene médico de cabecera?' },
    { id: 19, question: '¿Tiene alergias? (Incluye alergias alimentarias, ambientales, etc.)' },
    { id: 20, question: '¿Está tomando medicación actualmente? (Incluye medicamentos recetados y de venta libre)' },
    { id: 21, question: '¿Otros problemas de salud o condiciones que deban ser mencionadas?' }
];

// Función para traer el template

const formDataUrl = '../public/templates/questionContainer.hbs'

const loadTemplate = async (url)=> {
    const res = await fetch(url)
    return res.text()
}

// Lógica para inyectar el template en el html

loadTemplate(formDataUrl)
.then(templateSource => { const questionTemplate = Handlebars.compile(templateSource)
    const allQuestions = questions.map(question => questionTemplate(question)).join('')
    const container = document.getElementById('form-questions')
    container.innerHTML = allQuestions
    hideDetails()
})

// Función para mostrar u ocultar los Detalles según cuál input esté checked

const hideDetails = () => {
    const questionsContainer = document.querySelectorAll('.question-container')
    questionsContainer.forEach(container => {
        const radioYes = container.querySelector(`input[id^="true-"]`)
        const radioNo = container.querySelector(`input[id^="false-"]`)
        const errorMessage = container.querySelector(`small[id^="error-message-"]`)
        const detailsContainer = container.querySelector('.details-form-container')

        if(!radioYes.checked){
            detailsContainer.style.display = 'none'
        }
    
        radioYes.addEventListener('change', () => {
            detailsContainer.style.display = 'flex'
            errorMessage.style.display = 'none'
        })
    
        radioNo.addEventListener('change', () => {
            detailsContainer.style.display = 'none'
            errorMessage.style.display = 'none'
        })
    
    
    })
}

// Lógica de validación del form

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/userQuestions/'
    let isValid = true
    let firstError = null

    const questionsContainer = document.querySelectorAll('.question-container')
    questionsContainer.forEach(question => {
        const errorMessage = question.querySelector(`small[id^="error-message-"]`)
        const radioYes = question.querySelector(`input[id^="true-"]`)
        const radioNo = question.querySelector(`input[id^="false-"]`)
        const detailsInput = question.querySelector('textarea');
        const questionParagraph = question.querySelector('p'); 

        let questionText = questionParagraph.innerText || questionParagraph.textContent;
        questionText = questionText.replace(/^\d+\.\s*/, ''); // Elimina el número inicial y el punto (e.g., "1. ")
        questionText = questionText.replace(/\s*\*$/, ''); // Elimina el asterisco final si existe

        // Lógica para ocultar y mostrar el erroMessage 
        
        if (!radioNo.checked && !radioYes.checked) {
            errorMessage.style.display = 'block'
            isValid = false

            if(!firstError){
                firstError = errorMessage
            }
        } else {
            errorMessage.style.display = 'none'
        }

        // Lógica para el POST

        let response = null
        let details= ''

        if (radioYes.checked) {
            response = true
            details = detailsInput ? detailsInput.value : ''
        } else if (radioNo.checked) {
            response = false
            details = ''
        }

        if(response !== null){
            const data = {
                question: questionText,
                response: response,
                details: details
            }
            postDataClinic(url, data)
        }
    })

    // Scroll hacia el error cuando no se completa algún campo

    if(firstError){
        firstError.scrollIntoView({behavior: 'smooth', block: 'center'})
    }

    // Submit

    if(isValid){
        form.submit()
        form.reset()
    }
})

// Función para el POST

const postDataClinic = async (url, obj) => {
    try {
        const options = {
            'method' : 'POST',
            'headers' : {
                'Content-type' : 'application/json'
            },
            'body': JSON.stringify(obj) 
        }

        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error('No se pudieron obtener los datos', res.status)
        }
        const data = await res.json()
        console.log('Datos enviados con éxito: ', data)
    } catch (error) {
        console.error('Error en la solicitud: ', error)
    }
} 