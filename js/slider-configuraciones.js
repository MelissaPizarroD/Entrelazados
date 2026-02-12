// SLIDER DE CONFIGURACIONES
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.configuraciones-grid');
    const slides = document.querySelectorAll('.configuracion-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const sliderIndicator = document.querySelector('.slider-indicator');
    
    if (!slider || slides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Actualizar indicador
    function updateIndicator() {
        sliderIndicator.textContent = `${currentIndex + 1} / ${totalSlides}`;
    }
    
    // Actualizar posición del slider
    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        updateIndicator();
        
        // Deshabilitar botones en los extremos
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
    }
    
    // Botón anterior
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    // Botón siguiente
    nextBtn.addEventListener('click', function() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Soporte para teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateSlider();
        } else if (e.key === 'ArrowRight' && currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Soporte táctil para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold && currentIndex < totalSlides - 1) {
            // Swipe izquierda (siguiente)
            currentIndex++;
            updateSlider();
        } else if (touchEndX - touchStartX > swipeThreshold && currentIndex > 0) {
            // Swipe derecha (anterior)
            currentIndex--;
            updateSlider();
        }
    }
    
    // Inicializar
    updateIndicator();
});