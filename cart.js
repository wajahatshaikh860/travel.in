document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartContainer");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p class='text-center'>🛒 No bookings in your cart.</p>";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("col-md-4");

      // Check if item is paid
      const paymentBtnOrStatus = item.paid 
        ? `<p class="text-success fw-bold text-center">✅ Payment Done</p>` 
        : `<button class="btn btn-success w-100 proceed-pay" data-index="${index}">Proceed to Payment</button>`;

      div.innerHTML = `
        <div class="card shadow h-100">
          <img src="${item.img}" class="card-img-top" alt="">
          <div class="card-body d-flex flex-column">
            <h5>${item.name}</h5>
            <p>${item.desc}</p>
            <p class="fw-bold">Price: $${item.price}</p>
            <button class="btn btn-danger mb-2 remove-btn" data-index="${index}">Remove</button>
            ${paymentBtnOrStatus}
          </div>
        </div>
      `;

      cartContainer.appendChild(div);
    });

    // Remove buttons
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    // Proceed to payment buttons
    document.querySelectorAll(".proceed-pay").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        localStorage.setItem("currentBooking", JSON.stringify(cart[index]));
        window.location.href = "payment.html";
      });
    });
  }

  renderCart();
});
