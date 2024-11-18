export const postData = async (url, data) => {
    try {
        const options = {
           method: 'POST', 
           headers: {
            'content-type': 'application/json',
           },
           body: JSON.stringify(data)
        }
        console.log(JSON.stringify(data))
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }        

        return await response.json()
    } catch (error) {
        console.log('Ocurrió un error al enviar los datos')
    }
}
