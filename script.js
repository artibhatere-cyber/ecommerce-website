/**
 * LumiShop – script.js
 * ============================================================
 * Vanilla JavaScript for the LumiShop e-commerce website.
 * Features:
 *   1.  Cart management (add, remove, count, sidebar)
 *   2.  Product detail modal
 *   3.  Category filter
 *   4.  Contact form validation
 *   5.  Toast notifications
 *   6.  Hamburger mobile navigation
 *   7.  Active nav-link on scroll
 *   8.  Scroll-reveal animations (IntersectionObserver)
 *   9.  Checkout confirmation
 * ============================================================
 */

/* ============================================================
   PRODUCT DATA
   All product information is stored here.
   Modal reads from this array by index.
   ============================================================ */
const products = [
  {
    id: 0,
    name: "SoundWave Pro X",
    category: "Electronics",
    price: "₹4,299",
    rawPrice: 4299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description:
      "The SoundWave Pro X delivers studio-quality audio in an over-ear wireless form factor. Equipped with 40mm bio-cellulose drivers, 40-hour battery life, active noise cancellation, and multipoint Bluetooth 5.3 connectivity. The premium memory-foam ear cushions ensure comfort during extended listening sessions.",
    specs: [
      { label: "Driver Size", value: "40mm Bio-Cellulose" },
      { label: "Battery Life", value: "40 Hours ANC On" },
      { label: "Connectivity", value: "Bluetooth 5.3 / 3.5mm" },
      { label: "Noise Cancel", value: "Active (Hybrid ANC)" },
      { label: "Weight", value: "285g" },
      { label: "Warranty", value: "1 Year" },
    ],
    emoji: "🎧",
  },
  {
    id: 1,
    name: "NexaWrist S3",
    category: "Electronics",
    price: "₹7,999",
    rawPrice: 7999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    description:
      "The NexaWrist S3 combines cutting-edge health monitoring with a premium aluminium design. Features a 1.8-inch AMOLED display, continuous heart rate monitoring, built-in GPS, SpO2 sensor, and a 7-day battery life. Compatible with both Android and iOS.",
    specs: [
      { label: "Display", value: '1.8" AMOLED, 368×448' },
      { label: "Battery", value: "7 Days / 14h GPS" },
      { label: "Sensors", value: "HR, SpO2, GPS, Gyro" },
      { label: "Water Rating", value: "5ATM" },
      { label: "Compat.", value: "Android 8+ / iOS 14+" },
      { label: "Warranty", value: "1 Year" },
    ],
    emoji: "⌚",
  },
  {
    id: 2,
    name: "AirPulse TWS",
    category: "Electronics",
    price: "₹2,499",
    rawPrice: 2499,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    description:
      "AirPulse TWS redefines true wireless audio with 10mm graphene drivers, 30 hours total playtime (8hr buds + 22hr case), IPX5 water resistance, and a compact carry case with wireless charging support. Dual mic ENC ensures crystal-clear calls even outdoors.",
    specs: [
      { label: "Driver", value: "10mm Graphene" },
      { label: "Playtime", value: "8hr + 22hr (case)" },
      { label: "Water Rating", value: "IPX5" },
      { label: "Charging", value: "USB-C + Wireless" },
      { label: "Latency", value: "< 60ms Game Mode" },
      { label: "Warranty", value: "1 Year" },
    ],
    emoji: "🎵",
  },
  {
    id: 3,
    name: "UrbanEdge Jacket",
    category: "Clothing",
    price: "₹5,799",
    rawPrice: 5799,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    description:
      "Crafted from genuine full-grain leather, the UrbanEdge Jacket features a timeless biker silhouette with quilted satin lining, YKK zippers, and four external pockets. Perfect for urban commutes or weekend rides. Available in Whiskey Brown and Midnight Black.",
    specs: [
      { label: "Material", value: "Genuine Full-Grain Leather" },
      { label: "Lining", value: "Quilted Satin" },
      { label: "Closure", value: "YKK Front Zip" },
      { label: "Pockets", value: "4 External, 2 Internal" },
      { label: "Sizes", value: "XS – 3XL" },
      { label: "Care", value: "Leather Conditioner Only" },
    ],
    emoji: "🧥",
  },
  {
    id: 4,
    name: "CloudComfort Hoodie",
    category: "Clothing",
    price: "₹1,899",
    rawPrice: 1899,
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    description:
      "The CloudComfort Hoodie is made from 320gsm French terry cotton — the perfect weight for all seasons. It features a relaxed oversized fit, large kangaroo pocket, ribbed cuffs and hem, and a double-lined hood. Preshrunk fabric ensures a consistent fit after every wash.",
    specs: [
      { label: "Fabric", value: "320gsm French Terry Cotton" },
      { label: "Fit", value: "Relaxed Oversized" },
      { label: "Pocket", value: "Kangaroo Front Pocket" },
      { label: "Sizes", value: "XS – 4XL" },
      { label: "Colours", value: "8 Colours Available" },
      { label: "Care", value: "Machine Wash Cold" },
    ],
    emoji: "👕",
  },
  {
    id: 5,
    name: "VistaPolar Pro",
    category: "Accessories",
    price: "₹1,499",
    rawPrice: 1499,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    description:
      "VistaPolar Pro sunglasses offer 100% UV400 protection with TAC polarized lenses that eliminate glare from reflective surfaces. The ultra-lightweight titanium frame weighs just 24g and comes with a premium microfibre carry case and cleaning cloth.",
    specs: [
      { label: "Lens", value: "TAC Polarized UV400" },
      { label: "Frame", value: "Lightweight Titanium" },
      { label: "Weight", value: "24g" },
      { label: "Style", value: "Aviator / Wayfarer" },
      { label: "Colours", value: "Gold, Silver, Black" },
      { label: "Includes", value: "Case + Cloth" },
    ],
    emoji: "🕶️",
  },
  {
    id: 6,
    name: "VeraTimex Classic",
    category: "Accessories",
    price: "₹3,199",
    rawPrice: 3199,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    description:
      "The VeraTimex Classic is a Swiss-inspired minimalist analog watch featuring a domed sapphire crystal glass, genuine Italian leather strap, and a Japanese Miyota quartz movement. 5ATM water resistance makes it suitable for swimming. Timeless elegance for every occasion.",
    specs: [
      { label: "Movement", value: "Japanese Miyota Quartz" },
      { label: "Crystal", value: "Sapphire Coated" },
      { label: "Strap", value: "Genuine Italian Leather" },
      { label: "Case Size", value: "40mm / 10mm Thin" },
      { label: "Water Rating", value: "5ATM" },
      { label: "Warranty", value: "2 Years" },
    ],
    emoji: "⌚",
  },
  {
    id: 7,
    name: "SwiftStride Runner",
    category: "Clothing",
    price: "₹2,999",
    rawPrice: 2999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    description:
      "SwiftStride Runner is engineered for performance without compromising style. The breathable engineered mesh upper keeps feet cool, while the CloudFoam midsole absorbs impact with every step. The durable rubber outsole provides superior grip on all surfaces.",
    specs: [
      { label: "Upper", value: "Engineered Mesh" },
      { label: "Midsole", value: "CloudFoam Responsive" },
      { label: "Outsole", value: "Anti-Slip Rubber" },
      { label: "Weight", value: "240g (per shoe)" },
      { label: "Sizes", value: "UK 5 – UK 12" },
      { label: "Colours", value: "5 Colours" },
    ],
    emoji: "👟",
  },
];

/* ============================================================
   CART STATE
   cartItems: Array of objects { id, name, price, rawPrice, emoji }
   cartCount: Total number of items in cart
   ============================================================ */
let cartItems = []; // Stores cart item objects
let cartCount = 0; // Total items count

/* ============================================================
   DOM ELEMENT REFERENCES
   Cached once for performance – avoid repeated querySelector calls
   ============================================================ */
const cartCountEl = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItemsList = document.getElementById("cartItemsList");
const cartEmpty = document.getElementById("cartEmpty");
const cartTotal = document.getElementById("cartTotal");
const cartTotalAmount = document.getElementById("cartTotalAmount");
const checkoutBtn = document.getElementById("checkoutBtn");

const modalOverlay = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalProductName = document.getElementById("modalProductName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSpecs = document.getElementById("modalSpecs");
const modalCartBtn = document.getElementById("modalCartBtn");

const toastEl = document.getElementById("toastNotification");

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("userName");
const emailInput = document.getElementById("userEmail");
const messageInput = document.getElementById("userMessage");
const formAlert = document.getElementById("formAlert");

const filterBtns = document.querySelectorAll(".filter-btn");
const productsGrid = document.getElementById("productsGrid");

/* ============================================================
   SECTION 1 – CART MANAGEMENT
   ============================================================ */

/**
 * addToCart(buttonEl, productName, productPrice)
 * Called by the "Add to Cart" button on each product card.
 * - Finds the product data by name match
 * - Adds to cart array
 * - Updates counter
 * - Gives button feedback
 * - Shows toast confirmation
 */
function addToCart(buttonEl, productName, productPrice) {
  // Find the full product data
  const product = products.find((p) => p.name === productName);

  if (!product) return; // Safety guard

  // Add item to cart array
  cartItems.push({
    id: Date.now(), // Unique key for this cart entry
    productId: product.id,
    name: product.name,
    price: product.price,
    rawPrice: product.rawPrice,
    emoji: product.emoji,
  });

  // Increase cart count
  cartCount++;

  // Update the counter badge in the navbar
  updateCartCounter();

  // Visually confirm on the button
  buttonEl.textContent = "✔ Added!";
  buttonEl.classList.add("added");

  // Reset the button after 2 seconds
  setTimeout(() => {
    buttonEl.textContent = "Add to Cart 🛒";
    buttonEl.classList.remove("added");
  }, 2000);

  // Show toast notification
  showToast(`"${product.name}" added to cart! 🛒`, "success");

  // Refresh the cart sidebar content
  renderCartItems();
}

/**
 * updateCartCounter()
 * Updates the visual cart count badge in the navbar.
 * Also plays a bump animation on the badge.
 */
function updateCartCounter() {
  cartCountEl.textContent = cartCount;

  // Trigger bump animation
  cartCountEl.classList.remove("bump");
  void cartCountEl.offsetWidth; // Force reflow to restart animation
  cartCountEl.classList.add("bump");
}

/**
 * removeFromCart(itemId)
 * Removes one item from cartItems by its unique id.
 * Updates count and re-renders the sidebar.
 */
function removeFromCart(itemId) {
  const index = cartItems.findIndex((item) => item.id === itemId);
  if (index === -1) return;

  const removedItem = cartItems[index];
  cartItems.splice(index, 1);
  cartCount--;

  updateCartCounter();
  renderCartItems();
  showToast(`"${removedItem.name}" removed from cart.`, "error");
}

/**
 * renderCartItems()
 * Re-renders the entire cart items list inside the sidebar.
 * Shows/hides the empty state and total area accordingly.
 */
function renderCartItems() {
  // Clear existing items
  cartItemsList.innerHTML = "";

  if (cartItems.length === 0) {
    // Show "empty cart" message, hide total
    cartEmpty.classList.remove("hidden");
    cartTotal.classList.add("hidden");
    return;
  }

  // Hide empty state, show total
  cartEmpty.classList.add("hidden");
  cartTotal.classList.remove("hidden");

  // Build list items
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.setAttribute("role", "listitem");
    li.innerHTML = `
      <span class="cart-item-emoji" aria-hidden="true">${item.emoji}</span>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price}</p>
      </div>
      <button
        class="cart-item-remove"
        onclick="removeFromCart(${item.id})"
        aria-label="Remove ${item.name} from cart"
        title="Remove"
      >✕</button>
    `;
    cartItemsList.appendChild(li);
  });

  // Calculate and display total price
  const total = cartItems.reduce((sum, item) => sum + item.rawPrice, 0);
  cartTotalAmount.textContent = `₹${total.toLocaleString("en-IN")}`;
}

/* ---------- CART SIDEBAR OPEN / CLOSE ---------- */

/**
 * openCart() – opens the cart sidebar
 */
function openCart() {
  cartSidebar.classList.add("open");
  cartSidebar.setAttribute("aria-hidden", "false");
  cartBackdrop.classList.add("active");
  cartBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

/**
 * closeCart() – closes the cart sidebar
 */
function closeCart() {
  cartSidebar.classList.remove("open");
  cartSidebar.setAttribute("aria-hidden", "true");
  cartBackdrop.classList.remove("active");
  cartBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Cart button in navbar opens the sidebar
cartBtn.addEventListener("click", openCart);

// Close button inside sidebar
cartCloseBtn.addEventListener("click", closeCart);

// Backdrop click closes the sidebar
cartBackdrop.addEventListener("click", closeCart);

// Checkout button confirmation
checkoutBtn.addEventListener("click", () => {
  if (cartItems.length === 0) return;
  closeCart();
  cartItems = [];
  cartCount = 0;
  updateCartCounter();
  renderCartItems();
  showToast("🎉 Order placed successfully! Thank you for shopping at LumiShop.", "success");
});

// "Shop Now" button inside empty cart closes cart & scrolls to products
document.getElementById("cartShopNowBtn").addEventListener("click", () => {
  closeCart();
});

/* ============================================================
   SECTION 2 – PRODUCT DETAIL MODAL
   ============================================================ */

/**
 * openModal(productIndex)
 * Opens the product detail modal for a given product index.
 * Populates all modal fields from the products data array.
 */
function openModal(productIndex) {
  const product = products[productIndex];
  if (!product) return;

  // Populate modal fields
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalCategory.textContent = product.category;
  modalProductName.textContent = product.name;
  modalPrice.textContent = product.price;
  modalDescription.textContent = product.description;

  // Build specs list
  modalSpecs.innerHTML = "";
  product.specs.forEach((spec) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${spec.label}:</strong><span>${spec.value}</span>`;
    modalSpecs.appendChild(li);
  });

  // Set up the modal's "Add to Cart" button
  modalCartBtn.onclick = () => {
    addToCart(modalCartBtn, product.name, product.price);
    closeModal();
    openCart();
  };

  // Show the modal
  modalOverlay.classList.add("active");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Focus the close button for accessibility
  setTimeout(() => modalCloseBtn.focus(), 50);
}

/**
 * closeModal()
 * Closes the product detail modal.
 */
function closeModal() {
  modalOverlay.classList.remove("active");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Close modal via close button
modalCloseBtn.addEventListener("click", closeModal);

// Close modal when clicking on the dark overlay (outside the box)
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (modalOverlay.classList.contains("active")) closeModal();
    if (cartSidebar.classList.contains("open")) closeCart();
  }
});

/* ============================================================
   SECTION 3 – CATEGORY FILTER
   ============================================================ */

/**
 * Filter product cards by category.
 * Reads the data-category attribute on each article.product-card.
 * Cards not matching the filter get the "hidden" class (display:none via CSS).
 */
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter; // "all", "Electronics", "Clothing", "Accessories"

    // Update active button styling
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Show or hide product cards
    const cards = productsGrid.querySelectorAll(".product-card");
    cards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* ============================================================
   SECTION 4 – CONTACT FORM VALIDATION
   ============================================================ */

/**
 * validateForm()
 * Validates all three contact form fields.
 * Returns true if valid, false if any field is invalid.
 * Displays inline error messages below each field.
 */
function validateForm() {
  let isValid = true;

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const messageVal = messageInput.value.trim();

  // --- Validate Name ---
  const nameError = document.getElementById("nameError");
  if (nameVal === "") {
    nameError.textContent = "⚠ Please enter your name.";
    nameInput.classList.add("error");
    isValid = false;
  } else if (nameVal.length < 2) {
    nameError.textContent = "⚠ Name must be at least 2 characters.";
    nameInput.classList.add("error");
    isValid = false;
  } else {
    nameError.textContent = "";
    nameInput.classList.remove("error");
  }

  // --- Validate Email ---
  const emailError = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
  if (emailVal === "") {
    emailError.textContent = "⚠ Please enter your email address.";
    emailInput.classList.add("error");
    isValid = false;
  } else if (!emailRegex.test(emailVal)) {
    emailError.textContent = "⚠ Please enter a valid email (e.g. user@email.com).";
    emailInput.classList.add("error");
    isValid = false;
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("error");
  }

  // --- Validate Message ---
  const messageError = document.getElementById("messageError");
  if (messageVal === "") {
    messageError.textContent = "⚠ Please enter your message.";
    messageInput.classList.add("error");
    isValid = false;
  } else if (messageVal.length < 10) {
    messageError.textContent = "⚠ Message must be at least 10 characters.";
    messageInput.classList.add("error");
    isValid = false;
  } else {
    messageError.textContent = "";
    messageInput.classList.remove("error");
  }

  return isValid;
}

// Real-time validation – clear error as user types
[nameInput, emailInput, messageInput].forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("error");
    const errorId = field.id === "userName"
      ? "nameError"
      : field.id === "userEmail"
      ? "emailError"
      : "messageError";
    document.getElementById(errorId).textContent = "";
  });
});

/**
 * Contact form submit handler.
 * Prevents default page refresh.
 * Validates fields and shows appropriate success or error message.
 */
contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop browser from refreshing

  const isValid = validateForm();

  if (isValid) {
    // Show success alert inside the form
    formAlert.className = "form-alert success";
    formAlert.textContent = "✅ Message sent! We'll get back to you within 24 hours.";

    // Reset the form fields
    contactForm.reset();

    // Also show a toast
    showToast("Your message has been sent successfully! ✉️", "success");

    // Clear the success message after 5 seconds
    setTimeout(() => {
      formAlert.className = "form-alert";
      formAlert.textContent = "";
    }, 5000);
  } else {
    // Show error alert inside the form
    formAlert.className = "form-alert error";
    formAlert.textContent = "❌ Please fix the errors above and try again.";

    // Auto-clear error after 4 seconds
    setTimeout(() => {
      formAlert.className = "form-alert";
      formAlert.textContent = "";
    }, 4000);
  }
});

/* ============================================================
   SECTION 5 – TOAST NOTIFICATIONS
   ============================================================ */

let toastTimer = null; // Track any active toast timeout

/**
 * showToast(message, type)
 * Displays a brief notification at the bottom-right of the screen.
 * @param {string} message - Text to display in the toast
 * @param {string} type - "success" | "error" (controls border color)
 */
function showToast(message, type = "success") {
  // Clear any existing timer so overlapping toasts are handled gracefully
  if (toastTimer) clearTimeout(toastTimer);

  toastEl.textContent = message;
  toastEl.className = `toast toast-${type} show`;

  // Hide the toast after 3 seconds
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 3000);
}

/* ============================================================
   SECTION 6 – HAMBURGER MOBILE NAVIGATION
   ============================================================ */

/**
 * Toggle the mobile nav menu open/closed.
 * Updates aria-expanded for screen readers.
 */
hamburgerBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  hamburgerBtn.classList.toggle("open", isOpen);
  hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Close mobile nav when a link is clicked (single-page behaviour)
navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburgerBtn.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  });
});

/* ============================================================
   SECTION 7 – ACTIVE NAV LINK ON SCROLL
   ============================================================ */

/**
 * Uses IntersectionObserver to highlight the correct nav link
 * as the user scrolls through sections.
 */
const sections = document.querySelectorAll("section[id], header[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinkEls.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
          if (link.classList.contains("active")) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  },
  {
    rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue("--nav-height").trim()} 0px -60% 0px`,
    threshold: 0,
  }
);

sections.forEach((section) => navObserver.observe(section));

/* ============================================================
   SECTION 8 – SCROLL-REVEAL ANIMATIONS
   ============================================================ */

/**
 * Adds .reveal class to elements so CSS can animate them in
 * as they enter the viewport. Uses IntersectionObserver for
 * performance (no scroll event listeners).
 */
const revealElements = document.querySelectorAll(
  ".product-card, .feature-item, .contact-form, .contact-info, .section-header, .footer-brand, .footer-links, .footer-contact"
);

revealElements.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Once revealed, stop observing for performance
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ============================================================
   SECTION 9 – STICKY HEADER SHADOW + SCROLLED CLASS
   ============================================================ */

/**
 * Adds '.scrolled' class to the header on scroll.
 * CSS uses this to darken the navbar background further.
 */
const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}, { passive: true });

/* ============================================================
   SECTION 10 – INIT
   Runs on page load to set up initial state.
   ============================================================ */

/**
 * init()
 * Initialises the page state on first load.
 */
function init() {
  // Start with correct cart display
  renderCartItems();

  // Set default aria-hidden states
  modalOverlay.setAttribute("aria-hidden", "true");
  cartSidebar.setAttribute("aria-hidden", "true");

  console.log("✦ LumiShop initialised successfully.");
  console.log(`  → ${products.length} products loaded.`);
}

// Run initialisation
init();
