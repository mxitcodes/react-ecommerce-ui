const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const dataDir = path.join(srcDir, 'data');

// 1. Fix CSS text colors for dark mode
const cssFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.css'));

cssFiles.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace dark text colors
  content = content.replace(/color:\s*#1a1a2e;/gi, 'color: var(--color-text);');
  content = content.replace(/color:\s*#000000;/gi, 'color: var(--color-text);');
  content = content.replace(/color:\s*#000;/gi, 'color: var(--color-text);');
  content = content.replace(/color:\s*#222;/gi, 'color: var(--color-text);');
  content = content.replace(/color:\s*#333;/gi, 'color: var(--color-text);');
  content = content.replace(/color:\s*#444;/gi, 'color: var(--color-text);');
  
  // Replace lighter text colors
  content = content.replace(/color:\s*#555;/gi, 'color: var(--color-text-light);');
  content = content.replace(/color:\s*#666;/gi, 'color: var(--color-text-light);');
  content = content.replace(/color:\s*#777;/gi, 'color: var(--color-text-light);');
  content = content.replace(/color:\s*#888;/gi, 'color: var(--color-text-light);');
  content = content.replace(/color:\s*#999;/gi, 'color: var(--color-text-light);');
  
  fs.writeFileSync(filePath, content);
});

console.log('Fixed CSS Text colors');

// 2. Remove broken images array from products 2-12
const productsPath = path.join(dataDir, 'products.js');
let pContent = fs.readFileSync(productsPath, 'utf8');

// The first product has 'images:' correctly. The others we added.
// We can just remove the 'images: [...],' entirely for all products except the first one.
// Let's use regex to find all "images: [" and remove the array.

// Products array starts with product 1.
// Let's just find and replace the images array where the first item is the main image.
// But we want to KEEP the first product's images.
// The first product's first image in the array is: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
// Any other images array, we can delete.

pContent = pContent.replace(/images:\s*\[[\s\S]*?\],/g, (match) => {
  if (match.includes('1505740420928-5e560c06d30e')) {
    return match; // Keep the headphones gallery
  }
  return ''; // Remove for others
});

// Let's also restore the 'image: "url?w=500"' back to 'image: "url?w=300&h=300&fit=crop"' 
// if we modified them, because the original ones were working.
// Actually, earlier I changed:
// `image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop"` 
// to `image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"`
// Let's change them back.

pContent = pContent.replace(/\?w=500"/g, (match, offset, str) => {
  // If it's the first product or PS5 (which was natively w=500)
  const context = str.substring(offset - 60, offset + 10);
  if (context.includes('1505740420928') || context.includes('1606813907291')) {
    return '?w=500"';
  }
  return '?w=300&h=300&fit=crop"';
});

fs.writeFileSync(productsPath, pContent);
console.log('Fixed products.js images');
