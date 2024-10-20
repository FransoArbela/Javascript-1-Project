const productContainer = document.querySelector('.product-container');
const productImg = document.querySelector('.product-img');
const productDetails = document.querySelector('.product-details');
const titleDescrip = document.querySelector('.title-description');
const productTags = document.querySelector('.tags');
const productPrice = document.querySelector('#price');
const productSize = document.querySelector('.size');
const productColor = document.querySelector('.colors');
const productFavorite = document.querySelector('.favorite');
const cartButtonCounter = document.querySelector('#counter');


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


async function fetchProductDetails(productId) {
  if (!productId) {
    console.error("No product ID found in URL");
    return;
  }

  try {
    // Fetch the product details using the UUID from the URL
    const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }

    const product = await response.json();

    //  create img
    const img = document.createElement('img');
    img.className = 'a';
    img.src = product.data.image.url;
    img.alt = product.data.image.alt;
    productImg.appendChild(img);

    // create title
    const title = document.createElement('h1');
    title.innerHTML = product.data.title;
    titleDescrip.appendChild(title);

    // describtion
    const description = document.createElement('p');
    description.innerHTML = product.data.description;
    titleDescrip.appendChild(description);

    // tags
    const gender = document.createElement('p');

    // gender
    gender.textContent = product.data.gender;

    // colors
    const color = document.createElement('div');
    color.id = 'color-balls';
    color.style.backgroundColor = product.data.baseColor;
    productColor.appendChild(color);

    //favorite
    const favorite = document.createElement('i');
    if (product.data.favorite) {
        favorite.className = "fa-solid fa-heart fa-2xl";
        productFavorite.appendChild(favorite);
        
     }  else {
    favorite.className = "fa-regular fa-heart fa-2xl";
    productFavorite.appendChild(favorite);
    };


    // price
    const price = document.createElement('h4');
    if (product.data.onSale) {
      price.innerHTML = `
        <span id="discounted">${product.data.discountedPrice}€</span> 
        <span class="original-price">(Discounted from <del>${product.data.price}€</del>)</span>`;
    } else {
      price.textContent = `€${product.data.price}`;
    }
    productPrice.appendChild(price);


    // size
    const size = document.createElement('p');
    size.innerHTML = product.data.sizes.join(' ');

    // button for sizes
    product.data.sizes.forEach(sizeValue => {
        const button = document.createElement('button');
        button.textContent = sizeValue;
        button.className = 'size-button';



        button.addEventListener('click', function() {

        const allButtons = document.querySelectorAll('.size-button');

        if (button.classList.contains('isClicked')) {
        button.classList.remove('isClicked');

        console.log('remove',button);

        } else {
        allButtons.forEach(btn => btn.classList.remove('isClicked'));
        button.classList.add('isClicked');

        console.log(button);
    }
    });
    productSize.appendChild(button);
    });


    // add to cart button
    const addTocartBtn = document.createElement('button');
    addTocartBtn.className = 'add-to-cart';
    addTocartBtn.innerHTML = '<i class="fa-solid fa-basket-shopping" style="color: #ededed;"></i> Add to cart';
    addTocartBtn.addEventListener('click', function(){
      cartCounter = document.createElement('span');
      cartCounter.id = 'cart-counter';
      cartButtonCounter.appendChild(cartCounter);
    });
    productDetails.appendChild(addTocartBtn);

  } catch (error) {
    console.error("Error fetching product details:", error);
    document.querySelector('.product-container').innerHTML = `<p>Product not found</p>`;
  }
}


// Call the function to fetch product details when the page loads
fetchProductDetails(productId);
