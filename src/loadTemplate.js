// ! Función que me retorna el template
const loadTemplate = async (url)=> {
    const res = await fetch(url)
    return res.text()
}

export default loadTemplate