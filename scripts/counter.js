document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
    updateCartCount();
    window.addEventListener('storage', () => {
        updateFavoritesCount();
        updateCartCount();
    });
});

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesCountElement = document.getElementById('favorites-count');
    const count = favorites.length;

    if (count > 0) {
        favoritesCountElement.textContent = `(${count})`;
        favoritesCountElement.style.display = 'inline';
    } else {
        favoritesCountElement.style.display = 'none';
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    if (count > 0) {
        cartCountElement.textContent = `(${count})`;
        cartCountElement.style.display = 'inline';
    } else {
        cartCountElement.style.display = 'none';
    }
}

// Обновляем счетчики при изменении данных в localStorage
window.addEventListener('storage', () => {
    updateFavoritesCount();
    updateCartCount();
});
