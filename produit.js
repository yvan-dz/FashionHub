// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
});

// Custom cursor
document.body.style.cursor = 'url(https://cdn.iconscout.com/icon/free/png-256/hand-pointer-cursor-1781500-1511434.png), auto';

// Filter and transition effects
document.addEventListener("DOMContentLoaded", function() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const sizeFilter = document.getElementById('sizeFilter');
    const clearFilter = document.getElementById('clearFilter');
    const productList = document.querySelector('.product-list');
    let products = [];

    // Fetch products from produit.json
    fetch('produit.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts('chemises');
            populateSizeFilter('chemises');
        });

    // Populate size filter based on selected category
    function populateSizeFilter(category) {
        sizeFilter.innerHTML = '';
        if (category === 'chaussures') {
            for (let size = 39; size <= 46; size++) {
                const sizeOption = document.createElement('div');
                sizeOption.innerHTML = `<input type="checkbox" value="${size}" class="size-filter"> ${size}`;
                sizeFilter.appendChild(sizeOption);
            }
        } else {
            ['XS', 'S', 'M', 'L', 'XL', 'XXL'].forEach(size => {
                const sizeOption = document.createElement('div');
                sizeOption.innerHTML = `<input type="checkbox" value="${size}" class="size-filter"> ${size}`;
                sizeFilter.appendChild(sizeOption);
            });
        }

        // Add event listeners to size filters
        document.querySelectorAll('.size-filter').forEach(filter => {
            filter.addEventListener('change', () => {
                productList.style.opacity = 0;
                setTimeout(() => {
                    filterProducts();
                    productList.style.opacity = 1;
                }, 300);
            });
        });
    }

    // Smooth transition for category filter
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            const category = filter.dataset.category;
            populateSizeFilter(category);
            productList.style.opacity = 0;
            setTimeout(() => {
                displayProducts(category);
                productList.style.opacity = 1;
            }, 300);
        });
    });

    // Toggle filter visibility for sections with a flèche
    document.querySelectorAll('.filter-group h5').forEach(header => {
        if (header.id !== 'priceHeader') {
            const icon = document.createElement('img');
            icon.src = 'https://static.vecteezy.com/system/resources/previews/006/827/566/non_2x/down-arrow-icon-sign-symbol-logo-vector.jpg';
            icon.alt = 'Toggle';
            header.appendChild(icon);
        }

        header.addEventListener('click', () => {
            const filterGroup = header.parentElement;
            const filterList = filterGroup.querySelector('ul') || filterGroup.querySelector('div');
            if (filterList) {
                filterList.classList.toggle('show');
                filterGroup.classList.toggle('collapsed');
            }
        });
    });

    // Specific handler for price range without adding a flèche
    document.getElementById('priceHeader').addEventListener('click', () => {
        const filterGroup = document.getElementById('priceHeader').parentElement;
        const filterList = filterGroup.querySelector('ul') || filterGroup.querySelector('div');
        if (filterList) {
            filterList.classList.toggle('show');
            filterGroup.classList.toggle('collapsed');
        }
    });

    // Display products based on category
    function displayProducts(category) {
        productList.innerHTML = '';
        const filteredProducts = products.filter(product => product.category === category);
        filteredProducts.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.sizes = product.sizes.join(',');
            productCard.style.opacity = 0;
            productCard.style.transition = `opacity 0.6s ease ${index * 0.2}s`; // Staggered transition
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}€</p>
                <button class="btn btn-outline-primary">Ajouter au panier</button>
            `;
            productList.appendChild(productCard);
            setTimeout(() => {
                productCard.style.opacity = 1;
            }, 50); // Slight delay to trigger transition
        });
        filterProducts();
    }

    // Update price range display
    priceRange.addEventListener('input', () => {
        priceValue.textContent = `0€ - ${priceRange.value}€`;
        productList.style.opacity = 0;
        setTimeout(() => {
            filterProducts();
            productList.style.opacity = 1;
        }, 300);
    });

    // Clear filters
    clearFilter.addEventListener('click', () => {
        priceRange.value = 200;
        priceValue.textContent = '0€ - 200€';
        sizeFilter.innerHTML = '';
        populateSizeFilter('chemises');
        productList.style.opacity = 0;
        setTimeout(() => {
            displayProducts('chemises');
            productList.style.opacity = 1;
        }, 300);
    });

    // Filter products based on selected criteria
    function filterProducts() {
        const maxPrice = priceRange.value;
        const selectedSizes = Array.from(sizeFilter.querySelectorAll('input:checked')).map(input => input.value);
        const products = productList.querySelectorAll('.product-card');

        products.forEach(product => {
            const price = parseInt(product.querySelector('.price').textContent.replace('€', ''));
            const sizes = product.dataset.sizes.split(',');
            const matchesPrice = price <= maxPrice;
            const matchesSize = selectedSizes.length === 0 || selectedSizes.some(size => sizes.includes(size));
            if (matchesPrice && matchesSize) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
});
