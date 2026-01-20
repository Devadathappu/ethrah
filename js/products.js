// ============================================
// ETHRAH - Product Data
// ============================================

export const products = [
  {
    id: 1,
    name: "Premium Product 1",
    description: "High-quality product with exceptional features and premium materials.",
    price: "₹2,999",
    image: "/images/product-1.jpg",
    badge: "New",
    category: "Featured"
  },
  {
    id: 2,
    name: "Premium Product 2",
    description: "Carefully crafted with attention to detail and superior quality.",
    price: "₹3,499",
    image: "/images/product-2.jpg",
    badge: "Popular",
    category: "Featured"
  },
  {
    id: 3,
    name: "Premium Product 3",
    description: "Elegant design meets functionality in this exclusive product.",
    price: "₹4,299",
    image: "/images/product-3.jpg",
    badge: "Exclusive",
    category: "Featured"
  },
  {
    id: 4,
    name: "Premium Product 4",
    description: "Experience luxury and comfort with this premium selection.",
    price: "₹2,799",
    image: "/images/product-4.jpg",
    badge: "New",
    category: "Featured"
  },
  {
    id: 5,
    name: "Premium Product 5",
    description: "Sophisticated style and premium quality combined perfectly.",
    price: "₹3,999",
    image: "/images/product-5.jpg",
    badge: "Trending",
    category: "Featured"
  },
  {
    id: 6,
    name: "Premium Product 6",
    description: "Exceptional craftsmanship and timeless design.",
    price: "₹5,499",
    image: "/images/product-6.jpg",
    badge: "Premium",
    category: "Featured"
  }
];

// Social Media Configuration
export const socialConfig = {
  instagram: "https://instagram.com/ethrah.in",
  whatsapp: "+918086487723"
};

// Generate WhatsApp link with pre-filled message
export function getWhatsAppLink(productName) {
  const message = encodeURIComponent(
    `Hi! I'm interested in "${productName}". Can you provide more details?`
  );
  return `https://wa.me/${socialConfig.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
}

// Generate Instagram link
export function getInstagramLink() {
  return socialConfig.instagram;
}
