// cart.js
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
      div.innerHTML = `
        <div class="card shadow">
          <img src="${item.img}" class="card-img-top" alt="">
          <div class="card-body">
            <h5>${item.name}</h5>
            <p>${item.desc}</p>
            <p class="fw-bold">Price: $${item.price}</p>
            <p class="text-${item.status === "Paid" ? "success" : "warning"}">${item.status}</p>
            <div class="d-flex gap-2">
              <button class="btn btn-danger w-50 remove-btn" data-index="${index}">Remove</button>
              ${item.status === "Paid"
                ? ""
                : `<button class="btn btn-primary w-50 pay-btn" data-index="${index}">Proceed to Payment</button>`}
            </div>
          </div>
        </div>
      `;
      cartContainer.appendChild(div);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll(".pay-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        localStorage.setItem("selectedItem", JSON.stringify(cart[index]));
        window.location.href = "payment.html";
      });
    });
  }

  renderCart();
});
