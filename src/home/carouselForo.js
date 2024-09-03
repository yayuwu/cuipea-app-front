let currentIndex = 1; // La segunda tarjeta (índice 1) es la inicial

export const nextSlide = () => {
    const container = document.querySelector('.carousel_cards_cointainer');
    const slides = document.querySelectorAll('.card_item');
    
    // Reordenar las tarjetas
    container.appendChild(slides[0]);
}

export const prevSlide = () => {
    const container = document.querySelector('.carousel_cards_cointainer');
    const slides = document.querySelectorAll('.card_item');
    
    // Reordenar las tarjetas
    container.insertBefore(slides[slides.length - 1], slides[0]);
}

//? ---------------------------------------------------------------------------------------------------

//!  Animaciones para el carousel:
  
//* 1) Para que se muevan automaticamente las cards:

  document.addEventListener('DOMContentLoaded', () => {
    const radios = document.querySelectorAll('input[name="slider"]');
    let currentIndex = 0;
    const intervalTime = 3000; // 3 segundos entre c/cambio

    function autoSlide() {
        radios[currentIndex].checked = false; // Desmarca el radio actual
        currentIndex = (currentIndex + 1) % radios.length; // Avanza al siguiente índice
        radios[currentIndex].checked = true; // Marca el siguiente radio
    }

    setInterval(autoSlide, intervalTime); // Cambia automáticamente cada intervalo


//* 2) Para que se deslicen con el dedo en la versión mobile:

    const carousel = document.getElementById('carousel-foro');
    let startX;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; // Guarda la posición inicial del toque
    });

    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX; // Obtiene la pos. final del toque
        const diffX = startX - endX; // Calcula diferencia de desplazamiento

        if (Math.abs(diffX) > 30) { // Ajusta el umbral según sea necesario
            if (diffX > 0) {
                // Deslizar a la izquierda
                radios[currentIndex].checked = false; // Desmarca el radio actual
                currentIndex = (currentIndex + 1) % radios.length; // Avanza al siguiente índice
                radios[currentIndex].checked = true; // Marca el siguiente radio
            } else {
                // Deslizar a la derecha
                radios[currentIndex].checked = false; // Desmarca radio actual
                currentIndex = (currentIndex - 1 + radios.length) % radios.length; // Retrocede al índice anterior
                radios[currentIndex].checked = true; // Marca el radio anterior
                }
            }
        });
    });
