
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

        return response
    } catch (error) {
        console.log('Ocurrió un error al enviar los datos')
    }
}


export const post = async (url, data, token) => {
    try {
        const options = {
           method: 'POST', 
           headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json',
           },
           body: JSON.stringify(data)
        }
        console.log(options)
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }        
        return response
    } catch (error) {
        console.log('Ocurrió un error al enviar los datos')
    }
}