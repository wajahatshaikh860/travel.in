// main.js
document.addEventListener("DOMContentLoaded", () => {
  // Select all Book Now buttons
  const bookButtons = document.querySelectorAll(".book-btn");

  bookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get package details from button attributes
      const name = button.getAttribute("data-name");
      const price = button.getAttribute("data-price");
      const desc = button.getAttribute("data-desc");
      const img = button.getAttribute("data-img");

      // Create a cart item
      const newItem = { name, price, desc, img, status: "Pending Payment" };

      // Get old cart or create new one
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(newItem);

      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count in navbar
      const cartCount = document.getElementById("cartCount");
      if (cartCount) cartCount.innerText = cart.length;

      // Alert and redirect to cart page
      alert(`${name} added to cart 🛒`);
      window.location.href = "cart.html";
    });
  });
});
