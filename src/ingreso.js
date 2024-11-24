import * as yup from 'yup'
import { postData } from './utils/peticiones'
import Swal from 'sweetalert2'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const formIngreso = document.getElementById('form-ingreso')
        if (formIngreso) {
            formIngreso.addEventListener('submit', async (e) => {
                e.preventDefault()
        
                const schema = yup.object().shape({
                    email: yup.string().email('Por favor ingresa un email válido').required('El email debe ser obligatorio'),
                    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
                    .required('La contraseña debe ser obligatoria')
                })
        
                const formData = {
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                }
        
                try {
                    await schema.validate(formData, { abortEarly: false })
                    Swal.fire({
                        title: 'Cargando...',
                        // text: 'Por favor, espere mientras procesamos su solicitud.',
                        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                        didOpen: () => {
                            Swal.showLoading() // Activa el spinner de carga
                        },
                    })
                    console.log(formData)
                    const response = await postData(`${import.meta.env.VITE_BACK_URL}/login'`, formData)

                    if (!response) {
                        Swal.close()
                        Swal.fire({
                            title: 'Error',
                            text: 'Usuario o contraseña incorrecta',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                          })
                        throw new Error('Ocurrió un error al iniciar sesión')
                    }
                    console.log(response)

                    const data = await response.json()
                    localStorage.setItem('userData', JSON.stringify(data))


                    // Cerrar el modal de carga
                    Swal.close()

                    // Mostrar éxito y redirigir al inicio
                    Swal.fire({
                        title: 'Ingreso exitoso',
                        text: 'Has iniciado sesión correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    }).then(() => {
                        // Redirigir al inicio
                        window.location.href = '/' // Cambia la URL a donde quieres redirigir
                    })
                } catch (errors) {
                    console.log(errors)
                    const errorElements = document.querySelectorAll('small[id$="-error"]')
                    
                    if(errorElements) {
                        errorElements.forEach((small) => {
                            small.style.display = 'none' 
                            small.textContent = '' 
                        })
                    }
                    errors.inner.forEach(error => { 
                        const errorElement = document.getElementById(`${error.path}-error`)
                        if (errorElement) { 
                            errorElement.style.display = 'block'
                            errorElement.textContent = error.message
                        } 
                    })
                }
        
        
            })
        }
    }, 200)
})