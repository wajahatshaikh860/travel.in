// payment.js
document.addEventListener("DOMContentLoaded", () => {
  const selectedItem = JSON.parse(localStorage.getItem("selectedItem"));
  if (!selectedItem) return;

  // Fill payment card details
  const paymentContainer = document.getElementById("paymentContainer");
  paymentContainer.innerHTML = `
    <div class="card shadow mx-auto" style="max-width: 500px;">
      <img src="${selectedItem.img}" class="card-img-top" alt="">
      <div class="card-body">
        <h5>${selectedItem.name}</h5>
        <p>${selectedItem.desc}</p>
        <p class="fw-bold">Price: $${selectedItem.price}</p>
        <h6>Enter Card Details</h6>
        <input type="text" id="cardNumber" class="form-control mb-2" placeholder="Card Number">
        <input type="text" id="cardName" class="form-control mb-2" placeholder="Name on Card">
        <input type="text" id="cardExpiry" class="form-control mb-2" placeholder="MM/YY">
        <input type="text" id="cardCVC" class="form-control mb-3" placeholder="CVC">
        <button id="payBtn" class="btn btn-success w-100">Pay Now</button>
      </div>
    </div>
  `;

  document.getElementById("payBtn").addEventListener("click", () => {
    alert("💳 Payment Successful!");

    // Update the item in cart as Paid
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(i => i.name === selectedItem.name && i.price === selectedItem.price);
    if (index !== -1) {
      cart[index].status = "Paid";
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Clear selected item and redirect to cart
    localStorage.removeItem("selectedItem");
    window.location.href = "cart.html";
  });
});
