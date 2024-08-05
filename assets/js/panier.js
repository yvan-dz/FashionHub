// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
});

// Update quantity and total price
document.querySelectorAll('.quantity button').forEach(button => {
    button.addEventListener('click', () => {
        const quantityElement = button.parentElement.querySelector('span');
        let quantity = parseInt(quantityElement.textContent);
        if (button.textContent === '-') {
            quantity = Math.max(1, quantity - 1);
        } else {
            quantity += 1;
        }
        quantityElement.textContent = quantity;

        updateTotalPrice();
    });
});

// Remove item from cart
document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.parentElement.remove();
        updateTotalPrice();
    });
});

// Update total price
function updateTotalPrice() {
    let totalPrice = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent.replace('€', ''));
        const quantity = parseInt(item.querySelector('.quantity span').textContent);
        totalPrice += price * quantity;
    });
    document.querySelector('.total-price').textContent = `€${totalPrice.toFixed(2)}`;
}
