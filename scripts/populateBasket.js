function populateBasket() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const checkoutDetails = document.getElementById('checkout-details');
    checkoutDetails.innerHTML = ''; // Clear previous items

    if (basket.length === 0) {
        checkoutDetails.innerHTML = '<p>Your basket is empty.</p>';
    } else {
        let total = 0;
        basket.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.title}" width="150px">
                <h4>${item.title}</h4>
                <p>Size: ${item.size}</p>
                <p>Price: €${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            `;
            checkoutDetails.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        const totalElement = document.createElement('h2');
        totalElement.innerText = `Total: €${total}`;
        checkoutDetails.appendChild(totalElement);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const finalizeButton = document.getElementById('finalize-purchase');
    
    if (finalizeButton) {
        finalizeButton.addEventListener('click', function() {
            alert('Thank you for your purchase!');
            localStorage.removeItem('basket');  // Clear the basket
            populateBasket();  // Refresh the basket display to show it's empty
            updateBasketCount(); // Update the cart icon count to 0
            closePopup();
        });
    }
});


window.populateBasket = populateBasket;
