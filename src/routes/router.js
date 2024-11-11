import page from 'page';

 
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

// Rutas con Page.js
page('/', () => {
    loadView('home'); // Carga la vista de 'home'
});

page('/foro', () => {
    loadView('foro_1');
});


// Inicia el enrutamiento de Page.js
page();

