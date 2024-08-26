// Funcion de deslizar con el dedo en version Mobile para el carrusel informacion

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('informacion-landing');
    const items = document.querySelector('.carousel-inner.landing');
    let startX;
    let isDragging = false;

    carousel.addEventListener('touchstart', touchStart);
    carousel.addEventListener('touchmove', touchMove);
    carousel.addEventListener('touchend', touchEnd);

    function touchStart(event) {
        startX = event.touches[0].clientX;
        isDragging = true;
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentX = event.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 0) {
            // Deslizar hacia la izquierda
            bootstrap.Carousel.getInstance(carousel).next();
        } else {
            // Deslizar hacia la derecha
            bootstrap.Carousel.getInstance(carousel).prev();
        }
    }

    function touchEnd() {
        isDragging = false;
    }
});