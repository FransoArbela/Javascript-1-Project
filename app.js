const cardWrapper = document.querySelector('.card-wrapper');


async function deFetch() {
  const response = await fetch('https://v2.api.noroff.dev/rainy-days');
  const productsData = await response.json();
  console.log(productsData)
  return productsData.data;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const products = await deFetch();
    createCards(products);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('success');
  }

  function filterProducts(products, selectedGender) {
  // Filter products based on the selected gender
  const filteredProducts = products.filter(product => {
    return selectedGender === 'all' || product.gender === selectedGender;
  });

  
  createCards(filteredProducts);
}
});




function createCards(products) {

  products.forEach((product) => {

    // Create a card container
    const card = document.createElement('div');
    card.className = 'card';
    cardWrapper.appendChild(card);

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

    // Create price tag, showing discounted price
    const priceTag = document.createElement('p');
    priceTag.className = 'price';
  if (product.onSale) {
  priceTag.innerHTML = `
    <span id="discounted">${product.discountedPrice}€</span> 
    <span class="original-price">(Discounted from <del>${product.price}€</del>)</span>
  `;
} else {
  priceTag.textContent = `${product.price}€`;
}
    card.appendChild(priceTag);

    // Add to cart button
    const addTocartBtn = document.createElement('button');
    addTocartBtn.className = 'basket-btn';
    addTocartBtn.innerHTML = '<i class="fa-solid fa-basket-shopping" style="color: #ededed;"></i> Add to cart';
    card.appendChild(addTocartBtn);

    // Append card to card wrapper
    cardWrapper.appendChild(card);
  });
}