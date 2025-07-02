const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const productId = params.get("id");

const baseURL = "https://furnovera-backend.onrender.com";
const container = document.getElementById("product-container");

// Default fetch all products if no category or productId is provided
if (!category && !productId) {
  fetch(`${baseURL}/api/products`)
    .then(res => res.json())
    .then(products => {
      renderProductGrid(products);
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Error loading products.</p>";
    });

} else if (category) {
  const fetchURL = category === "all"
    ? `${baseURL}/api/products`
    : `${baseURL}/api/products/category/${category}`;

  fetch(fetchURL)
    .then(res => res.json())
    .then(products => {
      renderProductGrid(products);
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Error loading products.</p>";
    });

} else if (productId) {
  fetch(`${baseURL}/api/products/${productId}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.name) {
        container.innerHTML = `
          <div class="single-product-wrapper">
            <div class="single-product-card">
              <div class="image-section">
                <img src="${baseURL}${data.imageUrl}" alt="${data.name}" />
              </div>
              <div class="info-section">
                <h2>${data.name}</h2>
                <p class="price">₹${data.discount || data.price}</p>
                <p class="category">Category: ${data.category}</p>
                <p class="description">${data.description}</p>
                <div class="product-actions">
                  <button class="cart-btn" onclick="addToCart('${data._id}')">🛒 Add to Cart</button>
                  <button class="wishlist-btn" onclick="addToWishlist('${data._id}')">❤️ Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = "<p>Product not found.</p>";
      }
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Error loading product.</p>";
    });
}

function renderProductGrid(products) {
  container.innerHTML = "";

  if (products.length > 0) {
    const grid = document.createElement("div");
    grid.classList.add("product-grid");

    products.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <img src="${baseURL}${product.imageUrl}" alt="${product.name}" class="product-img" />
        <h3>${product.name}</h3>
        <p class="price">₹${product.discount || product.price}</p>
        <p class="category">Category: ${product.category}</p>
        <div class="product-actions">
          <button class="cart-btn" onclick="addToCart('${product._id}')">🛒 Add to Cart</button>
          <button class="view-btn" onclick="location.href='product.html?id=${product._id}'">👁 View</button>
          <button class="wishlist-btn" onclick="addToWishlist('${product._id}')">❤️</button>
        </div>
      `;
      grid.appendChild(div);
    });

    container.appendChild(grid);
  } else {
    container.innerHTML = "<p>No products found.</p>";
  }
}

function addToCart(productId) {
  fetch(`${baseURL}/api/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item._id === product._id);
      if (existing) {
        existing.qty += 1;
      } else {
        product.qty = 1;
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✅ Added to cart");
    })
    .catch(err => {
      console.error("Error adding to cart:", err);
      alert("❌ Failed to add to cart");
    });
}

function addToWishlist(productId) {
  const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id || user?._id;

  if (!userId) {
    alert("⚠️ Please log in to add items to your wishlist.");
    return;
  }

  fetch(`${baseURL}/api/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, productId })
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to add to wishlist");
      return res.json();
    })
    .then(items => {
      const alreadyExists = items.some(item => item.productId._id === productId);
      if (alreadyExists) {
        alert("ℹ️ Product is already in your wishlist");
      } else {
        alert("🤍 Added to wishlist");
      }
    })
    .catch(err => {
      console.error("Error adding to wishlist:", err);
      alert("❌ Failed to add to wishlist");
    });
}
