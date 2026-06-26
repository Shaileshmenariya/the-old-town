/* ============================================
   OLD TOWN FASHIONS — app.js
   Cart, Wishlist, Carousel, Dark Mode, Animations
   ============================================ */

'use strict';

// ── DATA ──────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1, name: "Polki Chandbali Earrings", cat: "earrings",
    price: 899, original: 1299, rating: 4.9, reviews: 128,
    badge: "best", emoji: "🪙", bg: "linear-gradient(135deg, #F5E6D3 0%, #E8C9A0 100%)",
    bgDark: "linear-gradient(135deg, #3A2820 0%, #4A3020 100%)"
  },
  {
    id: 2, name: "Jodhpuri Leather Clutch", cat: "small-bags",
    price: 1499, original: 2199, rating: 4.8, reviews: 84,
    badge: "sale", emoji: "👜", bg: "linear-gradient(135deg, #E8D4C0 0%, #C4956A 100%)",
    bgDark: "linear-gradient(135deg, #2E2018 0%, #3A2820 100%)"
  },
  {
    id: 3, name: "Gold Jhumka Set", cat: "earrings",
    price: 649, original: null, rating: 5.0, reviews: 213,
    badge: "hot", emoji: "💛", bg: "linear-gradient(135deg, #FFF3CC 0%, #F0D060 100%)",
    bgDark: "linear-gradient(135deg, #2E2800 0%, #4A4010 100%)"
  },
  {
    id: 4, name: "Mewar Tote Bag", cat: "large-bags",
    price: 2299, original: 2999, rating: 4.7, reviews: 61,
    badge: null, emoji: "🛍️", bg: "linear-gradient(135deg, #DDE3EA 0%, #9DB0C5 100%)",
    bgDark: "linear-gradient(135deg, #1E2028 0%, #282C38 100%)"
  },
  {
    id: 5, name: "Rajwada Party Clutch", cat: "party",
    price: 1849, original: 2499, rating: 4.9, reviews: 97,
    badge: "new", emoji: "✨", bg: "linear-gradient(135deg, #1A0A0A 0%, #6B1C2A 100%)",
    bgDark: "linear-gradient(135deg, #1A0A0A 0%, #6B1C2A 100%)"
  },
  {
    id: 6, name: "Kundan Drop Earrings", cat: "earrings",
    price: 749, original: 999, rating: 4.8, reviews: 175,
    badge: "sale", emoji: "💎", bg: "linear-gradient(135deg, #F3E8F8 0%, #D9A8E8 100%)",
    bgDark: "linear-gradient(135deg, #1E0A28 0%, #3C1A50 100%)"
  },
  {
    id: 7, name: "Bagru Mini Sling Bag", cat: "small-bags",
    price: 1199, original: null, rating: 4.6, reviews: 43,
    badge: "new", emoji: "🎒", bg: "linear-gradient(135deg, #F0EBE0 0%, #C8B89A 100%)",
    bgDark: "linear-gradient(135deg, #28200E 0%, #3A300A 100%)"
  },
  {
    id: 8, name: "Tribal Silver Earrings", cat: "earrings",
    price: 549, original: null, rating: 4.7, reviews: 92,
    badge: null, emoji: "🌙", bg: "linear-gradient(135deg, #E8EEF3 0%, #A8B8C8 100%)",
    bgDark: "linear-gradient(135deg, #0A0E18 0%, #1A2030 100%)"
  }
];

const ARRIVALS = [
  { id: 9, name: "Bandhani Print Tote", cat: "large-bags", price: 1799, emoji: "🌺", bg: "linear-gradient(135deg, #FF6B6B 0%, #C92C2C 100%)" },
  { id: 10, name: "Mirrorwork Clutch", cat: "party", price: 1599, emoji: "🪞", bg: "linear-gradient(135deg, #6B4CA0 0%, #3A1A5A 100%)" },
  { id: 11, name: "Gota Patti Earrings", cat: "earrings", price: 799, emoji: "🌸", bg: "linear-gradient(135deg, #FFD700 0%, #C9A820 100%)" },
  { id: 12, name: "Desert Rose Satchel", cat: "large-bags", price: 2199, emoji: "🌹", bg: "linear-gradient(135deg, #D4827A 0%, #8B4540 100%)" },
  { id: 13, name: "Vintage Zardozi Bag", cat: "party", price: 2499, emoji: "⚜️", bg: "linear-gradient(135deg, #2C5F2E 0%, #1A3A1C 100%)" },
  { id: 14, name: "Emerald Dangle Earrings", cat: "earrings", price: 699, emoji: "💚", bg: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)" },
];

// ── STATE ─────────────────────────────────────────────────────────────────

let cart = JSON.parse(localStorage.getItem('otf_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('otf_wishlist') || '[]');

// ── UTILS ─────────────────────────────────────────────────────────────────

function saveCart() { localStorage.setItem('otf_cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('otf_wishlist', JSON.stringify(wishlist)); }

function formatPrice(p) { return `₹${p.toLocaleString('en-IN')}`; }

function showToast(msg, icon = '✓') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = `${icon} ${msg}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function updateCountBadges() {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cc = document.getElementById('cartCount');
  const wc = document.getElementById('wishlistCount');
  if (cc) cc.textContent = cartCount;
  if (wc) wc.textContent = wishlist.length;
}

// ── RENDER PRODUCTS ───────────────────────────────────────────────────────

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

function getBadgeHTML(badge) {
  if (!badge) return '';
  const map = { 'best': ['badge-hot', '🔥 Best Seller'], 'new': ['badge-new', 'New'], 'hot': ['badge-hot', '🔥 Hot'], 'sale': ['badge-sale', 'Sale'] };
  const [cls, label] = map[badge] || [];
  return `<div class="product-badges"><span class="badge-tag ${cls}">${label}</span></div>`;
}

function createProductCard(product) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark && product.bgDark ? product.bgDark : product.bg;
  const inWishlist = wishlist.includes(product.id);

  return `
    <div class="product-card fade-up" data-id="${product.id}">
      <div class="product-img">
        <div class="product-placeholder" style="background: ${bg};">
          <span style="font-size:3rem;">${product.emoji}</span>
        </div>
        ${getBadgeHTML(product.badge)}
        <div class="product-actions">
          <button class="product-action-btn wishlist-toggle" data-id="${product.id}" title="Wishlist">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="product-action-btn quick-view" data-id="${product.id}" title="Quick View">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-cat">${product.cat.replace('-', ' ')}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="price-wrap">
            <span class="price">${formatPrice(product.price)}</span>
            ${product.original ? `<span class="price-original">${formatPrice(product.original)}</span>` : ''}
          </div>
          <button class="add-to-cart" data-id="${product.id}">Add to Bag</button>
        </div>
      </div>
    </div>
  `;
}

function renderBestSellers() {
  const grid = document.getElementById('bestSellersGrid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(createProductCard).join('');
  observeFadeUps();
}

function createCarouselItem(product) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark && product.bgDark ? product.bgDark : product.bg;
  return `
    <div class="carousel-item product-card fade-up" data-id="${product.id}">
      <div class="product-img">
        <div class="product-placeholder" style="background: ${bg};">
          <span style="font-size:3rem;">${product.emoji}</span>
        </div>
        <div class="product-badges"><span class="badge-tag badge-new">New</span></div>
      </div>
      <div class="product-info">
        <div class="product-cat">${product.cat.replace('-', ' ')}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-footer">
          <div class="price-wrap"><span class="price">${formatPrice(product.price)}</span></div>
          <button class="add-to-cart" data-id="${product.id}">Add to Bag</button>
        </div>
      </div>
    </div>
  `;
}

// ── CAROUSEL ──────────────────────────────────────────────────────────────

let carouselPos = 0;
const carouselVisible = () => window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 2 : window.innerWidth < 1100 ? 3 : 4;

function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsEl = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!track) return;

  track.innerHTML = ARRIVALS.map(createCarouselItem).join('');

  const items = track.querySelectorAll('.carousel-item');
  const vis = carouselVisible();
  const maxPos = Math.max(0, items.length - vis);

  // Create dots
  if (dotsEl) {
    dotsEl.innerHTML = '';
    const numDots = maxPos + 1;
    for (let i = 0; i < numDots; i++) {
      const d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goToSlide(i));
      dotsEl.appendChild(d);
    }
  }

  function goToSlide(pos) {
    const vis2 = carouselVisible();
    const maxP = Math.max(0, ARRIVALS.length - vis2);
    carouselPos = Math.max(0, Math.min(pos, maxP));
    const itemW = track.querySelector('.carousel-item').offsetWidth + 20;
    track.style.transform = `translateX(-${carouselPos * itemW}px)`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === carouselPos));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(carouselPos - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(carouselPos + 1));

  // Auto play
  let autoplay = setInterval(() => goToSlide((carouselPos + 1) % (maxPos + 1)), 4000);
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    clearInterval(autoplay);
    autoplay = setInterval(() => goToSlide((carouselPos + 1) % (maxPos + 1)), 4000);
  });
}

// ── CART ──────────────────────────────────────────────────────────────────

function addToCart(id) {
  const product = [...PRODUCTS, ...ARRIVALS].find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
  }
  saveCart();
  updateCountBadges();
  renderCartItems();
  showToast(`${product.name} added to your bag`, '✓');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCountBadges();
  renderCartItems();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCountBadges();
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Your bag is empty</p>
        <a href="shop.html" class="btn btn-gold">Start Shopping</a>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <div class="cart-item-img"><div style="background: linear-gradient(135deg, #F5E6D3, #E8C9A0); font-size:2rem;">${item.emoji}</div></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
          </div>
          <div class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</div>
        </div>
      </div>`;
  }).join('');

  if (footer) footer.style.display = 'block';
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ── WISHLIST ──────────────────────────────────────────────────────────────

function toggleWishlist(id) {
  const product = [...PRODUCTS, ...ARRIVALS].find(p => p.id === id);
  if (!product) return;
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(i => i !== id);
    showToast(`${product.name} removed from wishlist`, '♡');
  } else {
    wishlist.push(id);
    showToast(`${product.name} added to wishlist`, '♥');
  }
  saveWishlist();
  updateCountBadges();
  // Update heart icon
  const btns = document.querySelectorAll(`.wishlist-toggle[data-id="${id}"] svg`);
  btns.forEach(svg => svg.setAttribute('fill', wishlist.includes(id) ? 'currentColor' : 'none'));
}

// ── DARK MODE ─────────────────────────────────────────────────────────────

function initTheme() {
  const saved = localStorage.getItem('otf_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('otf_theme', next);
  renderBestSellers();
  initCarousel();
}

// ── HEADER SCROLL ─────────────────────────────────────────────────────────

function initScrollHeader() {
  const header = document.getElementById('siteHeader');
  const annBar = document.querySelector('.announce-bar');
  const annH = annBar ? annBar.offsetHeight : 40;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
      header.style.top = '0';
    } else {
      header.classList.remove('scrolled');
      header.style.top = annH + 'px';
    }
  }, { passive: true });

  // Set initial top
  header.style.top = annH + 'px';
}

// ── MOBILE NAV ────────────────────────────────────────────────────────────

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  const overlay = document.getElementById('mobileOverlay');

  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    overlay.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// ── SCROLL ANIMATIONS ─────────────────────────────────────────────────────

function observeFadeUps() {
  const elements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(el => io.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
}

// ── NEWSLETTER ────────────────────────────────────────────────────────────

function subscribeNewsletter() {
  const email = document.getElementById('nlEmail');
  if (!email) return;
  if (!email.value || !email.value.includes('@')) {
    showToast('Please enter a valid email address', '⚠');
    return;
  }
  showToast('Welcome to Old Town Fashions! 🎉', '✓');
  email.value = '';
}

// ── EVENT DELEGATION ──────────────────────────────────────────────────────

document.addEventListener('click', (e) => {
  // Add to cart
  const atcBtn = e.target.closest('.add-to-cart');
  if (atcBtn) {
    const id = parseInt(atcBtn.dataset.id);
    addToCart(id);
    atcBtn.textContent = '✓ Added!';
    setTimeout(() => { atcBtn.textContent = 'Add to Bag'; }, 1500);
    return;
  }

  // Wishlist toggle
  const wlBtn = e.target.closest('.wishlist-toggle');
  if (wlBtn) {
    const id = parseInt(wlBtn.dataset.id);
    toggleWishlist(id);
    return;
  }

  // Quick view (placeholder)
  const qvBtn = e.target.closest('.quick-view');
  if (qvBtn) {
    showToast('Opening quick view...', '👁');
    return;
  }

  // Cart open
  if (e.target.closest('#cartBtn')) {
    openCart();
    return;
  }

  // Cart close
  if (e.target.closest('#cartClose') || e.target.closest('#cartOverlay')) {
    closeCart();
    return;
  }

  // Theme toggle
  if (e.target.closest('#themeToggle')) {
    toggleTheme();
    return;
  }
});

// ── SMOOTH ANCHOR SCROLLING ───────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── INIT ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollHeader();
  initMobileNav();
  renderBestSellers();
  initCarousel();
  renderCartItems();
  updateCountBadges();
  observeFadeUps();

  // Add fade-up to sections
  document.querySelectorAll('.section-header, .why-card, .review-card, .gallery-item, .cat-card').forEach(el => {
    if (!el.classList.contains('fade-up')) {
      el.classList.add('fade-up');
    }
  });
  observeFadeUps();
});

// Touch swipe for carousel
let touchStart = 0;
document.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
  const diff = touchStart - e.changedTouches[0].clientX;
  const track = document.getElementById('carouselTrack');
  if (!track || Math.abs(diff) < 50) return;
  const vis = carouselVisible();
  const maxPos = Math.max(0, ARRIVALS.length - vis);
  if (diff > 0) carouselPos = Math.min(carouselPos + 1, maxPos);
  else carouselPos = Math.max(carouselPos - 1, 0);
  const itemW = track.querySelector('.carousel-item')?.offsetWidth + 20 || 0;
  track.style.transform = `translateX(-${carouselPos * itemW}px)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === carouselPos));
}, { passive: true });