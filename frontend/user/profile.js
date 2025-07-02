  // const token = localStorage.getItem("token"); // Use the token you stored after login

  // if (!token) {
  //   alert("Please log in first.");
  //   window.location.href = "login.html";
  // }

  // // Fetch user profile and fill form
  // window.onload = async () => {
  //   try {
  //     const res = await fetch('/api/profile', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     const data = await res.json();

  //     document.getElementById('username').value = data.name;
  //     document.getElementById('email').value = data.email;
  //     document.getElementById('phone').value = data.phone || '';
  //     document.getElementById('address').value = data.address || '';
  //     document.getElementById('pincode').value = data.pincode || '';
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // Handle Save Changes
  // document.querySelector('.edit-btn').addEventListener('click', async (e) => {
  //   e.preventDefault();
  //   const phone = document.getElementById('phone').value;
  //   const address = document.getElementById('address').value;
  //   const pincode = document.getElementById('pincode').value;

  //   const res = await fetch('/api/profile', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({ phone, address, pincode })
  //   });

  //   const data = await res.json();
  //   alert(data.message);
  // });

  // // Handle Password Update
  // async function updatePassword() {
  //   const newPassword = document.getElementById("new-password").value;
  //   if (newPassword.length < 6) {
  //     alert("Password must be at least 6 characters.");
  //     return;
  //   }

  //   const res = await fetch('/api/profile/password', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({ password: newPassword })
  //   });

  //   const data = await res.json();
  //   alert(data.message);
  // }

  // // Handle Account Deletion
  // async function confirmDelete() {
  //   if (confirm("Are you sure you want to delete your account?")) {
  //     const res = await fetch('/api/profile', {
  //       method: 'DELETE',
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     const data = await res.json();
  //     alert(data.message);
  //     localStorage.removeItem("token");
  //     window.location.href = "signup.html";
  //   }
  // }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in first.");
    window.location.href = "login.html";
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  // Load user profile data
  window.onload = async () => {
    try {
      const res = await fetch("https://furnovera-backend.onrender.com/api/profile", { headers });
      const data = await res.json();

      if (data.name) {
        document.getElementById("username").value = data.name;
        document.getElementById("email").value = data.email;
        document.getElementById("phone").value = data.phone || "";
        document.getElementById("address").value = data.address || "";
        document.getElementById("pincode").value = data.pincode || "";
      } else {
        alert("Failed to load profile");
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };

  // Update profile info
  document.querySelector(".edit-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const pincode = document.getElementById("pincode").value;

    try {
      const res = await fetch("https://furnovera-backend.onrender.com/api/profile", {
        method: "PUT",
        headers,
        body: JSON.stringify({ phone, address, pincode })
      });
      const data = await res.json();
      alert(data.message || "Profile updated.");
    } catch (err) {
      console.error("Update failed:", err);
    }
  });

  // Change password
  async function updatePassword() {
    const newPassword = document.getElementById("new-password").value;
    if (newPassword.length < 6) return alert("Password too short");

    try {
      const res = await fetch("https://furnovera-backend.onrender.com/api/profile/password", {
        method: "PUT",
        headers,
        body: JSON.stringify({ password: newPassword })
      });
      const data = await res.json();
      alert(data.message || "Password updated");
    } catch (err) {
      console.error("Password update error:", err);
    }
  }

  // Delete account
  async function confirmDelete() {
    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      const res = await fetch("https://furnovera-backend.onrender.com/api/profile", {
        method: "DELETE",
        headers
      });
      const data = await res.json();
      alert(data.message || "Account deleted");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "signup.html";
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

