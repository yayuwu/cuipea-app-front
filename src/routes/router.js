import page from 'page';

// Manejo de autenticacion
const isAuthenticated = () => {
    return false
}

 // Rutas privadas
 const protectRoute = (ctx, next) => {
    if (isAuthenticated()) {
        next()
    } else {
        page.redirect('/pagina-no-encontrada')
    }
 }

 // Cargar vista dinámica
 const loadView = async (view) => {
    try {
        document.getElementById("content").innerHTML = " ";
        const response = await fetch(`./${view}.html`);
        if (response.ok) {
            const html = await response.text();
            document.getElementById("content").innerHTML = html;
        } else {
            document.getElementById("content").innerHTML = "<p>Error al cargar la vista</p>";
        }
    } catch (error) {
        console.log("Error: ", error);
        document.getElementById("content").innerHTML = "<p>Error al cargar la vista</p>";
    }
};

// Rutas 
page('/', () => {
    loadView('home'); 
});

page('/foro', () => {
    loadView('foro_1');
});

page('/pagina-no-encontrada', () => {
    loadView('pageNotFound')
})

page('/datos-clinicos/post', protectRoute, () => {
    loadView('formDataClinic')
})

page();

