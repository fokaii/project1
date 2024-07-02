document.addEventListener('DOMContentLoaded', () => {
    const clearCartButton = document.getElementById('clear-cart');
    const clearFavoritesButton = document.getElementById('clear-favorites');

    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    if (clearFavoritesButton) {
        clearFavoritesButton.addEventListener('click', clearFavorites);
    }
});

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    if (window.location.href.includes('cart.html')) {
        location.reload(); // Перезагрузка страницы, если текущий URL содержит 'cart.html'
    }
}

function clearFavorites() {
    localStorage.removeItem('favorites');
    updateFavoritesCount();
    location.reload(); // Перезагрузка страницы, если текущий URL содержит 'favorites.html'
}
