document.addEventListener('DOMContentLoaded', function () {
    const categories = ['pantalons', 'chaussures', 't-shirts', 'chemises', 'hoodies'];
    let galleryData = {};

    // Fetch gallery data
    fetch('galerie.json')
        .then(response => response.json())
        .then(data => {
            galleryData = data;
            categories.forEach(category => {
                createGallerySection(category);
                populateCarousel(category);
                populateModal(category);
            });
            applyAnimations();
        });

    // Create gallery section
    function createGallerySection(category) {
        const gallerySections = document.getElementById('gallerySections');
        const section = document.createElement('div');
        section.className = 'gallery-section';
        section.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div id="${category}Carousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" id="${category}CarouselInner"></div>
                <a class="carousel-control-prev" href="#${category}Carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#${category}Carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <button class="btn btn-primary mt-3" data-toggle="modal" data-target="#${category}Modal">Voir plus</button>
        `;
        gallerySections.appendChild(section);
    }

    // Populate carousel with images
    function populateCarousel(category) {
        const carouselInner = document.getElementById(`${category}CarouselInner`);
        const images = galleryData[category];
        if (!carouselInner || !images) return;

        for (let i = 0; i < images.length; i += 3) {
            const itemDiv = document.createElement('div');
            itemDiv.className = `carousel-item ${i === 0 ? 'active' : ''}`;
            itemDiv.innerHTML = `
                <div class="row">
                    ${images.slice(i, i + 3).map(image => `
                        <div class="col-4">
                            <div class="img-container">
                                <img src="${image}" class="d-block w-100" alt="${category} image">
                                <div class="overlay">
                                    <div class="text">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            carouselInner.appendChild(itemDiv);
        }
    }

    // Populate modal with images
    function populateModal(category) {
        const modalsContainer = document.getElementById('modalsContainer');
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = `${category}Modal`;
        modal.tabIndex = -1;
        modal.role = 'dialog';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row" id="${category}ModalBody"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        modalsContainer.appendChild(modal);

        const modalBody = document.getElementById(`${category}ModalBody`);
        const images = galleryData[category];
        if (!modalBody || !images) return;

        images.forEach(image => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-4 mb-3';
            colDiv.innerHTML = `
                <div class="img-container">
                    <img src="${image}" class="img-fluid" alt="${category} image">
                    <div class="overlay">
                        <div class="text">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                    </div>
                </div>
            `;
            modalBody.appendChild(colDiv);
        });

        // Event listener for image click to show in full screen
        modalBody.querySelectorAll('.img-container').forEach(container => {
            container.addEventListener('click', function () {
                const imgSrc = this.querySelector('img').src;
                const fullScreenModal = document.createElement('div');
                fullScreenModal.className = 'modal fade';
                fullScreenModal.id = 'fullScreenModal';
                fullScreenModal.tabIndex = -1;
                fullScreenModal.role = 'dialog';
                fullScreenModal.innerHTML = `
                    <div class="modal-dialog modal-fullscreen" role="document" style="max-width: 100vw; max-height: 100vh;">
                        <div class="modal-content" style="height: 100vh;">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body d-flex justify-content-center align-items-center" style="height: 90%; padding: 0;">
                                <img src="${imgSrc}" class="img-fluid full-screen-image" style="max-height: 100%; max-width: 100%; object-fit: contain;" alt="Full screen image">
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(fullScreenModal);
                $('#fullScreenModal').modal('show');
                $('#fullScreenModal').on('hidden.bs.modal', function () {
                    document.body.removeChild(fullScreenModal);
                });
            });
        });
    }

    // Apply animations to gallery sections
    function applyAnimations() {
        const sections = document.querySelectorAll('.gallery-section');
        sections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.2}s`;
            section.classList.add('animate__animated', 'animate__fadeInUp');
        });
    }
});
