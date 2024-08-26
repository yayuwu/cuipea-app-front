// import Handlebars from "handlebars"

// let questions = [
//     { id: 1, question: '¿Ha tenido alguna reacción alérgica significativa?', response: true, details: 'Reacción alérgica severa a la penicilina.' },
//     { id: 2, question: '¿Tiene algún antecedente de enfermedades crónicas? (Por ejemplo, hipertensión, enfermedad renal)', response: true, details: 'Hipertensión diagnosticada hace 5 años, controlada con medicación.' },
//     { id: 3, question: '¿Ha sido hospitalizado alguna vez?', response: false },
//     { id: 4, question: '¿Tiene alguna condición cardíaca diagnosticada? (Por ejemplo, insuficiencia cardíaca, arritmias)', response: false },
//     { id: 5, question: '¿Ha tenido alguna intervención quirúrgica?', response: true, details: 'Cirugía de apendicitis realizada hace 3 años.' },
//     { id: 6, question: '¿Hay antecedentes familiares de enfermedades hereditarias? (Por ejemplo, fibrosis quística, distrofia muscular)', response: false },
//     { id: 7, question: '¿Ha tenido alguna enfermedad infecciosa importante? (Por ejemplo, tuberculosis, hepatitis)', response: true, details: 'Infección por hepatitis A hace 10 años, actualmente recuperado.' },
//     { id: 8, question: '¿Está en tratamiento actualmente por alguna condición médica? (Incluye medicamentos recetados y terapias)', response: true, details: 'Tratamiento actual para el asma con inhalador de salbutamol.' },
//     { id: 9, question: '¿Ha tenido alguna reacción adversa a medicamentos? (Por ejemplo, erupciones, dificultad respiratoria)', response: false },
//     { id: 10, question: '¿Tiene alguna condición respiratoria diagnosticada? (Por ejemplo, asma, bronquitis crónica)', response: true, details: 'Asma diagnosticada en la infancia, bajo control.' },
//     { id: 11, question: '¿Nació por parto natural o cesárea?', response: true, details: 'Parto natural.' },
//     { id: 12, question: '¿Tiene cáncer o es paciente oncológico?', response: false },
//     { id: 13, question: '¿Tiene alguna discapacidad? (Por ejemplo, discapacidad física, visual o auditiva)', response: false },
//     { id: 14, question: '¿Tiene alguna enfermedad neurológica diagnosticada? (Por ejemplo, epilepsia, parálisis cerebral)', response: false },
//     { id: 15, question: '¿Tiene diabetes? (Especificar tipo si es relevante: tipo 1, tipo 2)', response: false },
//     { id: 16, question: '¿Tiene trastornos del desarrollo o del estado de ánimo diagnosticados? (Por ejemplo, TGD, TDAH, trastorno bipolar)', response: false },
//     { id: 17, question: '¿Tiene alguna enfermedad congénita? (Por ejemplo, síndrome de Down, cardiopatías congénitas)', response: false },
//     { id: 18, question: '¿Tiene médico de cabecera?', response: true, details: 'Dr. Juan Pérez.' },
//     { id: 19, question: '¿Tiene alergias? (Incluye alergias alimentarias, ambientales, etc.)', response: true, details: 'Alergia al polen, controlada con antihistamínicos.' },
//     { id: 20, question: '¿Está tomando medicación actualmente? (Incluye medicamentos recetados y de venta libre)', response: true, details: 'Toma antihipertensivos diarios y un inhalador para el asma.' },
//     { id: 21, question: '¿Otros problemas de salud o condiciones que deban ser mencionadas?', response: false },
// ];

const dropdownUrl = '../public/templates/dropdownClinicData.hbs'

const loadTemplate = async (url)=> {
    const res = await fetch(url)
    console.log(res)
    return res.text()
}

const getData = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Ocurrió un error en obtener los datos ', error)
    }
}

const url = 'http://localhost:8080/userQuestions/'

loadTemplate(dropdownUrl)
.then(templateSource => {
    const dropdownTemplate = Handlebars.compile(templateSource);
    const btnCompleteClinicData = document.getElementById('btn-complete-data');

    getData(url).then(questionsData => {
        if (questionsData.length > 0) {
            const container = document.getElementById('dropdowns-container');
            const dropdownsHtml = questionsData.map(question => dropdownTemplate(question)).join('');
            container.innerHTML = dropdownsHtml;
            btnCompleteClinicData.style.display = 'none';
        } else {
            btnCompleteClinicData.style.display = 'flex';
        }
    }).catch(error => {
        console.error('Ocurrió un error al obtener los datos:', error);
    });
})
.catch(error => {
    console.error('Ocurrió un error al cargar el template:', error);
});