// Toggle between Login and Signup forms
function toggleForm() {
  document.querySelector(".login").classList.toggle("active");
  document.querySelector(".signup").classList.toggle("active");
}

// Generic fetch function
async function sendAuthRequest(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  return { ok: response.ok, data };
}

// Login Handler
document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = this.email.value.trim();
  const password = this.password.value.trim();

  try {
    const { ok, data } = await sendAuthRequest("https://furnovera-backend.onrender.com/api/users/login", { email, password });

   if (ok) {
  alert("Login successful!");
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  // ✅ Redirect based on email
  if (data.user.email === "admin@furnovera.com") {
    window.location.href = "/frontend/admin/fur.html"; // Admin dashboard page
  } else {
    window.location.href = "index.html"; // Regular user
  }
}
else {
      alert(data.message || "Invalid login credentials");
    }
  } catch (err) {
    alert("Login error. Try again later.");
    console.error(err);
  }
});

// Signup Handler
document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = this.username.value.trim();
  const email = this.email.value.trim();
  const password = this.password.value.trim();

  try {
    const { ok, data } = await sendAuthRequest("https://furnovera-backend.onrender.com/api/users/register", { name, email, password });

    if (ok) {
      alert("Signup successful! Please log in.");
      toggleForm();
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    alert("Signup error. Try again later.");
    console.error(err);
  }
});
