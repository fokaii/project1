document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
});

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>У вас нет избранных товаров.</p>';
        return;
    }

    const uniqueFavorites = [...new Set(favorites)];

    uniqueFavorites.forEach(productId => {
        const product = getProductById(productId);
        if (product) {
            const productElement = createProductElement(product);
            favoritesContainer.appendChild(productElement);
        }
    });
}

function getProductById(productId) {
    const products = [
        { id: '1', imgSrc: 'pic/catalog/iphone-14-pro-deep-purple.png', title: 'Apple iPhone 14 Pro Max 128Gb Silver', price: '2000 руб.' },
        { id: '2', imgSrc: 'pic/catalog/iphone-14-pro-deep-purple.png', title: 'Apple iPhone 12 Pro Max 128Gb Silver', price: '2000 руб.' }
        // Добавьте сюда другие товары
    ];
    return products.find(product => product.id === productId);
}

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product', 'visible');
    productElement.innerHTML = `
        <img src="${product.imgSrc}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">${product.price}</p>
        <div class="product-actions">
            <button class="favorite ${isFavorite(product.id) ? 'favorite-added' : ''}" data-product-id="${product.id}">Избранное</button>
            <button class="add-to-cart">В корзину</button>
        </div>
    `;

    const favoriteButton = productElement.querySelector('.favorite');
    favoriteButton.addEventListener('click', () => {
        toggleFavorite(product.id, favoriteButton);
    });

    return productElement;
}

function toggleFavorite(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        button.classList.remove('favorite-added');
        location.reload(); // Перезагрузка страницы после удаления из избранного
    } else {
        favorites.push(productId);
        button.classList.add('favorite-added');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(productId);
}
