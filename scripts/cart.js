document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupDeliveryOptions();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-container tbody');
    const totalAmountElement = document.getElementById('total-amount');
    const infoDeliveryBlock = document.getElementById('info-delivery-block');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="5">Ваша корзина пуста.</td></tr>';
        totalAmountElement.textContent = '0 руб.';
        infoDeliveryBlock.style.display = 'none';
        return;
    }

    infoDeliveryBlock.style.display = 'flex'; // Показываем блок информации и доставки

    let totalAmount = 0;
    cart.forEach(item => {
        const product = getProductById(item.id);
        if (product) {
            const cartItemElement = createCartItemElement(product, item.quantity);
            cartContainer.appendChild(cartItemElement);
            totalAmount += product.price * item.quantity;
        }
    });

    totalAmountElement.textContent = `${totalAmount} руб.`;
}

function getProductById(productId) {
    const products = [
        { id: '1', imgSrc: 'pic/catalog/iphone-14-pro-deep-purple.png', title: 'Apple iPhone 14 Pro Max 128Gb Silver', price: 2000 },
        { id: '2', imgSrc: 'pic/catalog/iphone-14-pro-deep-purple.png', title: 'Apple iPhone 12 Pro Max 128Gb Silver', price: 2000 }
        // Добавьте сюда другие товары
    ];
    return products.find(product => product.id === productId);
}

function createCartItemElement(product, quantity) {
    const cartItemElement = document.createElement('tr');
    cartItemElement.innerHTML = `
        <td><img src="${product.imgSrc}" alt="${product.title}"></td>
        <td>${product.title}</td>
        <td>
            <div class="counter">
                <button class="decrease-quantity">-</button>
                <input type="number" value="${quantity}" min="1" readonly>
                <button class="increase-quantity">+</button>
            </div>
        </td>
        <td class="total-price">${product.price * quantity} руб.</td>
        <td><button class="remove-from-cart" data-product-id="${product.id}">Удалить</button></td>
    `;

    const decreaseButton = cartItemElement.querySelector('.decrease-quantity');
    const increaseButton = cartItemElement.querySelector('.increase-quantity');
    const removeFromCartButton = cartItemElement.querySelector('.remove-from-cart');
    const quantityInput = cartItemElement.querySelector('input[type="number"]');
    const totalPriceElement = cartItemElement.querySelector('.total-price');

    decreaseButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateCartItem(product.id, quantity);
            quantityInput.value = quantity;
            totalPriceElement.textContent = `${product.price * quantity} руб.`;
            updateTotalAmount();
        }
    });

    increaseButton.addEventListener('click', () => {
        quantity++;
        updateCartItem(product.id, quantity);
        quantityInput.value = quantity;
        totalPriceElement.textContent = `${product.price * quantity} руб.`;
        updateTotalAmount();
    });

    removeFromCartButton.addEventListener('click', () => {
        removeFromCart(product.id);
        cartItemElement.remove();
        updateTotalAmount();
        if (isCartEmpty()) {
            cartContainer.innerHTML = '<tr><td colspan="5">Ваша корзина пуста.</td></tr>';
            totalAmountElement.textContent = '0 руб.';
            document.getElementById('delivery-options').style.display = 'none'; // Скрыть блок доставки если корзина пуста
        }
    });

    return cartItemElement;
}

function updateCartItem(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    if (window.location.pathname.includes('cart.html')) {
        location.reload();
    }
}

function updateTotalAmount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;

    cart.forEach(item => {
        const product = getProductById(item.id);
        if (product) {
            totalAmount += product.price * item.quantity;
        }
    });

    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = `${totalAmount} руб.`;
}

function isCartEmpty() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.length === 0;
}

function setupDeliveryOptions() {
    const deliveryOptions = document.getElementsByName('delivery');
    const addressContainer = document.getElementById('address-container');
    const addressInput = document.getElementById('address');

    deliveryOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.value === 'pickup') {
                addressContainer.style.display = 'none';
                addressInput.value = '';
            } else {
                addressContainer.style.display = 'block';
            }
        });
    });

    // Инициализация состояния блока адреса при загрузке
    const selectedOption = document.querySelector('input[name="delivery"]:checked').value;
    if (selectedOption === 'pickup') {
        addressContainer.style.display = 'none';
    } else {
        addressContainer.style.display = 'block';
    }
}
