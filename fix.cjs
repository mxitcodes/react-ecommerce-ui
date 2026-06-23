const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');

// 1. Fix CSS files for dark mode
const cssFiles = [
  'Cart.css',
  'CategoryBar.css',
  'DealsSection.css',
  'Footer.css',
  'Header.css',
  'ProductCard.css',
  'ProductGrid.css',
  'ProductModal.css',
  'ProductReviews.css',
  'ToastContainer.css',
  'Wishlist.css',
  'LoginModal.css'
];

cssFiles.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace hardcoded backgrounds
    content = content.replace(/background:\s*#ffffff;/g, 'background: var(--color-card, #ffffff);');
    content = content.replace(/background:\s*#f8f9fa;/g, 'background: var(--color-bg, #f8f9fa);');
    content = content.replace(/background:\s*#f0f2f5;/g, 'background: var(--color-bg, #f0f2f5);');
    content = content.replace(/background:\s*linear-gradient\(180deg,\s*#ffffff\s*0%,\s*#f8f9fa\s*100%\);/g, 'background: var(--color-bg, #f8f9fa);');
    content = content.replace(/background:\s*linear-gradient\(180deg,\s*#f8f9fa\s*0%,\s*#ffffff\s*100%\);/g, 'background: var(--color-bg, #f8f9fa);');
    
    // Replace text colors
    content = content.replace(/color:\s*#333;/g, 'color: var(--color-text);');
    content = content.replace(/color:\s*#333333;/g, 'color: var(--color-text);');
    
    fs.writeFileSync(filePath, content);
  }
});

// 2. Fix Products.js
const productsPath = path.join(srcDir, 'data', 'products.js');
if (fs.existsSync(productsPath)) {
  let pContent = fs.readFileSync(productsPath, 'utf8');
  
  // To avoid complex regex parsing, let's just make the images array 3 copies of the main image 
  // for all products, since the user complained about broken images. This guarantees they load.
  // Actually, we can just replace the images array with `[image, image, image]` in the frontend 
  // or just fix the products.js by replacing the images array.
  
  // We will do a regex replacement for images: [...]
  pContent = pContent.replace(/images:\s*\[[\s\S]*?\],/g, (match) => {
    return match; // Actually it's easier to modify ProductModal.jsx
  });
  
  // Wait, I will just fix products.js images arrays
}

console.log('Done fixing CSS');
