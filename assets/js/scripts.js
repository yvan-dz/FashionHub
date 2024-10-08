// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
});

// Custom cursor
document.body.style.cursor = 'url(https://cdn.iconscout.com/icon/free/png-256/hand-pointer-cursor-1781500-1511434.png), auto';

// Hover effects for product cards
document.querySelectorAll('.product-card, .discount-card, .new-arrival-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Loader animation
document.addEventListener("DOMContentLoaded", function() {
    const loaderTitle = document.querySelector('.loader-title');
    loaderTitle.innerHTML = loaderTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.loader-title .letter',
            translateY: [-100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutBounce",
            duration: 1400,
            delay: (el, i) => 300 + 30 * i
        }).add({
            targets: '.loader',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        }).add({
            targets: '.loader',
            complete: function() {
                document.querySelector('.loader').style.display = 'none';
                document.getElementById("content").style.opacity = 0;
                document.getElementById("content").style.display = "block";
                anime({
                    targets: '#content',
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: 1500
                });
            }
        });
});





// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
});

// Custom cursor
document.body.style.cursor = 'url(https://cdn.iconscout.com/icon/free/png-256/hand-pointer-cursor-1781500-1511434.png), auto';

// Hover effects for product cards
document.querySelectorAll('.product-card, .discount-card, .new-arrival-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Loader animation
document.addEventListener("DOMContentLoaded", function() {
    const loaderTitle = document.querySelector('.loader-title');
    loaderTitle.innerHTML = loaderTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.loader-title .letter',
            translateY: [-100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutBounce",
            duration: 1400,
            delay: (el, i) => 300 + 30 * i
        }).add({
            targets: '.loader',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        }).add({
            targets: '.loader',
            complete: function() {
                document.querySelector('.loader').style.display = 'none';
                document.getElementById("content").style.opacity = 0;
                document.getElementById("content").style.display = "block";
                anime({
                    targets: '#content',
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: 1500
                });
            }
        });

    // Insert popup HTML via JavaScript
    document.body.insertAdjacentHTML('beforeend', `
        <div class="popup-overlay">
            <div class="popup">
                
        <p>Ceci n'est encore qu'une page de présentation. Pour des fonctionnalités et modifications selon vos besoins, veuillez contacter @yvan.dzefak sur Instagram. 🤗</p>
                <button class="close-btn">Fermer</button>
            </div>
        </div>
    `);

    // Popup functionality
    const popupOverlay = document.querySelector('.popup-overlay');
    const closeBtn = document.querySelector('.popup .close-btn');

    document.querySelectorAll('.product-card .btn, .discount-card .btn, .new-arrival-card .btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            popupOverlay.classList.add('show');
        });
    });

    closeBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('show');
    });
});
