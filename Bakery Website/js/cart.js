// Render cart from localStorage
function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Remove null or invalid items
    cart = cart.filter(item => item && typeof item === 'object' && item.name && item.price && item.img && item.qty);
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0, count = 0;

    if(cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = (item.price * item.qty).toFixed(2);
            total += item.price * item.qty;
            count += item.qty;
            cartItemsDiv.innerHTML += `
                <div class="cart-item" data-name="${item.name}">
                    <img src="${item.img}" class="cart-item-img" alt="${item.name}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                    </div>
                    <div class="cart-item-qty">
                        <button class="qty-btn minus"><i class="fa-solid fa-minus"></i></button>
                        <span class="qty-num">${item.qty}</span>
                        <button class="qty-btn plus"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="cart-item-price">
                        <span class="item-total">${itemTotal}</span>
                        <div>
                            <a href="#" class="cart-link remove">Remove</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    document.querySelector('.cart-summary-total').textContent = '' + total.toFixed(2);
    document.querySelector('.cart-summary-items').textContent = count + (count === 1 ? ' item' : ' items');
    addCartEvents();
}

function addCartEvents() {
    // Remove item
    document.querySelectorAll('.cart-link.remove').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const name = btn.closest('.cart-item').getAttribute('data-name');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.name !== name);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        };
    });
    // Increase qty
    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.onclick = function() {
            const name = btn.closest('.cart-item').getAttribute('data-name');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let found = cart.find(item => item.name === name);
            if(found) found.qty += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        };
    });
    // Decrease qty
    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.onclick = function() {
            const name = btn.closest('.cart-item').getAttribute('data-name');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let found = cart.find(item => item.name === name);
            if(found && found.qty > 1) found.qty -= 1;
            else cart = cart.filter(item => item.name !== name);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        };
    });
    // Remove all
    const removeAll = document.querySelector('.remove-all');
    if(removeAll) {
        removeAll.onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem('cart');
            renderCart();
        };
    }
}

document.addEventListener('DOMContentLoaded', renderCart);