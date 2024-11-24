import Swal from "sweetalert2"
import loadTemplate from "./loadTemplate"
import { post, postData } from "./utils/peticiones"
import { logout } from "./utils/logout"

const urlBtnPerfiles = '/templates/btnPerfiles.hbs'
const headerPerfil = '/templates/headerPerfil.hbs'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loadTemplate(urlBtnPerfiles)
            .then(tempalte => {
                const templateBtnPerfil = Handlebars.compile(tempalte);

                // Obtener y parsear el 'userData' de localStorage de forma segura
                let userData = localStorage.getItem('userData');
                let perfiles = [];
                let token = '';

                try {
                    if (userData) {
                        const parsedUserData = JSON.parse(userData);
                        perfiles = parsedUserData.user.profile;
                        token = parsedUserData.token;
                    }
                } catch (error) {
                    console.error('Error al parsear userData:', error);
                    // Si no es un JSON válido, podemos asignar valores predeterminados
                    perfiles = [];
                    token = '';
                }

                const currentLocation = window.location.pathname

                if (currentLocation === '/perfiles') {
                    Swal.fire({
                        title: 'Cargando...',
                        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                        didOpen: () => {
                            Swal.showLoading() // Activa el spinner de carga
                        },
                    })
                }

                function renderPerfiles(perfil) {
                    const data = {
                        href: 'perfil',
                        name: perfil.name
                    }
                    const perfilBtn = templateBtnPerfil(data)
                    const containerPerfiles = document.getElementById('perfiles-container');
                    if (containerPerfiles) {
                        Swal.close()
                        containerPerfiles.innerHTML = perfilBtn;
                    }
                }

                const loadPerfiles = async (perfilId) => {
                    try {
                        const perfilFromStorage = localStorage.getItem('perfil');
            
                        if (perfilFromStorage) {
                            // Swal.close()
                            console.log('Usando datos de localStorage');
                            const perfilData = JSON.parse(perfilFromStorage);
                            renderPerfiles(perfilData);
                        } else {
                            console.log('Realizando petición al servidor');
                            const response = await post(`${import.meta.env.VITE_BACK_URL}/perfil/get`, { perfilId: perfilId }, token);
                            const perfilData = await response.json();
                            localStorage.setItem('perfil', JSON.stringify(perfilData.perfil));
                            renderPerfiles(perfilData.perfil);
                        }
                    } catch (error) {
                        Swal.close();
                        console.log('Ocurrió un error al obtener los perfiles: ', error);
                    }
                };

                 // Usar MutationObserver para observar cuando el contenedor miPerfil se agregue al DOM
                const observer = new MutationObserver((mutationsList) => {
                    for (let mutation of mutationsList) {
                        // Verificamos si se ha agregado un nuevo nodo al DOM
                        if (mutation.type === 'childList') {
                            const containerPerfiles = document.getElementById('perfiles-container');
                            if (containerPerfiles) {
                                loadPerfiles(perfiles[0]); // Cargar el contenido del perfil
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
            
                // if (perfiles.length > 0) {
                //     loadPerfiles(perfiles[0]);
                // } else {
                //     console.log('No se encontraron perfiles.');
                // }
            })
        const btnCerrarSesion = document.getElementById('cerrar-sesion')
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener('click', () => {
                logout()
            })
        }
       
       
        const currentLocation = window.location.pathname

        if (currentLocation === '/perfil') {
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
    }, 200);
});
