const errorMsg = document.getElementById("errorMsg");
const cart = document.getElementById("cartcount") || document.querySelector("#cartBag span");
const productDetails = document.getElementById("productDetails");
const UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];  
let quantity = 1; 
const cartCount = UserCart.length || 0;
cart.textContent = cartCount;
let totalAmount = UserCart.reduce((sum, item) => sum + Number(item.productPrice), 0);



function addToCart(productName, productPrice, productImg, quantity) {
  UserCart.push({
    productName: productName,
    productPrice: productPrice,
    img: productImg,
    quantity: quantity
  });
  cart.textContent = UserCart.length;
  localStorage.setItem("UserCart", JSON.stringify(UserCart));
}

function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-img-container">
        <img class="product-img" src="${product.img}" title="${product.productName}" onclick="viewProduct('${product.id}')" alt="${product.productName}">
        <i class="fas fa-shopping-cart add-to-cart-icon" title="add to cart" onclick="addToCart('${product.productName.replace(/'/g, "\\'")}', ${product.productPrice}, '${product.img}', 1)"></i>
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
        <div class="product-details" title="${product.productName}">
            <div class="product-details-img-card">
                <img class="product-details-img" src="${product.img}" alt="${product.productName}">
            </div>
            <h2 class="product-name">${product.productName}</h2>
            <p class="product-price"><strong>Price:</strong> GHC ${Number(product.productPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p class="product-desc">${product.description}</p>
            <p class="product-category"><strong>Category:</strong> ${product.category}</p>
            <p class="product-quantity"><strong>Status:</strong> ${product.quantity}</p>
            <div class="cart-quantity">
                <label for="quantity"><strong>Quantity:</strong></label>
                <div class="quantity-input">
                    <button class="quantity-btn" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
                    <input type="number" id="quantity" name="quantity" min="1" max="${product.quantity}" value="1">
                    <button class="quantity-btn" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                </div>
            </div>
            <button class="add-to-cart-btn details-btn" onclick="addToCart('${product.productName.replace(/'/g, "\\'")}', ${product.productPrice}, '${product.img}', document.getElementById('quantity').value)">Add to Cart</button>
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

function viewProduct(productId) {
  window.location.href = `pages/product.html?id=${productId}`;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderProducts();
});

auth.onAuthStateChanged(user => {
  if (user) {
    // document.getElementById("userName").textContent = user.displayName || 'Account';
    db.collection("users").doc(user.uid).get().then(doc => {
      if (doc.exists) {
        document.getElementById("userName").textContent = user.displayName || 'Account';
        const data = doc.data();
         document.getElementById("userName").textContent = data.name || 'Account';
         document.getElementById("userName1").textContent = data.name || 'Account';
      }
    });
  } else{
    document.getElementById("userName").textContent = 'Account';
    document.getElementById("userName1").textContent = 'Account';
  }
});
