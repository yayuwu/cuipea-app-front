// ! Función que me retorna el template

export const loadTemplate = async (url)=> {
    const res = await fetch(url)
    return res.text()
}