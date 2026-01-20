// ============================================
// ETHRAH - Main JavaScript
// ============================================

import { products, getWhatsAppLink, getInstagramLink } from './products.js';

// ============================================
// DOM Elements
// ============================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const navbar = document.querySelector('.navbar');
const productsGrid = document.getElementById('products-grid');

// Social media links
const instagramLinks = [
    document.getElementById('instagram-link'),
    document.getElementById('footer-instagram')
];
const whatsappLinks = [
    document.getElementById('whatsapp-link'),
    document.getElementById('footer-whatsapp')
];

// ============================================
// Mobile Menu Toggle
// ============================================
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
}

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 85; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Render Products
// ============================================
function renderProducts() {
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
    <div class="product-card fade-in">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%231a1a24%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23a0a0b0%22 font-family=%22Inter, sans-serif%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">${product.price}</div>
        <div class="product-actions">
          <a href="${getWhatsAppLink(product.name)}" 
             class="btn btn-primary btn-sm" 
             target="_blank" 
             rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
            </svg>
            WhatsApp
          </a>
          <a href="${getInstagramLink()}" 
             class="btn btn-secondary btn-sm" 
             target="_blank" 
             rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
              <circle cx="18" cy="6" r="1" fill="currentColor"/>
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </div>
  `).join('');

    // Add stagger animation to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ============================================
// Setup Social Media Links
// ============================================
function setupSocialLinks() {
    const instagramUrl = getInstagramLink();
    const whatsappUrl = getWhatsAppLink('Ethrah Products');

    // Instagram links
    instagramLinks.forEach(link => {
        if (link) {
            link.href = instagramUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });

    // WhatsApp links
    whatsappLinks.forEach(link => {
        if (link) {
            link.href = whatsappUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
}

// ============================================
// Intersection Observer for Animations
// ============================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// Initialize App
// ============================================
function init() {
    renderProducts();
    setupSocialLinks();
    setupScrollAnimations();

    console.log('🎉 Ethrah website loaded successfully!');
    console.log('📱 Update social media links in js/products.js');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// Export for potential use in other modules
// ============================================
export { renderProducts, setupSocialLinks };
