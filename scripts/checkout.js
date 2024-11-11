// DOM Elements
const cartProductContainer = document.querySelector('.cart-product-container');
const checkOutProduct = document.querySelector('.checkout-container');
let checkOutDetails = document.querySelector('.checkout-details');

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  // Render Cart Products and Checkout Summary
  function renderCart() {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    cartProductContainer.innerHTML = ''; // Clear cart display
    let totalAmount = 0; // Total price for all items

    // Display each item in the basket or show empty message
    if (basket.length === 0) {
      cartProductContainer.innerHTML = '<p>Your cart is empty</p>';
      checkOutDetails.innerHTML = '';

    } else {
      basket.forEach((product, index) => {
        const totalProductPrice = product.price * product.quantity;
        totalAmount += totalProductPrice; // Add product total to total amount

        const cartProduct = document.createElement('div');
        cartProduct.className = 'cart-product';
        cartProduct.innerHTML = `
          <div class="selected-product">
            <div class="order-img">
              <img id="chout-img" src="${product.img}" alt="">
            </div>
            <div class="selected-product-details">
              <h3 id="chout-title">${product.title}</h3>
              <h4 class="chout-price">Total: €${totalProductPrice.toFixed(2)}</h4>
              <h5 id="chout-size">Size: ${product.size}</h5>
              <h5 id="chout-quantity">Quantity: ${product.quantity}</h5>
            </div>
            <div class="quantity-x-wrapper">
              <select class="quantity-selector" data-index="${index}">
                ${[...Array(10).keys()].map(i => 
                  `<option value="${i + 1}" ${product.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`
                ).join('')}
              </select>
              <button class="remove-btn" data-index="${index}">
                <i class="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
        `;
        cartProductContainer.appendChild(cartProduct);
      });
    }

    // Update or create checkout summary with total
    if (!checkOutDetails) {
      checkOutDetails = document.createElement('div');
      checkOutDetails.className = 'checkout-details';
      checkOutProduct.appendChild(checkOutDetails);
    }

    checkOutDetails.innerHTML = `
      <div id="amount">
        <p>Amount:</p>
        <p>€${totalAmount.toFixed(2)}</p>
      </div>
      <div id="shipping">
        <p>Shipping cost:</p>
        <p>€0.00</p>
      </div>
      <div id="total">
        <p id="total-cost-bold">Total cost:</p>
        <p id="total-amount">€${totalAmount.toFixed(2)}</p>
      </div>
      
      <button id="purchase-btn" onClick="checkoutSuccess()">Confirm</button>
      <div class="payment-methods-accepted">
        <p>Payment methods accepted</p>
        <div class="payment-methods">
          <i class="fa-brands fa-paypal fa-2xl"></i>
          <i class="fa-brands fa-cc-mastercard fa-2xl"></i>
          <i class="fa-solid fa-credit-card fa-2xl"></i>
          <i class="fa-brands fa-google-pay fa-2xl"></i>
        </div>
      </div>
    `;

    addEventListeners();
  }

  // Add event listeners for quantity and remove buttons
  function addEventListeners() {
    document.querySelectorAll('.quantity-selector').forEach(selector => {
      selector.addEventListener('change', updateQuantity);
    });
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', removeItemFromBasket);
    });
  }

  // Update quantity and product total in basket
  function updateQuantity(event) {
    const index = event.target.getAttribute('data-index');
    const newQuantity = parseInt(event.target.value);
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    basket[index].quantity = newQuantity; // Update quantity
    localStorage.setItem('basket', JSON.stringify(basket)); // Save updated basket
    renderCart(); // Re-render cart to update totals
  }

  // Remove item from basket
  function removeItemFromBasket(event) {
    const index = event.target.getAttribute('data-index');
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    basket.splice(index, 1); // Remove selected item
    localStorage.setItem('basket', JSON.stringify(basket)); // Save updated basket
    renderCart(); // Re-render cart
  }
});

// Redirect to success page on checkout
function checkoutSuccess() {
    // Clear the basket in localStorage before redirecting
    localStorage.setItem('basket', JSON.stringify([]));
    
    // Redirect to the success page
    window.location.href = 'checkout_success.html';
    
    closePopup();
}

