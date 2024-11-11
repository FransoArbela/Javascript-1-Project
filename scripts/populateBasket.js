const goToCheckoutBtn = document.querySelector('.go-to-checkout-btn');

function populateBasket() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const checkoutDetails = document.getElementById('checkout-details');
    checkoutDetails.innerHTML = ''; 

if (basket.length === 0) {
        checkoutDetails.innerHTML = '<p>Your basket is empty.</p>';
         goToCheckoutBtn.style.display = 'none'; 
    } else {
        let total = 0;
        basket.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.title}" width="150px">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <p>Size: ${item.size}</p>
                    <p>Price: €${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="remove-item">
                    <button class="remove-this-item" data-index="${index}">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>
            `;
            checkoutDetails.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        const totalElement = document.createElement('h2');
        totalElement.innerText = `Total: €${total}`;
        checkoutDetails.appendChild(totalElement);

        // Attach event listeners to each delete button
        document.querySelectorAll('.remove-this-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemIndex = event.currentTarget.getAttribute('data-index');
                removeItemFromBasket(itemIndex);
            });
        });
         goToCheckoutBtn.style.display = 'visible'; 

    }
}

function removeItemFromBasket(index) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket.splice(index, 1); 
    localStorage.setItem('basket', JSON.stringify(basket));
    populateBasket();  
    updateBasketCount();  
}

const openBasket = document.querySelector('#basket-pop-up');
openBasket.addEventListener('click', function() {
    document.getElementById("popup").style.display = "flex";
    populateBasket(); 
});

function updateBasketCount() {
  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  const totalItems = basket.reduce((total, item) => total + item.quantity, 0);
  const basketCountElement = document.getElementById('basket-count');
  if (basketCountElement) {
    basketCountElement.textContent = totalItems > 0 ? `(${totalItems})` : '';
  }
}


goToCheckoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html';        
});


// special function to go to the checkout just for index.html
function forMainIndex() {
    window.location.href = 'pages/checkout.html';
    closePopup()

    }

// close the basket pop up
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    updateBasketCount();
});

window.closePopup = closePopup;
window.updateBasketCount = updateBasketCount;
window.populateBasket = populateBasket;
window.removeItemFromBasket = removeItemFromBasket;