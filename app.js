const cardWrapper = document.querySelector('.card-wrapper');

async function deFetch() {
  const response = await fetch('https://v2.api.noroff.dev/rainy-days');
  const productsData = await response.json();
  return productsData.data;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const products = await deFetch();
    createCards(products);

    // Initialize filter checkboxes
    const filters = {
      all: document.getElementById('all-products'),
      male: document.getElementById('male-products'),
      female: document.getElementById('female-products'),
      onSale: document.getElementById('onSale-products')
    };

    // Add event listeners to filters
    Object.values(filters).forEach(filter =>
      filter.addEventListener('change', () => filterProducts(products))
    );

  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

function filterProducts(products) {
  const filters = {
    all: document.getElementById('all-products').checked,
    male: document.getElementById('male-products').checked,
    female: document.getElementById('female-products').checked,
    onSale: document.getElementById('onSale-products').checked
  };

  let filteredProducts = products;

  if (filters.male) filteredProducts = filteredProducts.filter(p => p.gender === 'Male');
  if (filters.female) filteredProducts = filteredProducts.filter(p => p.gender === 'Female');
  if (filters.onSale) filteredProducts = filteredProducts.filter(p => p.onSale);
  if (filters.all) filteredProducts = products;  // Reset to all products if "all" is checked

  createCards(filteredProducts);
}

function createCards(products) {
  // cardWrapper.innerHTML = '';  

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img class="card-img" src="${product.image.url}" alt="${product.image.alt}">
      <h6 class="title">${product.title}</h6>
      <p class="price">
        ${product.onSale ? `<span id="discounted">€${product.discountedPrice}</span> <span class="original-price">(Discounted from <del>€${product.price}</del>)</span>` : `€${product.price}`}
      </p>
      <a class="view-product-btn" href="pages/product.html?id=${product.id}">View Product</a>
    `;

    cardWrapper.appendChild(card);
  });
}

function basketPopUp() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "flex";
        populateBasket(); // Populate the basket contents when opened
    } else {
        console.error("Popup element not found");
    }
}

function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "none";
    }
}

    document.addEventListener("DOMContentLoaded", () => {
        updateBasketCount(); // Update basket count on page load
    });

window.closePopup = closePopup; // Ensure closePopup is globally accessible
window.basketPopUp = basketPopUp;
