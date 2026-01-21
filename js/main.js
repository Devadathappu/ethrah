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
// ============================================
// Render Products (Redesigned)
// ============================================
function renderProducts() {
    if (!productsGrid) return;

    // Use placeholder loading state if array empty
    if (!products || products.length === 0) {
        productsGrid.innerHTML = '<div class="loading"></div>';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
    <div class="product-card">
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
