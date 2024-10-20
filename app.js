
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

    const allProd = document.getElementById('all-products');
    const maleProd = document.getElementById('male-products');
    const femaleProd = document.getElementById('female-products');
    const onSaleProd = document.getElementById('onSale-products');

    // Add event listeners to all checkboxes
    allProd.addEventListener('change', () => filterProducts(products));
    maleProd.addEventListener('change', () => filterProducts(products));
    femaleProd.addEventListener('change', () => filterProducts(products));
    onSaleProd.addEventListener('change', () => filterProducts(products));

  } catch (error) {
    console.log(error);
  }
});

function filterProducts(products) {
  const allProd = document.getElementById('all-products').checked;
  const maleProd = document.getElementById('male-products').checked;
  const femaleProd = document.getElementById('female-products').checked;
  const onSaleProd = document.getElementById('onSale-products').checked;

  let filteredProducts = products;

  // Apply filters based on selected checkboxes
  if (maleProd) {
    filteredProducts = filteredProducts.filter(product => product.gender === 'Male');
  }

  if (femaleProd) {
    filteredProducts = filteredProducts.filter(product => product.gender === 'Female');
  }

  if (onSaleProd) {
    filteredProducts = filteredProducts.filter(product => product.onSale);
  }

  // If "all products" is checked, show all products
  if (allProd) {
    filteredProducts = products;
  }

  createCards(filteredProducts); // Re-render filtered products
}

// ////////////////////// create cards /////////////////////////////////////////////
function createCards(products) {
  cardWrapper.innerHTML = ''; // Clear previous content

  products.forEach((product) => {
    // Create a card container
    const card = document.createElement('div');
    card.className = 'card';

    // Create image element
    const img = document.createElement('img');
    img.className = 'card-img';
    img.src = product.image.url;
    img.alt = product.image.alt;
    card.appendChild(img);

    // Create title element
    const title = document.createElement('h6');
    title.className = 'title';
    title.textContent = product.title;
    card.appendChild(title);

    // Create a link element
    const link = document.createElement('a');
    link.href = `pages/product.html?id=${product.id}`;

    link.className = 'product-link'; 



    // Create price tag, showing discounted price
    const priceTag = document.createElement('p');
    priceTag.className = 'price';
    if (product.onSale) {
      priceTag.innerHTML = `
        <span id="discounted">€${product.discountedPrice}</span> 
        <span class="original-price">(Discounted from <del>${product.price}€</del>)</span>`;
    } else {
      priceTag.textContent = `€${product.price}`;
    }
    card.appendChild(priceTag);

    // Add to cart button
    const addTocartBtn = document.createElement('button');
    addTocartBtn.className = 'basket-btn';
    addTocartBtn.innerHTML = '<i class="fa-solid fa-basket-shopping" style="color: #ededed;"></i> Add to cart';
    addTocartBtn.addEventListener('click', function (event){

      event.preventDefault();

      const cart = document.querySelector('.cart');

      cart.style.display = 'block';
      cart.style.position = 'fixed';

      const cartBackgr = document.createElement('div');
      cartBackgr.className = 'cartBackgr';
      document.body.style.overflow = 'hidden';
      document.body.appendChild(cartBackgr);
      cartBackgr.addEventListener('click', function (){
      cart.style.display = 'none';
      cartBackgr.style.display = 'none';
      document.body.style.overflow = 'auto';
    })
  })


    card.appendChild(addTocartBtn);

    // Append the card to the dynamic link
    link.appendChild(card);

    // Append the link to the card wrapper
    cardWrapper.appendChild(link);
  });
};
