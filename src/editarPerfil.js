import loadTemplate from "./loadTemplate"
import Swal from "sweetalert2"

const headerPerfil = '/templates/headerPerfil.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() =>{
        const currentLocation = window.location.pathname

        if (currentLocation === '/editar-perfil') {
            Swal.fire({
                title: 'Cargando...',
                allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                didOpen: () => {
                    Swal.showLoading() // Activa el spinner de carga
                },
            })
        }
        // Función para cargar el contenido del perfil
        const loadProfileContent = () => {
            loadTemplate(headerPerfil)
                .then(template => {
                    const templatePerfilHeader = Handlebars.compile(template);
                    const perfilFromStorage = JSON.parse(localStorage.getItem('perfil'));

                    if (perfilFromStorage) {
                        const data = {
                            color: "bg-pink-perfil",
                            name: perfilFromStorage.name
                        };

                        const perfilHeader = templatePerfilHeader(data);
                        const miPerfil = document.querySelector('.header-perfil');

                        if (miPerfil) {
                            miPerfil.innerHTML = perfilHeader;

                            // Cerrar el Swal una vez cargado el contenido
                            Swal.close();
                        }
                    } else {
                        // Si no hay perfil, cerrar el Swal y mostrar un mensaje de error
                        Swal.close();
                        Swal.fire({
                            icon: 'error',
                            title: 'No se encontró el perfil',
                            text: 'No se pudieron cargar los datos del perfil.',
                        });
                    }
                })
                .catch(err => {
                    console.error('Ocurrió un error al cargar el header del perfil', err);
                    Swal.close(); // Cerrar el Swal en caso de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo cargar el perfil. Intente nuevamente más tarde.',
                    });
                });
        };

        // Usar MutationObserver para observar cuando el contenedor miPerfil se agregue al DOM
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                // Verificamos si se ha agregado un nuevo nodo al DOM
                if (mutation.type === 'childList') {
                    const miPerfil = document.querySelector('.header-perfil');
                    if (miPerfil) {
                        loadProfileContent(); // Cargar el contenido del perfil
                        observer.disconnect(); // Dejar de observar después de que el perfil se cargue
                        break;
                    }
                }
            }
        });

        // Configurar el MutationObserver para observar el DOM en busca de cambios
        observer.observe(document.body, {
            childList: true, // Observar la adición de nodos hijos
            subtree: true,   // Observar en todo el DOM (no solo el cuerpo)
        });
    }, 200)
})