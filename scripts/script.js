const errorMsg = document.getElementById("errorMsg");
const cart = document.getElementById("cartcount") || document.querySelector("#cartBag span");
const productDetails = document.getElementById("productDetails");
const UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];  
const cartCount = UserCart.length || 0;
cart.textContent = cartCount;
let totalAmount = UserCart.reduce((sum, item) => sum + Number(item.productPrice), 0);



function addToCart(productName, productPrice, productImg) {
  UserCart.push({
    productName: productName,
    productPrice: productPrice,
    img: productImg
  });
  cart.textContent = UserCart.length;
  localStorage.setItem("UserCart", JSON.stringify(UserCart));
}

function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-img-container">
        <img class="product-img" src="${product.img}" title="${product.productName}" onclick="viewProduct('${product.id}')" alt="${product.productName}">
        <i class="fas fa-shopping-cart add-to-cart-icon" title="add to cart" onclick="addToCart('${product.productName.replace(/'/g, "\\'")}', ${product.productPrice}, '${product.img}')"></i>
      </div>
      <h3 class="product-name" title="${product.productName}" onclick="viewProduct('${product.id}')">${product.productName}</h3>
      <p class="product-price" onclick="viewProduct('${product.id}')">GHS ${Number(product.productPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      <p class="product-desc" onclick="viewProduct('${product.id}')">${product.description}</p>
      <p class="product-quantity" onclick="viewProduct('${product.id}')"><strong>Status:</strong> ${product.quantity}</p>
      <button class="add-to-cart-btn" onclick="showDetails('${product.id}')">View Details</button>
    </div>
  `;
  // addToCart('${product.productName.replace(/'/g, "\\'")}', ${product.productPrice}, '${product.img}')
  // <p class="product-category"><strong>Category:</strong> ${product.category}</p>

}

function fetchAndRenderProducts() {
  db.collection("products").get().then(snapshot => {
    const products = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id; 
      products.push(data);
    });

    // Render all products in the first .product-section
    const section = document.querySelector('.product-section');
    if (section) {
      section.innerHTML = products.map(createProductCard).join('');
    }
  }).catch(err => {
    if (errorMsg) errorMsg.textContent = "Failed to load products.";
    console.error(err);
  });
}


function showDetails(productId) {
  productDetails.style.display = "flex";
  db.collection("products").doc(productId).get().then(doc => {
    if (doc.exists) {
        const product = doc.data();
        productDetails.innerHTML = `
        <div class="product-card" title="${product.productName}">
            <div class="product-img-card">
                <img class="product-img" src="${product.img}" alt="${product.productName}">
            </div>
            <h2 class="product-name">${product.productName}</h2>
            <p class="product-price"><strong>Price:</strong> GHC ${Number(product.productPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p class="product-desc">${product.description}</p>
            <p class="product-category"><strong>Category:</strong> ${product.category}</p>
            <p class="product-quantity"><strong>Status:</strong> ${product.quantity}</p>
            <button class="add-to-cart-btn" onclick="addToCart('${product.productName.replace(/'/g, "\\'")}', ${product.productPrice}, '${product.img}')">Add to Cart</button>
        </div>
        <i class="fas fa-xmark close-details" onclick="closeDetails()" title="Close Details"></i>
        `;
    } else {
        productDetails.innerHTML = "<p>Product not found.</p>";
    }
  });
}

function closeDetails() {
  productDetails.style.display = "none";
  productDetails.innerHTML = ``;
}
function showcart() {
  const cartSection = document.querySelector('.cart-section');
  if (cartSection) {
    cartSection.style.display = 'block';
    cartSection.innerHTML = UserCart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.productName}">
        <div class="cart-item-details">
          <h3>${item.productName}</h3>
          <p>Price: GHC ${Number(item.productPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </div>
    `).join('');
    const total = document.createElement('div');
    total.className = 'cart-total';
    total.innerHTML = `<h3>Total: GHC ${Number(totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>`;
    cartSection.appendChild(total);
    //  <div class="product-details">
    //   <h2>Product Details</h2>
    //   <p>Total Items in Cart: ${cartCount}</p>
    //   <p>Total Amount: GHS ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    //   <button class="add-to-cart-btn" onclick="window.location.href='pages/cart.html'">Go to Cart</button>
    // </div>
  }
}
function viewProduct(productId) {
  window.location.href = `pages/product.html?id=${productId}`;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderProducts();
});
