import Swal from "sweetalert2"
import loadTemplate from "./loadTemplate"
import { post, postData } from "./utils/peticiones"

const urlBtnPerfiles = '/templates/btnPerfiles.hbs'

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

                if (currentLocation === '/perfil') {
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
                        href: `/perfil/${perfil.name}`,
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
                        const response = await post(`${import.meta.env.VITE_BACK_URL}/perfil/get`, { perfilId: perfilId}, token);
                        const perfilData = await response.json(); // Asegúrate de convertir la respuesta en JSON
                        localStorage.setItem('perfil', JSON.stringify(perfilData.perfil))
                        renderPerfiles(perfilData.perfil)
                    } catch (error) {
                        Swal.close();
                        console.log('Ocurrió un error al obtener los perfiles: ', error);
                    }
                };

                // Verifica que 'perfiles' no esté vacío antes de llamar a 'loadPerfiles'
                if (perfiles.length > 0) {
                    loadPerfiles(perfiles[0]);
                } else {
                    console.log('No se encontraron perfiles.');
                }
            })
    }, 200);
});
