// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Signup
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert("✅ Account created successfully!");
      window.location.href = "login.html";
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.email === email && user.password === password) {
        alert("✅ Login successful!");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
      } else {
        alert("❌ Invalid credentials");
      }
    });
  }
});
