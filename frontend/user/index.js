// function toggleSidebar() {
    
//     const sidebar=document.querySelector(".sidebar");
//   document.querySelector(".sidebar").classList.toggle("show");

//   if(sidebar.classList.contains("show")){
//     document.addEventListener("click", outsideClickListener)
//   }else{
//     document.removeEventListener("click", outsideClickListener)
//   }
// }

// function outsideClickListener(event){
//     const sidebar=document.querySelector(".sidebar");
//     const button=document.querySelector(".side");

//     if(!sidebar.contains(event.target)&& !button.contains(event.target)){
//         sidebar.classList.remove("show");
//     document.removeEventListener("click", outsideClickListener);
//     }
// }


// function filterProducts(){
//     document.querySelector("search")

// }

//  document.addEventListener("DOMContentLoaded", () => {
//     const loginBtn = document.querySelector(".log");
//     const loginImg = document.querySelector(".logimg");
//     const token = localStorage.getItem("token");

//     if (token) {
//       // If user is logged in
//       loginBtn.onclick = () => location.href = "profile.html";
//       loginImg.src = "https://img.icons8.com/?size=100&id=7819&format=png&color=1A1A1A"; // Profile icon
//       loginImg.alt = "profile";
//     } else {
//       // If user is not logged in
//       loginBtn.onclick = () => location.href = "login.html";
//       loginImg.src = "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=1A1A1A"; // Login icon
//       loginImg.alt = "login";
//     }
//   });

// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("show");

  if (sidebar.classList.contains("show")) {
    document.addEventListener("click", outsideClickListener);
  } else {
    document.removeEventListener("click", outsideClickListener);
  }
}

// Close Sidebar on outside click
function outsideClickListener(event) {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".side");

  if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
    sidebar.classList.remove("show");
    document.removeEventListener("click", outsideClickListener);
  }
}

// Placeholder for search filtering
function filterProducts() {
  const searchInput = document.getElementById("search");
  const query = searchInput.value.trim().toLowerCase();
  console.log("Search query:", query);
  // Implement actual filtering logic here
}

// Login/Profile Icon Display Logic
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".log");
  const loginImg = document.querySelector(".logimg");
  const token = localStorage.getItem("token");

  if (token) {
    // User is logged in: remove login button entirely
    if (loginBtn) loginBtn.remove();
  } else {
    // User is not logged in: show login icon
    if (loginBtn && loginImg) {
      loginBtn.onclick = () => location.href = "login.html";
      loginImg.src = "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=1A1A1A";
      loginImg.alt = "login";
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".log");
  const loginImg = document.querySelector(".logimg");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
 console.log("🔑 Token:", token);
console.log("👤 User ID:", user._id);
  if (token && user) {
    // Replace login icon with welcome text
    if (loginBtn) loginBtn.remove();

    const welcomeMsg = document.createElement("div");
    welcomeMsg.textContent = `Welcome, ${user.name}!`;
    welcomeMsg.style.fontWeight = "bold";
    welcomeMsg.style.marginRight = "15px";
    welcomeMsg.style.color = "#000";

    document.querySelector(".righthead").prepend(welcomeMsg);
  } else {
    if (loginBtn && loginImg) {
      loginBtn.onclick = () => location.href = "login.html";
      loginImg.src = "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=1A1A1A";
      loginImg.alt = "login";
    }
  }
});
