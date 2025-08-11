const cartSection = document.querySelector('.cart-section');

function getCartTotal() {
  return UserCart.reduce((sum, item) => sum + (Number(item.productPrice) * Number(item.quantity)), 0);
}

function renderCart() {
  cartSection.innerHTML = UserCart.length === 0
    ? "<p>Your cart is empty.</p>"
    : UserCart.map((item, index) => `
      <div class="product-card">
        <img style="width: 200px; height: 200px" src="${item.img}" alt="${item.productName}">
        <div class="cart-item-details">
          <h3 class="product-name">${item.productName}</h3>
          <p class="product-price">Price: GHC ${Number(item.productPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <div class="cart-quantity">
            <label for="quantity"><strong>Quantity:</strong></label>
            <div class="quantity-input">
              <button class="quantity-btn" type="button" onclick="this.nextElementSibling.stepDown(); this.nextElementSibling.dispatchEvent(new Event('change'));">-</button>
              <input type="number" class="cart-quantity-input" data-index="${index}" min="0" value="${item.quantity}">
              <button class="quantity-btn" type="button" onclick="this.previousElementSibling.stepUp(); this.previousElementSibling.dispatchEvent(new Event('change'));">+</button>
            </div>
          </div>
          <button class="add-to-cart-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `).join('');

  // Display total amount
  const totalDiv = document.createElement('div');
  totalDiv.className = 'cart-total';
  totalDiv.innerHTML = `<h3>Total Amount: GHC ${getCartTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>`;
  cartSection.appendChild(totalDiv);

  // Add Pay button if cart is not empty
  if (UserCart.length > 0) {
    const payBtn = document.createElement('button');
    payBtn.className = 'add-to-cart-btn pay-btn';
    payBtn.textContent = 'Checkout';
    payBtn.onclick = function() {
      // Show loading popup
      const loadingDiv = document.createElement('div');
      loadingDiv.style.position = 'fixed';
      loadingDiv.style.top = '0';
      loadingDiv.style.left = '0';
      loadingDiv.style.width = '100vw';
      loadingDiv.style.height = '100vh';
      loadingDiv.style.background = 'rgba(0,0,0,0.4)';
      loadingDiv.style.display = 'flex';
      loadingDiv.style.justifyContent = 'center';
      loadingDiv.style.alignItems = 'center';
      loadingDiv.style.zIndex = '9999';
      loadingDiv.innerHTML = `
        <div style="background:#fff;padding:30px 50px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.2);font-size:1.3rem;">
          <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--text-add);"></i>
          <span style="margin-left:15px;">Processing items...</span>
        </div>
      `;
      document.body.appendChild(loadingDiv);

      // Simulate loading, then redirect
      setTimeout(() => {
        document.body.removeChild(loadingDiv);
        window.location.href = "../pages/checkout.html";
      }, 2500); // 3 seconds loading
    };
    cartSection.appendChild(payBtn);
  }

  // Autosave listeners after rendering
  document.querySelectorAll('.cart-quantity-input').forEach(input => {
    input.addEventListener('change', function() {
      const idx = parseInt(this.getAttribute('data-index'));
      const newQuantity = parseInt(this.value);
      if (newQuantity >= 1) {
        UserCart[idx].quantity = newQuantity;
        localStorage.setItem("UserCart", JSON.stringify(UserCart));
        renderCart(); // Re-render to update total
      } else {
        if(confirm("Are you sure you want to remove this item from the cart?")) {
          removeFromCart(idx);
        } else {
          this.value = 1; 
        }
      }
    });
  });
}
//Clear cart function
function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        localStorage.removeItem("UserCart");
        UserCart.length = 0; 
        if (cart) cart.textContent = "0";
        cartSection.innerHTML = "<p>Your cart is empty.</p>";
        renderCart();
    }
}
// Remove item from cart function
function removeFromCart(index) {
    if (confirm("Are you sure you want to remove this item from the cart?")) {
        UserCart.splice(index, 1);
        localStorage.setItem("UserCart", JSON.stringify(UserCart));
        if (cart) cart.textContent = UserCart.length;
        renderCart();
    }
}

// Initial render
renderCart();