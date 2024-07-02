document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.getAttribute('data-product-id');

            toggleFavorite(productId, button);
        });
    });

    loadFavorites();
});

function toggleFavorite(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        button.classList.remove('favorite-added');
    } else {
        favorites.push(productId);
        button.classList.add('favorite-added');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.dispatchEvent(new Event('storage')); // Обновляем счетчик избранного
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach(productId => {
        const productElement = document.querySelector(`.product[data-product-id="${productId}"]`);
        if (productElement) {
            const favoriteButton = productElement.querySelector('.favorite');
            if (favoriteButton) {
                favoriteButton.classList.add('favorite-added');
            }
        }
    });
}
