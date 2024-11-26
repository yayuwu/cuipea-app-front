// ! Función que me retorna el template
const loadTemplate = async (url)=> {
    const res = await fetch(url)
    const template = await res.text()
    return template
}

export default loadTemplate