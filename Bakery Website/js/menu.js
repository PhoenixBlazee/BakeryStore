document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const img = btn.getAttribute('data-img');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let found = cart.find(item => item.name === name);
        if (found) {
            found.qty += 1;
        } else {
            cart.push({ name, price, img, qty: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        btn.textContent = "Added!";
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
        }, 1000);
    });
});