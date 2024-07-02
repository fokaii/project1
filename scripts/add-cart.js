document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    setupCartButtons();
});

function setupCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product, .promotion');
            const productId = productElement.getAttribute('data-product-id') || productElement.getAttribute('data-promotion-id');

            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage')); // Обновляем счетчик корзины
}
