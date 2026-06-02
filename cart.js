function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.cart-item-price').textContent;
        const price = parseInt(priceText.replace(' р.', ''));
        const quantity = parseInt(item.querySelector('.quantity-num').textContent);
        total += price * quantity;
    });
    
    const sumElement = document.querySelector('.price-row:first-child p:last-child');
    const totalElement = document.querySelector('.price-row:last-child p:last-child');
    
    if (sumElement) sumElement.textContent = total + ' р.';
    if (totalElement) totalElement.textContent = total + ' р.';
    
    const clearBtn = document.querySelector('.clear-cart-btn');
    if (clearBtn) {
        const count = cartItems.length;
        clearBtn.textContent = `(${count}) очистить корзину`;
    }
}

function updateQuantity(item, change) {
    const quantityElement = item.querySelector('.quantity-num');
    let currentQuantity = parseInt(quantityElement.textContent);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity >= 1) {
        quantityElement.textContent = newQuantity;
        updateTotal();
    }
}

function deleteItem(item) {
    item.remove();
    updateTotal();
}

function clearCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => item.remove());
    updateTotal();
}

function plusHandler(e) {
    const item = e.target.closest('.cart-item');
    updateQuantity(item, 1);
}

function minusHandler(e) {
    const item = e.target.closest('.cart-item');
    updateQuantity(item, -1);
}

function deleteHandler(e) {
    const item = e.target.closest('.cart-item');
    deleteItem(item);
}

function attachEventListeners() {
    // Кнопки "+"
    document.querySelectorAll('.quantity-plus').forEach(btn => {
        btn.removeEventListener('click', plusHandler);
        btn.addEventListener('click', plusHandler);
    });
    
    // Кнопки "-"
    document.querySelectorAll('.quantity-minus').forEach(btn => {
        btn.removeEventListener('click', minusHandler);
        btn.addEventListener('click', minusHandler);
    });
    
    // Кнопки удаления (мусорка)
    document.querySelectorAll('.cart-item-delete').forEach(btn => {
        btn.removeEventListener('click', deleteHandler);
        btn.addEventListener('click', deleteHandler);
    });
    
    // Кнопка очистки корзины
    const clearBtn = document.querySelector('.clear-cart-btn');
    if (clearBtn) {
        clearBtn.removeEventListener('click', clearCart);
        clearBtn.addEventListener('click', clearCart);
    }
}

// Инициализация при загрузке страницы
attachEventListeners();
updateTotal();