let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const pagination = document.querySelector('.pagination');
let autoSlideInterval;

// Создаем кружочки для каждого слайда
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
        resetAutoSlide();
    });
    pagination.appendChild(dot);
}

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
    resetAutoSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
});

function updateSlider() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 3000); // смена слайда каждые 3 секунды
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Запускаем автоматическую смену слайдов при загрузке страницы
startAutoSlide();

// Останавливаем автоматическую смену при наведении мыши на слайдер
slides.addEventListener('mouseover', () => clearInterval(autoSlideInterval));

// Возобновляем автоматическую смену при уходе мыши со слайдера
slides.addEventListener('mouseout', () => startAutoSlide());
