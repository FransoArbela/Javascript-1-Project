////////////////////////////////////// DOM Elements //////////////////////////////////////
const productContainer = document.querySelector('.product-container');
const productPrice = document.querySelector('#price');
const productColor = document.querySelector('.colors');
const productFavorite = document.querySelector('.favorite');

////////////////////////////////////// Get Product ID from URL //////////////////////////////////////
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
   

let selectedSize = null;

////////////////////////////////////// Fetch and Display Product Details //////////////////////////////////////
async function fetchProductDetails(productId) {
  if (!productId) {
    console.error("No product ID found in URL");
    return;
  }

  try {
    const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
    if (!response.ok) throw new Error('Product not found');
    const { data: productData } = await response.json(); // 

    displayProductDetails(productData);
    createSizeButtons(productData.sizes);

  } catch (error) {
    console.error("Error fetching product details:", error);
    productContainer.innerHTML = `<p>Product not found</p>`;
  }
}

function displayProductDetails(productData) {
  // Set product colors and favorite icon
  const color = document.createElement('div');
  color.id = 'color-balls';
  color.style.backgroundColor = productData.baseColor || '#000'; // Fallback color
  productColor.appendChild(color);

  const favoriteIcon = document.createElement('i');
  favoriteIcon.className = productData.favorite ? "fa-solid fa-heart fa-2xl" : "fa-regular fa-heart fa-2xl";
  productFavorite.appendChild(favoriteIcon);

  // Display product price with discount if available
  const priceHTML = productData.onSale 
    ? `<span id="discounted">${productData.discountedPrice}€</span> <span class="original-price">(Discounted from <del>${productData.price}€</del>)</span>`
    : `€${productData.price}`;
  productPrice.innerHTML = priceHTML;

  // Display product details
  productContainer.innerHTML = `
    <div class="product-img">
      <img src="${productData.image.url}" alt="${productData.image.alt}">
    </div>
    <div class="product-details">
      <div class="title-description">
        <h1>${productData.title}</h1>
        <p>${productData.description}</p>
      </div>
      <div id="price"></div>
      <div class="size">
        <h4>Size:</h4>
        <p id="size-btn-placeholder"></p>
      </div>
      <div class="tags">
        <h4>Tags: ${productData.gender}</h4>
      </div>
      <div id="add-to-cart-btn-placeholder"></div>
  `;

  createAddToCartButton(productData);
}

////////////////////////////////////// Create Size Buttons //////////////////////////////////////
function createSizeButtons(sizes) {
  const sizeBtnPlaceholder = document.querySelector('#size-btn-placeholder');
  sizes.forEach(sizeValue => {
    const button = document.createElement('button');
    button.textContent = sizeValue;
    button.className = 'size-button';
    button.addEventListener('click', () => {
      document.querySelectorAll('.size-button').forEach(btn => btn.classList.remove('isClicked'));
      button.classList.add('isClicked');
      selectedSize = sizeValue;
    });
    sizeBtnPlaceholder.appendChild(button);
  });
}

////////////////////////////////////// Add to Cart Button //////////////////////////////////////
function createAddToCartButton(productData) {
  const addToCartBtn = document.createElement('button');
  addToCartBtn.classList.add('add-to-cart', 'add-to-basket');
  addToCartBtn.innerHTML = '<i class="fa-solid fa-basket-shopping" style="color: #ededed;"></i> Add to cart';


  addToCartBtn.addEventListener('click', () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Update basket with new or existing product
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    const existingProduct = basket.find(item => item.id === productData.id && item.size === selectedSize);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      basket.push({
        id: productData.id,
        img: productData.image.url,
        title: productData.title,
        price: productData.price,
        size: selectedSize,
        color: productData.baseColor,
        quantity: 1
      });
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    updateBasketCount();
  });

  document.querySelector('#add-to-cart-btn-placeholder').appendChild(addToCartBtn);
}


////////////////////////////////////// Initialize Page //////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  fetchProductDetails(productId);
});


