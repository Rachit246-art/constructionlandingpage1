document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const header = document.getElementById('mainHeader');
    const popupOverlay = document.getElementById('contactPopup');
    const openPopupBtn = document.getElementById('openPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const premiumInquiry = document.getElementById('premiumInquiry');
    const contactForm = document.getElementById('contactForm');

    // --- Header Scroll Effect ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Popup Logic ---
    if (popupOverlay) {
        // Show popup after 2 seconds for visibility on every load for now
        setTimeout(() => {
            popupOverlay.style.display = 'flex';
        }, 2000);

        if (openPopupBtn) {
            openPopupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                popupOverlay.style.display = 'flex';
            });
        }

        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', () => {
                popupOverlay.style.display = 'none';
            });
        }

        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    }

    // --- Form Submissions ---
    if (premiumInquiry) {
        premiumInquiry.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your premium inquiry has been received. A SKYGATES consultant will contact you within 24 hours.');
            popupOverlay.style.display = 'none';
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully. Thank you for reaching out to SKYGATES.');
            contactForm.reset();
        });
    }

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200;
        const runCounter = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target + (target === 100 ? '%' : '+');
                    }
                };
                updateCount();
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats');
        if (statsSection) observer.observe(statsSection);
    }
});
