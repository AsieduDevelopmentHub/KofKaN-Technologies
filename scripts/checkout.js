// Move cart rendering to #checkout-content
document.addEventListener("DOMContentLoaded", function() {
    const UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
    const checkoutDiv = document.getElementById("checkout-content");

    if (UserCart.length === 0) {
    checkoutDiv.innerHTML = "<h2>Your cart is empty.</h2>";
    return;
    }

    let itemsHtml = "<h2>Checkout</h2><div class='checkout-items'>";
    UserCart.forEach(item => {
    itemsHtml += `
        <div class="checkout-item" style="border-bottom:1px solid #eee;padding:10px 0;">
        <img src="${item.img}" alt="${item.productName}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;">
        <span style="font-weight:600;">${item.productName}</span>
        <span>Qty: ${item.quantity}</span>
        <span>GHC ${Number(item.productPrice).toLocaleString(undefined, {minimumFractionDigits:2})}</span>
        <span style="font-weight:700;">Subtotal: GHC ${(Number(item.productPrice) * Number(item.quantity)).toLocaleString(undefined, {minimumFractionDigits:2})}</span>
        </div>
    `;
    });
    itemsHtml += "</div>";

    const total = UserCart.reduce((sum, item) => sum + (Number(item.productPrice) * Number(item.quantity)), 0);
    itemsHtml += `<div class="checkout-total" style="margin-top:20px;font-size:1.2rem;font-weight:700;">Total: GHC ${total.toLocaleString(undefined, {minimumFractionDigits:2})}</div>`;

    checkoutDiv.innerHTML = itemsHtml;
});

// Handle form submission
document.getElementById("userCheckoutForm").addEventListener("submit", function(e) {
    e.preventDefault();
    payment();
});

// Function to handle payment processing
function payment(){
  const UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
  const email = document.getElementById('email').value;
  let totalAmount = UserCart.reduce((sum, item) => sum + (Number(item.productPrice) * Number(item.quantity)), 0);
  if (!email) return alert('Please enter valid email.');

  const handler = PaystackPop.setup({
    key: 'pk_test_6f9c999272ed71149c0799dc2a690d23a31ed9a1',
    email: email,
    amount: totalAmount * 100, // Convert to GHS
    currency: 'GHS',
    ref: 'KofKaN' + Math.floor(Math.random() * 9849000 + 1),
    metadata: {
      custom_fields: UserCart.map(item =>({
        display_name: item.productName,
        variable_name: item.productName.replace(/\s+/g,'_').toLowerCase(),
        value: `$${item.productPrice}`,
      }))
    },
    callback: function(response){
      alert('Payment complete! Reference: '+ response.reference);
      updateDatabase();
      UserCart =[];
      totalAmount = 0;
      document.getElementById('email').value = '';
      localStorage.setItem("UserCart", JSON.stringify(UserCart));
      cart.textContent = UserCart.length; 

    },
    onClose: function(){
      alert('Transaction was cancelled')
    }
  });
  handler.openIframe();
}
// Function to update the database with order details
function updateDatabase() {
    const username = document.getElementById("username").value;
    const houseaddress = document.getElementById("houseaddress").value;
    const digitaladdress = document.getElementById("digitaladdress").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    const UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
    const total = UserCart.reduce((sum, item) => sum + (Number(item.productPrice) * Number(item.quantity)), 0);

    const orderData = {
    username,
    houseaddress,
    digitaladdress,
    phone,
    email,
    items: UserCart,
    total,
    createdAt: new Date().toISOString()
    };

    firebase.firestore().collection("orders").add(orderData)
    .then(() => {
        alert("Order placed successfully!");
        localStorage.removeItem("UserCart");
        window.location.href = "../pages/thankyou.html";
    })
    .catch(error => {
        alert("Failed to load payment" + error.message);
    });
}