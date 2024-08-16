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


