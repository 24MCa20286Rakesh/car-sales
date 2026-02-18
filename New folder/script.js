/* ========================================
   Car Marketplace - JavaScript
   ======================================== */

// Sample car data for initial listings
const sampleCars = [
    {
        id: 1,
        name: "Toyota Camry 2023",
        price: 28500,
        location: "New York, NY",
        description: "Excellent condition Toyota Camry with full service history. Single owner, low mileage. Features include leather seats, sunroof, and advanced safety features.",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
        featured: true,
        year: 2023,
        mileage: "15,000 miles",
        fuel: "Petrol"
    },
    {
        id: 2,
        name: "Honda Civic 2022",
        price: 22000,
        location: "Los Angeles, CA",
        description: "Well-maintained Honda Civic in pristine condition. Fuel efficient and great for daily commute. Features include Apple CarPlay, Android Auto, and backup camera.",
        image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=600&h=400&fit=crop",
        featured: false,
        year: 2022,
        mileage: "25,000 miles",
        fuel: "Petrol"
    },
    {
        id: 3,
        name: "BMW 3 Series 2021",
        price: 35000,
        location: "Miami, FL",
        description: "Luxury BMW 3 Series in excellent condition. Sport package with premium interior. Features include navigation, heated seats, and parking sensors.",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
        featured: true,
        year: 2021,
        mileage: "30,000 miles",
        fuel: "Petrol"
    },
    {
        id: 4,
        name: "Tesla Model 3 2023",
        price: 42000,
        location: "San Francisco, CA",
        description: "Latest Tesla Model 3 with full self-driving capability. Low mileage and excellent condition. Includes free supercharging for life.",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop",
        featured: true,
        year: 2023,
        mileage: "10,000 miles",
        fuel: "Electric"
    },
    {
        id: 5,
        name: "Mercedes C-Class 2020",
        price: 31000,
        location: "Chicago, IL",
        description: "Elegant Mercedes C-Class with premium package. Excellent interior and smooth driving experience. Features include ambient lighting and premium sound system.",
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop",
        featured: false,
        year: 2020,
        mileage: "40,000 miles",
        fuel: "Petrol"
    },
    {
        id: 6,
        name: "Ford Mustang 2022",
        price: 38000,
        location: "Dallas, TX",
        description: "Powerful Ford Mustang GT with performance exhaust. Great sound and performance. Features include track apps and Brembo brakes.",
        image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600&h=400&fit=crop",
        featured: false,
        year: 2022,
        mileage: "20,000 miles",
        fuel: "Petrol"
    }
];

// ========================================
// Utility Functions
// ========================================

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
function formatPrice(price) {
    return '$' + price.toLocaleString('en-US');
}

/**
 * Generate unique ID for new listings
 * @returns {number} Unique ID
 */
function generateId() {
    return Date.now();
}

// ========================================
// localStorage Functions
// ========================================

/**
 * Get cars from localStorage
 * @returns {Array} Array of car objects
 */
function getCars() {
    const cars = localStorage.getItem('cars');
    if (cars) {
        return JSON.parse(cars);
    }
    // Initialize with sample data if no cars exist
    saveCars(sampleCars);
    return sampleCars;
}

/**
 * Save cars to localStorage
 * @param {Array} cars - Array of car objects
 */
function saveCars(cars) {
    localStorage.setItem('cars', JSON.stringify(cars));
}

/**
 * Add a new car to localStorage
 * @param {Object} car - Car object to add
 */
function addCar(car) {
    const cars = getCars();
    car.id = generateId();
    car.featured = false;
    cars.unshift(car); // Add to beginning of array
    saveCars(cars);
}

/**
 * Get a single car by ID
 * @param {number} id - Car ID
 * @returns {Object|null} Car object or null if not found
 */
function getCarById(id) {
    const cars = getCars();
    return cars.find(car => car.id === parseInt(id)) || null;
}

/**
 * Delete a car by ID
 * @param {number} id - Car ID to delete
 */
function deleteCar(id) {
    let cars = getCars();
    cars = cars.filter(car => car.id !== parseInt(id));
    saveCars(cars);
}

// ========================================
// UI Rendering Functions
// ========================================

/**
 * Render car cards to the DOM
 * @param {Array} cars - Array of car objects to render
 */
function renderCarListings(cars) {
    const container = document.getElementById('carListings');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    if (cars.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🚗</div>
                <h3>No cars found</h3>
                <p>Try adjusting your search or browse all listings</p>
            </div>
        `;
        return;
    }

    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${cars.length} car${cars.length !== 1 ? 's' : ''} found`;
    }

    // Render each car card
    cars.forEach((car, index) => {
        const card = createCarCard(car, index);
        container.appendChild(card);
    });
}

/**
 * Create HTML element for a car card
 * @param {Object} car - Car object
 * @param {number} index - Index for animation delay
 * @returns {HTMLElement} Car card element
 */
function createCarCard(car, index = 0) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="car-card-image">
            <img src="${car.image}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
            ${car.featured ? '<span class="car-card-featured">Featured</span>' : ''}
            <button class="car-card-favorite" onclick="toggleFavorite(event, ${car.id})" title="Add to favorites">
                ♡
            </button>
        </div>
        <div class="car-card-content">
            <div class="car-card-price">${formatPrice(car.price)}</div>
            <h3 class="car-card-title">${car.name}</h3>
            <div class="car-card-details">
                ${car.year ? `<span class="car-card-detail">📅 ${car.year}</span>` : ''}
                ${car.mileage ? `<span class="car-card-detail">📊 ${car.mileage}</span>` : ''}
                ${car.fuel ? `<span class="car-card-detail">⛽ ${car.fuel}</span>` : ''}
            </div>
            <div class="car-card-location">
                📍 ${car.location}
            </div>
            <a href="details.html?id=${car.id}" class="car-card-btn">View Details</a>
        </div>
    `;

    // Add click event to navigate to details page
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('car-card-favorite') && 
            !e.target.classList.contains('car-card-btn')) {
            window.location.href = `details.html?id=${car.id}`;
        }
    });

    return card;
}

/**
 * Toggle favorite status
 * @param {Event} event - Click event
 * @param {number} carId - Car ID
 */
function toggleFavorite(event, carId) {
    event.stopPropagation();
    const btn = event.target;
    if (btn.textContent === '♡') {
        btn.textContent = '❤️';
    } else {
        btn.textContent = '♡';
    }
}

// ========================================
// Search & Filter Functions
// ========================================

/**
 * Filter cars based on search query
 * @param {string} query - Search query
 */
function filterCars(query) {
    const cars = getCars();
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        renderCarListings(cars);
        return;
    }

    const filteredCars = cars.filter(car => {
        return car.name.toLowerCase().includes(searchTerm) ||
               car.location.toLowerCase().includes(searchTerm) ||
               car.description.toLowerCase().includes(searchTerm);
    });

    renderCarListings(filteredCars);
}

// ========================================
// Form Validation
// ========================================

/**
 * Validate sell car form
 * @param {HTMLFormElement} form - Form element
 * @returns {Object} Validation result with isValid and errors
 */
function validateCarForm(form) {
    const errors = {};
    
    // Get form fields
    const name = form.querySelector('#carName')?.value.trim() || '';
    const price = form.querySelector('#carPrice')?.value.trim() || '';
    const location = form.querySelector('#carLocation')?.value.trim() || '';
    const description = form.querySelector('#carDescription')?.value.trim() || '';
    const image = form.querySelector('#carImage')?.value.trim() || '';

    // Validate car name
    if (!name) {
        errors.carName = 'Car name is required';
    } else if (name.length < 3) {
        errors.carName = 'Car name must be at least 3 characters';
    }

    // Validate price
    if (!price) {
        errors.carPrice = 'Price is required';
    } else if (isNaN(price) || parseFloat(price) <= 0) {
        errors.carPrice = 'Please enter a valid price';
    }

    // Validate location
    if (!location) {
        errors.carLocation = 'Location is required';
    }

    // Validate description
    if (!description) {
        errors.carDescription = 'Description is required';
    } else if (description.length < 10) {
        errors.carDescription = 'Description must be at least 10 characters';
    }

    // Image URL is optional but validate if provided
    if (image && !isValidUrl(image)) {
        errors.carImage = 'Please enter a valid image URL';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Validate login form
 * @param {HTMLFormElement} form - Form element
 * @returns {Object} Validation result
 */
function validateLoginForm(form) {
    const errors = {};
    
    const email = form.querySelector('#email')?.value.trim() || '';
    const password = form.querySelector('#password')?.value.trim() || '';

    // Validate email
    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email';
    }

    // Validate password
    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Display form errors
 * @param {Object} errors - Error object
 */
function displayFormErrors(errors) {
    // Remove existing error messages
    document.querySelectorAll('.form-error-message').forEach(el => el.remove());
    document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));

    // Add error messages
    Object.keys(errors).forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input) {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('error');
                const errorSpan = document.createElement('span');
                errorSpan.className = 'form-error-message';
                errorSpan.textContent = errors[fieldId];
                formGroup.appendChild(errorSpan);
            }
        }
    });
}

/**
 * Clear form errors
 */
function clearFormErrors() {
    document.querySelectorAll('.form-error-message').forEach(el => el.remove());
    document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
}

// ========================================
// Page Initialization
// ========================================

/**
 * Initialize home page
 */
function initHomePage() {
    // Load and display cars
    const cars = getCars();
    renderCarListings(cars);

    // Setup search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                filterCars(e.target.value);
            }, 300);
        });
    }
}

/**
 * Initialize sell page
 */
function initSellPage() {
    const form = document.getElementById('sellCarForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearFormErrors();

        // Validate form
        const validation = validateCarForm(form);
        
        if (!validation.isValid) {
            displayFormErrors(validation.errors);
            return;
        }

        // Get form values
        const car = {
            name: form.querySelector('#carName').value.trim(),
            price: parseFloat(form.querySelector('#carPrice').value.trim()),
            location: form.querySelector('#carLocation').value.trim(),
            description: form.querySelector('#carDescription').value.trim(),
            image: form.querySelector('#carImage').value.trim() || 'https://via.placeholder.com/600x400?text=No+Image',
            year: form.querySelector('#carYear')?.value.trim() || '',
            mileage: form.querySelector('#carMileage')?.value.trim() || '',
            fuel: form.querySelector('#carFuel')?.value.trim() || ''
        };

        // Save car to localStorage
        addCar(car);

        // Show success message and redirect
        alert('Car listed successfully! Redirecting to home page...');
        window.location.href = 'index.html';
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const validation = validateCarForm(form);
            const fieldId = input.id;
            if (validation.errors[fieldId]) {
                const formGroup = input.closest('.form-group');
                formGroup.classList.add('error');
                // Remove existing error
                const existingError = formGroup.querySelector('.form-error-message');
                if (existingError) existingError.remove();
                // Add new error
                const errorSpan = document.createElement('span');
                errorSpan.className = 'form-error-message';
                errorSpan.textContent = validation.errors[fieldId];
                formGroup.appendChild(errorSpan);
            } else {
                const formGroup = input.closest('.form-group');
                if (formGroup) formGroup.classList.remove('error');
            }
        });
    });
}

/**
 * Initialize details page
 */
function initDetailsPage() {
    // Get car ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) {
        showErrorAndRedirect('Car not found');
        return;
    }

    // Get car data
    const car = getCarById(carId);
    if (!car) {
        showErrorAndRedirect('Car not found');
        return;
    }

    // Render car details
    renderCarDetails(car);
}

/**
 * Render car details to the page
 * @param {Object} car - Car object
 */
function renderCarDetails(car) {
    // Update page title
    document.title = `${car.name} - Car Marketplace`;

    // Update image
    const imageEl = document.getElementById('carImage');
    if (imageEl) {
        imageEl.src = car.image;
        imageEl.alt = car.name;
        imageEl.onerror = () => { imageEl.src = 'https://via.placeholder.com/600x400?text=No+Image'; };
    }

    // Update content
    updateElement('carPrice', formatPrice(car.price));
    updateElement('carName', car.name);
    updateElement('carLocation', `📍 ${car.location}`);
    updateElement('carDescription', car.description);

    // Update additional info
    if (car.year) updateElement('carYear', car.year);
    if (car.mileage) updateElement('carMileage', car.mileage);
    if (car.fuel) updateElement('carFuel', car.fuel);
}

/**
 * Helper to update element text content
 * @param {string} id - Element ID
 * @param {string} value - Value to set
 */
function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

/**
 * Show error and redirect to home
 * @param {string} message - Error message
 */
function showErrorAndRedirect(message) {
    alert(message);
    window.location.href = 'index.html';
}

/**
 * Initialize login page
 */
function initLoginPage() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearFormErrors();

        // Validate form
        const validation = validateLoginForm(form);
        
        if (!validation.isValid) {
            displayFormErrors(validation.errors);
            return;
        }

        // Simulate login (in real app, this would authenticate with backend)
        const email = form.querySelector('#email').value.trim();
        alert(`Login successful! Welcome, ${email}`);
        
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        // Redirect to home
        window.location.href = 'index.html';
    });

    // Real-time validation
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (emailInput) {
        emailInput.addEventListener('blur', () => validateField('email', emailInput.value));
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', () => validateField('password', passwordInput.value));
    }
}

/**
 * Validate single field
 * @param {string} fieldId - Field ID
 * @param {string} value - Field value
 */
function validateField(fieldId, value) {
    const validation = validateLoginForm(document.getElementById('loginForm'));
    const input = document.getElementById(fieldId);
    
    if (!input) return;

    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    if (validation.errors[fieldId]) {
        formGroup.classList.add('error');
        let errorSpan = formGroup.querySelector('.form-error-message');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'form-error-message';
            formGroup.appendChild(errorSpan);
        }
        errorSpan.textContent = validation.errors[fieldId];
    } else {
        formGroup.classList.remove('error');
    }
}

// ========================================
// Mobile Menu Functions
// ========================================

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navbarLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// ========================================
// Initialize on DOM Ready
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu on all pages
    initMobileMenu();

    // Initialize page-specific functionality
    const pageId = document.body.id;
    
    switch (pageId) {
        case 'home-page':
            initHomePage();
            break;
        case 'sell-page':
            initSellPage();
            break;
        case 'details-page':
            initDetailsPage();
            break;
        case 'login-page':
            initLoginPage();
            break;
        // About page doesn't need JavaScript initialization
    }
});

// ========================================
// Global Functions (accessible from HTML)
// ========================================

// Make these functions available globally for onclick handlers
window.toggleFavorite = toggleFavorite;
window.filterCars = filterCars;
