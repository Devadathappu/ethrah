# Ethrah - Premium Shopping Website

A beautiful, modern static shopping website built with Vite, featuring Instagram and WhatsApp integration for seamless customer communication.

## 🌟 Features

- **Premium Design**: Modern, responsive design with smooth animations and glassmorphism effects
- **WhatsApp Integration**: Direct product inquiries with pre-filled messages
- **Instagram Integration**: Connect customers to your Instagram profile
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Performance**: Built with Vite for optimal loading speeds
- **Mobile Responsive**: Perfect experience on all devices
- **Zero Database**: Fully static, no backend required

## 🚀 Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Update Social Media Links**
   
   Edit `js/products.js` and update:
   ```javascript
   export const socialConfig = {
     instagram: "https://instagram.com/your_profile", // Your Instagram URL
     whatsapp: "+919876543210" // Your WhatsApp number with country code
   };
   ```

3. **Add Your Products**
   
   Edit the `products` array in `js/products.js` with your actual product information.

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized static files ready for deployment.

## 🌐 Deploying to Render

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/yourusername/ethrah.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Configure the deployment:
   - **Name**: `ethrah`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Click **"Create Static Site"**

Render will automatically deploy your site and provide a URL like `https://ethrah.onrender.com`

### Step 3: Connect Custom Domain (ethrah.in)

1. In Render dashboard, go to your static site
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain: `ethrah.in` and `www.ethrah.in`
4. Render will provide DNS records

5. **Configure GoDaddy DNS**:
   
   Log in to GoDaddy and update DNS settings:
   
   **For root domain (ethrah.in)**:
   - Type: `A`
   - Name: `@`
   - Value: (IP address provided by Render)
   - TTL: `600`
   
   **For www subdomain**:
   - Type: `CNAME`
   - Name: `www`
   - Value: (CNAME provided by Render, e.g., `ethrah.onrender.com`)
   - TTL: `600`

6. Wait for DNS propagation (can take up to 48 hours, usually much faster)

## 📝 Customization

### Update Products

Edit `js/products.js`:

```javascript
{
  id: 1,
  name: "Your Product Name",
  description: "Product description",
  price: "₹2,999",
  image: "/images/your-product.jpg",
  badge: "New",
  category: "Featured"
}
```

### Add Product Images

Place images in the `public/images/` folder and reference them in the products array.

### Change Colors

Edit CSS variables in `styles/main.css`:

```css
:root {
  --primary-hue: 260; /* Change this for different primary color */
  --primary-sat: 85%;
  --primary-light: 55%;
}
```

### Update Content

- **Hero Section**: Edit `index.html` hero content
- **About Section**: Update about text in `index.html`
- **Footer**: Modify footer content in `index.html`

## 🔧 Project Structure

```
ethrah/
├── index.html          # Main HTML file
├── js/
│   ├── main.js        # Main JavaScript functionality
│   └── products.js    # Product data and social config
├── styles/
│   ├── main.css       # Main styles and design system
│   └── components.css # Component styles
├── public/
│   └── images/        # Product images
├── package.json       # Dependencies
└── README.md         # This file
```

## 📱 Social Media Integration

### WhatsApp

When customers click "WhatsApp" on a product, they'll be directed to WhatsApp with a pre-filled message:

```
Hi! I'm interested in "[Product Name]". Can you provide more details?
```

### Instagram

Customers can follow your Instagram profile or view products there.

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme
- **Gradient Accents**: Purple to pink gradients
- **Glassmorphism**: Frosted glass effects
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Responsive Grid**: Adapts to all screen sizes
- **Premium Typography**: Inter font family

## 📞 Support

For questions or issues, contact via:
- WhatsApp: (Update in products.js)
- Instagram: (Update in products.js)

## 📄 License

© 2026 Ethrah. All rights reserved.

---

**Built with ❤️ using Vite**
