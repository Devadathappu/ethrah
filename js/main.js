// ============================================
// ETHRAH - Main JavaScript
// ============================================

import { products, getWhatsAppLink, getInstagramLink } from './products.js';

// ============================================
// State & Elements
// ============================================
let navbar, mobileMenuBtn, mobileMenu, productsGrid;

// ============================================
// Mobile Menu Logic
// ============================================
function setupMobileMenu() {
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle Menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            mobileMenu.classList.toggle('active');
            const isActive = mobileMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
            console.log('Mobile menu toggled:', isActive);
        });

        // Close when clicking a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    } else {
        console.error('Mobile menu elements not found!');
    }
}

// ============================================
// Navbar Icons Logic
// ============================================
function setupNavbarIcons() {
    const searchBtn = document.querySelector('button[aria-label="Search"]');
    const cartBtn = document.querySelector('button[aria-label="Cart"]');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Search feature coming soon!');
        });
        searchBtn.style.cursor = 'pointer'; // Ensure pointer cursor
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert('Cart feature coming soon!');
        });
        cartBtn.style.cursor = 'pointer'; // Ensure pointer cursor
    }
}

// ============================================
// Navbar Scroll Effect
// ============================================
function setupNavbarScroll() {
    navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// Smooth Scroll
// ============================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = target.offsetTop - navHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Render Products
// ============================================
// ============================================
// Search Logic
// ============================================
function setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    const closeSearchBtn = document.getElementById('close-search');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchOverlay && searchInput) {
        // Open
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });

        // Close
        closeSearchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = ''; // Clear input
            renderProducts(products); // Reset grid
        });

        // Close on esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });

        // Search Input Handler (Debounced slightly for performance if needed, but direct is fine for small list)
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            handleSearch(query);
        });
    }
}

function handleSearch(query) {
    if (!query) {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.price.toLowerCase().includes(query)
    );

    renderProducts(filtered, query);
}

// ============================================
// Render Products
// ============================================
function renderProducts(productsToRender = products, searchQuery = '') { // Default to all products
    productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    if (!productsToRender || productsToRender.length === 0) {
        // Sanitize query for display
        const safeQuery = searchQuery.replace(/[&<>"']/g, function (m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });

        productsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-text-light);">
                    No products found matching "${safeQuery}"
                </p>
                <button onclick="document.getElementById('search-input').value=''; renderProducts();" 
                        class="btn btn-primary" style="margin-top: 1rem;">
                    View All Products
                </button>
            </div>`;
        return;
    }

    productsGrid.innerHTML = productsToRender.map((product, index) => `
    <div class="product-card" style="animation-delay: ${index * 0.1}s">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image" 
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23f3ede5%22 width=%22300%22 height=%22300%22/%3E%3Ctext fill=%22%23c0aa8f%22 font-family=%22serif%22 font-size=%2224%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
      </div>
      
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">${product.price}</div>
      </div>
      
      <div class="product-actions">
        <a href="${getWhatsAppLink(product.name)}" 
           class="btn btn-whatsapp"
           target="_blank" rel="noopener noreferrer">
           CHAT TO BUY ON WHATSAPP
        </a>
        <a href="${getInstagramLink()}" 
           class="btn btn-instagram"
           target="_blank" rel="noopener noreferrer">
           VIEW ON INSTAGRAM
        </a>
      </div>
    </div>
  `).join('');
}

// ============================================
// Social Links
// ============================================
function setupSocialLinks() {
    const instagramUrl = getInstagramLink();
    const whatsappUrl = getWhatsAppLink('Ethrah Products');

    const instagramLinks = document.querySelectorAll('#instagram-link, #footer-instagram');
    const whatsappLinks = document.querySelectorAll('#whatsapp-link, #footer-whatsapp');

    instagramLinks.forEach(link => {
        link.href = instagramUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });

    whatsappLinks.forEach(link => {
        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
}

// ============================================
// Initialize
// ============================================
function init() {
    console.log('Initializing Ethrah...');
    setupNavbarScroll();
    setupMobileMenu();
    setupSearch(); // Added search setup
    // setupNavbarIcons(); // Removed Search/Cart alert logic from here for Search
    renderProducts();
    setupSocialLinks();
    setupSmoothScroll();

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    console.log('Ethrah Initialized.');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
