// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const title = document.getElementById("title");

// Fetch and display product details
db.collection("products").doc(productId).get().then(doc => {
if (doc.exists) {
    const product = doc.data();
    title.textContent = `Shop - KofKaN Technologies (${product.productName})`;  
    document.body.innerHTML = `
    <div class="product-card-home" title="${product.productName}">
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
    `;
} else {
    document.body.innerHTML = "<p>Product not found.</p>";
}
});