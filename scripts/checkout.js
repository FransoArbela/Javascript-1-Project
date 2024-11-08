async function fetchProductDetails(productId) {
  if (!productId) {
    console.error("No product ID found in URL");
    return;
  }

  try {
    const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
    if (!response.ok) throw new Error('Product not found');
    const { data: productData } = await response.json(); // 

  } catch (error) {
    console.error("Error fetching product details:", error);
    productContainer.innerHTML = `<p>Product not found</p>`;
  }
}
