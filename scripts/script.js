// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB3DRcXaAfxadmKEejs3vyynvpxErzFtLY",
  authDomain: "kofkantechnologies.firebaseapp.com",
  projectId: "kofkantechnologies",
  storageBucket: "kofkantechnologies.firebasestorage.app",
  messagingSenderId: "651853937548",
  appId: "1:651853937548:web:e62fcf94c9548597e674a9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const errorMsg = document.getElementById("errorMsg");
const cart = document.getElementById("cartcount") || document.querySelector("#cartBag span");
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
      <div onclick="viewProduct('${product.id}')" title="${product.productName}" class="product-details">
        <div class="product-img-container">
          <img class="product-img" src="${product.img}" alt="${product.productName}">
        </div>
        <h3 class="product-name">${product.productName}</h3>
        <p class="product-price">GHS ${Number(product.productPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p class="product-desc">${product.description}</p>
        <p class="product-quantity"><strong>Status:</strong> ${product.quantity}</p>
      </div>
      <button class="add-to-cart-btn" onclick="addToCart('${product.productName.replace(/'/g, "\\'")}', ${product.productPrice}, '${product.img}')">Add to Cart</button>
    </div>
  `;
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

function viewProduct(productId) {
  window.location.href = `pages/product.html?id=${productId}`;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderProducts();
});
