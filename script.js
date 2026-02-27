// ===== PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 6639,
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        image: "https://m.media-amazon.com/images/I/61K4azdo8BL._AC_SL1500_.jpg",
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 24899,
        description: "Advanced fitness tracking, heart rate monitor, and water-resistant design.",
        image: "https://www.bhphotovideo.com/images/images2500x2500/apple_mj362ll_a_apple_watch_38mm_smartwatch_1293065.jpg",
        rating: 4.7,
        reviews: 95
    },
    {
        id: 3,
        name: " Cotton T-Shirt",
        category: "fashion",
        price: 2489,
        description: "100% organic cotton, comfortable and eco-friendly t-shirt available in multiple colors.",
        image: "https://tse4.mm.bing.net/th/id/OIP.tWvFapCDGZSuSmoZAhahigHaHa?pid=Api&P=0&h=180",
        rating: 4.3,
        reviews: 234
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 9959,
        description: "Professional running shoes with advanced cushioning technology for maximum comfort.",
        image: "https://media.istockphoto.com/id/1350560575/photo/pair-of-blue-running-sneakers-on-white-background-isolated.jpg?s=612x612&w=0&k=20&c=A3w_a9q3Gz-tWkQL6K00xu7UHdN5LLZefzPDp-wNkSU=",
        rating: 4.6,
        reviews: 567
    },
    {
        id: 5,
        name: "Laptop Stand",
        category: "furniture",
        price: 4149,
        description: "Adjustable aluminum laptop stand for better ergonomics and desk organization.",
        image: "https://tse2.mm.bing.net/th/id/OIP.sqIMPHb2fVG_A3KW-FEaOAHaHa?pid=Api&P=0&h=180",
        rating: 4.4,
        reviews: 156
    },
    {
        id: 6,
        name: "Office Chair",
        category: "furniture",
        price: 20749,
        description: "Ergonomic office chair with lumbar support, adjustable height, and armrests.",
        image: "https://i5.walmartimages.com/asr/5a9c9482-c045-48e6-b540-f91885fa9007_1.62e743362e4a382af57edb00451d55b9.jpeg",
        rating: 4.5,
        reviews: 312
    },
    {
        id: 7,
        name: "JavaScript Mastery",
        category: "books",
        price: 319,
        description: "Learn advanced JavaScript concepts and modern frameworks with practical examples.",
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1485618771i/34036867.jpg",
        rating: 4.8,
        reviews: 423
    },
    {
        id: 8,
        name: "Web Design Guide",
        category: "books",
        price: 734,
        description: "Complete guide to modern web design principles, UX/UI, and best practices.",
        image: "https://theartlogic.com/wp-content/uploads/2025/01/blog-02.webp",
        rating: 4.6,
        reviews: 267
    },
    {
        id: 9,
        name: "USB-C Cable",
        category: "electronics",
        price: 1244,
        description: "High-speed USB-C cable, 6ft length, compatible with all USB-C devices.",
        image: "https://images-na.ssl-images-amazon.com/images/I/71bBiH3XgGL.jpg",
        rating: 4.4,
        reviews: 789
    },
    {
        id: 10,
        name: "Desk Lamp",
        category: "furniture",
        price: 979,
        description: "LED desk lamp with adjustable brightness and color temperature control.",
        image: "https://m.media-amazon.com/images/I/610FYl31-9L._AC_UF894,1000_QL80_.jpg",
        rating: 4.5,
        reviews: 198
    },
    {
        id: 11,
        name: "Winter Jacket",
        category: "fashion",
        price: 3279,
        description: "Waterproof and windproof winter jacket with thermal insulation.",
        image: "https://tse1.mm.bing.net/th/id/OIP.2GNftyLhyzztb7Fits-g9AHaHa?pid=Api&P=0&h=180",
        rating: 4.7,
        reviews: 342
    },
    {
        id: 12,
        name: "Programming 101",
        category: "books",
        price: 2904,
        description: "Beginner-friendly guide to programming fundamentals and core concepts.",
        image: "https://tse4.mm.bing.net/th/id/OIP.5H3Qt80wwKpQ583DGHJneAHaEK?pid=Api&P=0&h=180",
        rating: 4.6,
        reviews: 501
    }
];

// ===== STATE MANAGEMENT =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];
let currentProduct = null;

// ===== DOM ELEMENTS =====
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const aboutLink = document.getElementById('aboutLink');
const contactLink = document.getElementById('contactLink');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const closeButtons = document.querySelectorAll('.close');
const continueShopping = document.getElementById('continueShopping');
const checkoutBtn = document.getElementById('checkoutBtn');
const addToCartModal = document.getElementById('addToCartModal');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCartCount();
    setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Cart Modal
    cartBtn.addEventListener('click', openCartModal);
    continueShopping.addEventListener('click', closeCartModal);
    
    // Search and Filter
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    
    // Close Modals
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCartModal();
        if (e.target === productModal) productModal.style.display = 'none';
        if (e.target === document.getElementById('contactModal')) {
            document.getElementById('contactModal').style.display = 'none';
        }
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
    addToCartModal.addEventListener('click', addSelectedProductToCart);

    // About action - show styled toast (3-4 lines)
    if (aboutLink) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            showAboutToast();
        });
    }
    // Contact link registration prompts
    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleContactRegistration();
        });
    }

    // Contact form submit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const location = document.getElementById('contactLocation').value.trim();
            alert(`Thank you for registering!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}`);
            document.getElementById('contactModal').style.display = 'none';
            contactForm.reset();
        });
    }
    }


// ===== CONTACT MODAL HANDLER =====
function handleContactRegistration() {
    // open contact modal
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// ===== ABOUT TOAST =====
function showAboutToast() {
    // prevent multiple toasts
    if (document.getElementById('aboutToast')) return;

    const toast = document.createElement('div');
    toast.id = 'aboutToast';
    toast.className = 'about-toast';
    toast.innerHTML = `
        <button class="toast-close" aria-label="Close">&times;</button>
        <h3>About ShopHub</h3>
        <p>ShopHub offers curated products across electronics, fashion, furniture and books.</p>
        <p>Our mission: make online shopping simple, secure, and enjoyable.</p>
        <p style="font-weight:600; margin-top:8px;">Support: info@shophub.com</p>
    `;

    document.body.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => toast.remove());

    // auto-hide after 6 seconds
    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 6000);
}

// ===== DISPLAY PRODUCTS =====
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #6b7280;">No products found. Try adjusting your filters.</div>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const ratingStars = '⭐'.repeat(Math.floor(product.rating));
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            <div class="product-rating">${ratingStars} ${product.rating} (${product.reviews} reviews)</div>
            <div class="product-actions">
                <button class="btn btn-view btn-sm" onclick="viewProductDetails(${product.id})">View Details</button>
                <button class="btn btn-primary btn-sm" onclick="quickAddToCart(${product.id})">Add Cart</button>
            </div>
        </div>
    `;
    
    return card;
}

// ===== PRODUCT DETAILS MODAL =====
function viewProductDetails(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    const ratingStars = '⭐'.repeat(Math.floor(currentProduct.rating));
    
    document.getElementById('modalProductImage').src = currentProduct.image;
    document.getElementById('modalProductName').textContent = currentProduct.name;
    document.getElementById('modalProductCategory').textContent = currentProduct.category.toUpperCase();
    document.getElementById('modalProductDescription').textContent = currentProduct.description;
    document.getElementById('modalProductPrice').textContent = `₹${currentProduct.price.toLocaleString('en-IN')}`;
    document.getElementById('modalProductRating').textContent = `${ratingStars} ${currentProduct.rating} (${currentProduct.reviews} reviews)`;
    document.getElementById('quantityInput').value = 1;
    
    productModal.style.display = 'block';
}

function addSelectedProductToCart() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    addToCart(currentProduct.id, quantity);
    productModal.style.display = 'none';
}

// ===== SHOPPING CART FUNCTIONS =====
function quickAddToCart(productId) {
    addToCart(productId, 1);
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCartItems();
}

function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        saveCart();
        updateCartCount();
        displayCartItems();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// ===== CART MODAL =====
function openCartModal() {
    displayCartItems();
    cartModal.style.display = 'block';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <p style="font-size: 14px; margin-top: 10px;">Add items from our catalog to get started!</p>
            </div>
        `;
        updateCartTotal();
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; margin-right: 15px;">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} each</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})" style="background: #e5e7eb; border: none; padding: 5px 8px; cursor: pointer; border-radius: 4px;">-</button>
                <input type="number" value="${item.quantity}" onchange="updateCartItemQuantity(${item.id}, this.value)" min="1">
                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})" style="background: #e5e7eb; border: none; padding: 5px 8px; cursor: pointer; border-radius: 4px;">+</button>
            </div>
            <div class="cart-item-total">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    updateCartTotal();
}

function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('tax').textContent = `₹${tax.toLocaleString('en-IN')}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString('en-IN')}`;
}

// ===== SEARCH AND FILTER =====
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    filteredProducts = products.filter(product => {
        const matchesSearch = !searchTerm || 
                            product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        return matchesSearch;
    });
    
    applyFilters();
}

function applyFilters() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    
    let result = [...filteredProducts];
    
    // Apply category filter
    if (category) {
        result = result.filter(product => product.category === category);
    }
    
    // Apply price filter
    if (priceRange) {
        result = result.filter(product => {
            switch (priceRange) {
                case '0-10000':
                    return product.price >= 0 && product.price <= 10000;
                case '10000-50000':
                    return product.price > 10000 && product.price <= 50000;
                case '50000-100000':
                    return product.price > 50000 && product.price <= 100000;
                case '100000+':
                    return product.price > 100000;
                default:
                    return true;
            }
        });
    }
    
    displayProducts(result);
}

// ===== CHECKOUT =====
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1;
    
    alert(`Thank you for your purchase!\n\nOrder Total: ₹${total.toLocaleString('en-IN')}\n\nYour order has been placed successfully.\nYou will receive a confirmation email shortly.`);
    
    cart = [];
    saveCart();
    updateCartCount();
    closeCartModal();
    displayProducts(products);
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ===== ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== UTILITY FUNCTIONS =====
console.log('E-Commerce Application Loaded Successfully!');
console.log(`Total Products: ${products.length}`);
