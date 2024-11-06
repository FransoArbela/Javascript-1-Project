// openBasket.js
const openBasket = document.querySelector('#basket-pop-up');
openBasket.addEventListener('click', function() {
    document.getElementById("popup").style.display = "flex";
    populateBasket();  // Render the basket contents in the popup
});
