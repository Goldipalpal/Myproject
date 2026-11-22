/* =====================================================
   BakeBloom - Shared JavaScript (Vanilla JS)
   Ye ek hi file saare pages par use hoti hai.
   Har feature pehle check karta hai ki uska element page par hai ya nahi.
   ===================================================== */

// ---------- 1. PRODUCT DATA ----------
const products = [
  { id: 1, name: "Chocolate Truffle Cake", category: "cakes", price: 899, rating: 5, reviews: 214, best: true,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Choco Chip Cookies (Box of 12)", category: "cookies", price: 349, rating: 4.5, reviews: 186, best: true,
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Butter Croissant Pack", category: "pastries", price: 279, rating: 4.5, reviews: 142, best: true,
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Belgian Chocolate Box", category: "chocolates", price: 599, rating: 5, reviews: 98, best: true,
    img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80" },

  { id: 5, name: "Strawberry Cream Cake", category: "cakes", price: 799, rating: 4.5, reviews: 120, best: false,
    img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Oatmeal Raisin Cookies", category: "cookies", price: 299, rating: 4, reviews: 76, best: false,
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Glazed Donut Dozen", category: "pastries", price: 449, rating: 4.5, reviews: 133, best: false,
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Hazelnut Truffle Pralines", category: "chocolates", price: 499, rating: 4.5, reviews: 64, best: false,
    img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=600&q=80" }
];

const categoryNames = { cakes: "Cakes", cookies: "Cookies", pastries: "Pastries", chocolates: "Chocolates" };
const FREE_DELIVERY_ABOVE = 999;
const DELIVERY_FEE = 49;

// Agar koi image load na ho to ye soft peach placeholder dikhega
const fallbackImg = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect width='100%' height='100%' fill='#ffe6d3'/>" +
  "<text x='50%' y='52%' font-size='90' text-anchor='middle'>🧁</text></svg>"
);

// ---------- 2. STATE (browser mein save hota hai) ----------
const $ = (id) => document.getElementById(id);

let cart = JSON.parse(localStorage.getItem("bakebloomCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("bakebloomWishlist")) || [];
let user = JSON.parse(localStorage.getItem("bakebloomUser")) || null;
let currentFilter = "best";
let searchTerm = "";
let sortBy = "default";

// ---------- 3. HELPERS ----------
const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");
const saveCart = () => localStorage.setItem("bakebloomCart", JSON.stringify(cart));
const saveWishlist = () => localStorage.setItem("bakebloomWishlist", JSON.stringify(wishlist));

function starsHTML(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += '<i class="fa-solid fa-star"></i>';
    else if (rating >= i - 0.5) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    else html += '<i class="fa-regular fa-star"></i>';
  }
  return html;
}

function showToast(message) {
  const toastEl = $("bbToast");
  if (!toastEl) return;
  $("toastText").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2200 }).show();
}

// ---------- 4. PRODUCTS (index + shop page) ----------
function renderProducts() {
  const grid = $("productGrid");
  if (!grid) return;

  const title = $("productsTitle");
  const subtitle = $("productsSubtitle");
  let list;

  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    list = products.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
    if (title) title.textContent = 'Results for "' + searchTerm + '"';
    if (subtitle) subtitle.textContent = list.length + " treat(s) found";
  } else if (currentFilter === "best") {
    list = products.filter(p => p.best);
    if (title) title.textContent = "Best Selling Products";
    if (subtitle) subtitle.textContent = "Loved by thousands. Baked fresh every single morning.";
  } else if (currentFilter === "all") {
    list = products.slice();
    if (title) title.textContent = "All Products";
    if (subtitle) subtitle.textContent = "Everything fresh from our oven.";
  } else {
    list = products.filter(p => p.category === currentFilter);
    if (title) title.textContent = "Our " + categoryNames[currentFilter];
    if (subtitle) subtitle.textContent = "Freshly baked " + categoryNames[currentFilter].toLowerCase() + ", made with love.";
  }

  // Sorting
  if (sortBy === "low") list.sort((a, b) => a.price - b.price);
  if (sortBy === "high") list.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

  const count = $("resultCount");
  if (count) count.textContent = "Showing " + list.length + " product" + (list.length === 1 ? "" : "s");

  if (list.length === 0) {
    grid.innerHTML = '<div class="no-results"><i class="fa-regular fa-face-sad-tear fa-2x mb-2"></i><p>Sorry, nothing matched your search. Try another treat!</p></div>';
    return;
  }

  grid.innerHTML = list.map((p, i) => `
    <div class="col-sm-6 col-lg-3">
      <div class="product-card" style="animation-delay:${i * 0.08}s">
        <div class="product-img">
          ${p.best ? '<span class="product-tag">Best Seller</span>' : ""}
          <button class="wishlist-btn ${wishlist.includes(p.id) ? "active" : ""}" data-id="${p.id}" aria-label="Add to wishlist">
            <i class="${wishlist.includes(p.id) ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-body">
          <span class="product-cat">${categoryNames[p.category]}</span>
          <h5>${p.name}</h5>
          <div class="stars">${starsHTML(p.rating)}<span class="rating-count">(${p.reviews})</span></div>
          <div class="product-footer">
            <span class="price">${formatPrice(p.price)}</span>
            <button class="add-cart-btn" data-id="${p.id}"><i class="fa-solid fa-cart-plus me-1"></i>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function setActiveChip(filter) {
  document.querySelectorAll("#filterChips .chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.filter === filter);
  });
}

function applyFilter(filter) {
  currentFilter = filter;
  searchTerm = "";
  const input = $("searchInput");
  if (input) input.value = "";
  setActiveChip(filter);
  renderProducts();
}

// ---------- 5. CART ----------
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(badge => {
    badge.textContent = total;
    badge.classList.remove("bump");
    void badge.offsetWidth; // animation dobara chalane ke liye
    badge.classList.add("bump");
  });
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: id, qty: 1 });
  saveCart();
  updateCartCount();
  const product = products.find(p => p.id === id);
  showToast(product.name + " added to cart!");
}

// Cart page ka content
function renderCartPage() {
  const box = $("cartItems");
  if (!box) return;

  const hasItems = cart.length > 0;
  $("cartFilled").classList.toggle("d-none", !hasItems);
  $("cartEmpty").classList.toggle("d-none", hasItems);
  if (!hasItems) return;

  let subtotal = 0;
  box.innerHTML = cart.map(item => {
    const p = products.find(prod => prod.id === item.id);
    subtotal += p.price * item.qty;
    return `
      <div class="cart-item cart-row">
        <img src="${p.img}" alt="${p.name}">
        <div class="flex-grow-1">
          <h6>${p.name}</h6>
          <small>${categoryNames[p.category]} &middot; ${formatPrice(p.price)}</small>
          <div class="cart-qty">
            <button data-action="minus" data-id="${p.id}" aria-label="Decrease">−</button>
            <span>${item.qty}</span>
            <button data-action="plus" data-id="${p.id}" aria-label="Increase">+</button>
          </div>
        </div>
        <strong class="cart-line-price">${formatPrice(p.price * item.qty)}</strong>
        <button class="cart-remove" data-action="remove" data-id="${p.id}" aria-label="Remove"><i class="fa-solid fa-trash-can"></i></button>
      </div>`;
  }).join("");

  const delivery = subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  $("cartSubtotal").textContent = formatPrice(subtotal);
  $("cartDelivery").textContent = delivery === 0 ? "FREE" : formatPrice(delivery);
  $("cartGrand").textContent = formatPrice(subtotal + delivery);

  const note = $("freeDeliveryNote");
  if (delivery === 0) note.textContent = "🎉 You've unlocked free delivery!";
  else note.textContent = "Add " + formatPrice(FREE_DELIVERY_ABOVE - subtotal) + " more for free delivery.";
}

// ---------- 6. PAGE SETUP ----------
document.addEventListener("DOMContentLoaded", () => {

  // Footer year
  const yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // URL se category / search padhna (shop.html?category=cakes)
  const params = new URLSearchParams(window.location.search);
  const grid = $("productGrid");
  if (grid) {
    currentFilter = grid.dataset.default || "best";
    const cat = params.get("category");
    if (cat && categoryNames[cat]) currentFilter = cat;
    if (params.get("search")) { searchTerm = params.get("search").trim(); }
    setActiveChip(searchTerm ? null : currentFilter);
  }

  renderProducts();
  renderCartPage();
  updateCartCount();

  // Logged in user ka naam navbar mein
  if (user) {
    document.querySelectorAll(".login-btn span").forEach(s => s.textContent = "Hi, " + user.name);
  }

  // Toot-ti hui image ke liye fallback
  document.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG" && e.target.src !== fallbackImg) e.target.src = fallbackImg;
  }, true);

  // --- Product grid: Add to Cart + Wishlist ---
  if (grid) {
    grid.addEventListener("click", (e) => {
      const cartBtn = e.target.closest(".add-cart-btn");
      const wishBtn = e.target.closest(".wishlist-btn");

      if (cartBtn) addToCart(Number(cartBtn.dataset.id));

      if (wishBtn) {
        const id = Number(wishBtn.dataset.id);
        const icon = wishBtn.querySelector("i");
        if (wishlist.includes(id)) {
          wishlist = wishlist.filter(w => w !== id);
          wishBtn.classList.remove("active");
          icon.className = "fa-regular fa-heart";
          showToast("Removed from wishlist");
        } else {
          wishlist.push(id);
          wishBtn.classList.add("active");
          icon.className = "fa-solid fa-heart";
          showToast("Added to wishlist ❤");
        }
        saveWishlist();
      }
    });
  }

  // --- Index page: category cards ---
  function goToCategory(category) {
    applyFilter(category);
    const shop = $("shop");
    if (shop) shop.scrollIntoView({ behavior: "smooth" });
  }
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => goToCategory(card.dataset.category));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goToCategory(card.dataset.category); }
    });
  });
  document.querySelectorAll(".footer-links a[data-category]").forEach(link => {
    link.addEventListener("click", (e) => { e.preventDefault(); goToCategory(link.dataset.category); });
  });

  // --- Filter chips ---
  document.querySelectorAll("#filterChips .chip").forEach(chip => {
    chip.addEventListener("click", () => applyFilter(chip.dataset.filter));
  });

  // --- Sort dropdown (shop page) ---
  const sortSelect = $("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => { sortBy = sortSelect.value; renderProducts(); });
  }

  // --- Cart icon -> cart.html ---
  document.querySelectorAll(".cart-open").forEach(btn => {
    btn.addEventListener("click", () => { window.location.href = "cart.html"; });
  });

  // --- Cart page actions ---
  const cartItems = $("cartItems");
  if (cartItems) {
    cartItems.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const id = Number(btn.dataset.id);
      const item = cart.find(c => c.id === id);
      if (!item) return;

      if (btn.dataset.action === "plus") item.qty += 1;
      if (btn.dataset.action === "minus") item.qty -= 1;
      if (btn.dataset.action === "remove" || item.qty <= 0) cart = cart.filter(c => c.id !== id);

      saveCart();
      updateCartCount();
      renderCartPage();
    });

    $("clearCartBtn").addEventListener("click", () => {
      cart = [];
      saveCart();
      updateCartCount();
      renderCartPage();
      showToast("Cart cleared");
    });

    $("checkoutBtn").addEventListener("click", () => {
      showToast("Order placed! Thank you for shopping with BakeBloom 🎂");
      cart = [];
      saveCart();
      updateCartCount();
      setTimeout(renderCartPage, 1200);
    });
  }

  // --- Search ---
  const searchBar = $("searchBar");
  document.querySelectorAll(".search-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      searchBar.classList.toggle("open");
      if (searchBar.classList.contains("open")) $("searchInput").focus();
    });
  });

  $("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = $("searchInput").value.trim();
    if (!value) return;

    if (grid) {
      searchTerm = value;
      setActiveChip(null);
      renderProducts();
      searchBar.classList.remove("open");
      const shop = $("shop");
      if (shop) shop.scrollIntoView({ behavior: "smooth" });
    } else {
      // Dusre pages par search karne par shop page khulta hai
      window.location.href = "shop.html?search=" + encodeURIComponent(value);
    }
  });

  // --- Login / Sign Up page ---
  const loginForm = $("loginForm");
  if (loginForm) {
    const signupForm = $("signupForm");
    const tabs = document.querySelectorAll(".auth-tab");

    function showTab(name) {
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
      loginForm.classList.toggle("d-none", name !== "login");
      signupForm.classList.toggle("d-none", name !== "signup");
      $("authMsg").textContent = "";
    }
    tabs.forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));
    if (window.location.hash === "#signup") showTab("signup");

    function finishAuth(name, text) {
      user = { name: name };
      localStorage.setItem("bakebloomUser", JSON.stringify(user));
      const msg = $("authMsg");
      msg.textContent = text;
      msg.className = "mt-3 text-center msg-success";
      setTimeout(() => { window.location.href = "index.html"; }, 1300);
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("loginEmail").value.trim();
      finishAuth(email.split("@")[0], "Login successful! Redirecting to home...");
    });

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $("authMsg");
      if ($("signupPassword").value !== $("signupConfirm").value) {
        msg.textContent = "Passwords do not match.";
        msg.className = "mt-3 text-center msg-error";
        return;
      }
      finishAuth($("signupName").value.trim().split(" ")[0], "Account created! Redirecting to home...");
    });

    // Agar user pehle se logged in hai
    if (user) {
      $("loggedInBox").classList.remove("d-none");
      $("loggedInName").textContent = user.name;
      $("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("bakebloomUser");
        window.location.reload();
      });
    }
  }

  // --- Contact form ---
  const contactForm = $("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $("contactMsg");
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("contactEmail").value.trim());
      if (!$("contactName").value.trim() || !emailOk || !$("contactMessage").value.trim()) {
        msg.textContent = "Please fill name, a valid email and your message.";
        msg.className = "mt-3 msg-error";
        return;
      }
      msg.textContent = "Thank you! We have received your message and will reply soon 💌";
      msg.className = "mt-3 msg-success";
      contactForm.reset();
    });
  }

  // --- Newsletter ---
  const newsletterForm = $("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("newsletterEmail").value.trim();
      const msg = $("newsletterMsg");
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (valid) {
        msg.textContent = "Thank you for subscribing! Sweet updates are on the way 🍰";
        msg.className = "d-block mt-3 msg-success";
        newsletterForm.reset();
      } else {
        msg.textContent = "Please enter a valid email address.";
        msg.className = "d-block mt-3 msg-error";
      }
    });
  }

  // --- Navbar shrink + back to top ---
  const navbar = $("navbar");
  const backToTop = $("backToTop");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    backToTop.classList.toggle("show", window.scrollY > 500);
  });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Mobile menu link click par band ho jaye
  document.querySelectorAll("#mainNav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = $("mainNav");
      if (menu.classList.contains("show")) bootstrap.Collapse.getInstance(menu).hide();
    });
  });

  // --- Scroll reveal + number counters ---
  function runCounter(el) {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      el.textContent = Math.round(target * (step / steps)).toLocaleString("en-IN") + suffix;
      if (step >= steps) clearInterval(timer);
    }, 30);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".counter").forEach(runCounter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
