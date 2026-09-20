document.addEventListener('DOMContentLoaded', () => {
    // Lightbox image initialization (ensures DOM is fully loaded)
    const images = document.querySelectorAll('main img');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('lightbox-modal');

            const fullImg = document.createElement('img');
            fullImg.src = img.src;
            fullImg.alt = img.alt || 'Full View';

            modal.appendChild(fullImg);
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            modal.addEventListener('click', () => {
                modal.remove();
                document.body.style.overflow = 'auto';
            });
        });
    });
});

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.classList.toggle('nav-open');
    }
}

// Enquiry Form: Validation & Calculator
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('enquiry-name');
        const emailInput = document.getElementById('enquiry-email');
        const serviceSelect = document.getElementById('service-type');
        const sizeInput = document.getElementById('project-size');
        const resultBox = document.getElementById('enquiryResult');
        const resultText = document.getElementById('resultText');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const rate = serviceSelect ? parseFloat(serviceSelect.value) : NaN;
        const size = sizeInput ? parseFloat(sizeInput.value) : NaN;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            showError('enquiry-name-error', 'Please enter your full name.');
            return;
        }

        if (!emailPattern.test(email)) {
            showError('enquiry-email-error', 'Please enter a valid email address.');
            return;
        }

        if (isNaN(rate) || rate <= 0) {
            showError('service-type-error', 'Please select a service from the dropdown.');
            return;
        }

        if (isNaN(size) || size <= 0) {
            showError('project-size-error', 'Please enter a valid area size in m².');
            return;
        }

        // Calculation with South African Rand formatting
        const totalCost = rate * size;
        const formattedCost = totalCost.toLocaleString('en-ZA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Safe DOM insertion preventing XSS vulnerabilities
        if (resultText) {
            resultText.textContent = `Thank you ${name}! Estimated Cost for ${size} m² is: R ${formattedCost}`;
        }

        if (resultBox) {
            resultBox.style.display = 'block';
        }
    });
}

// Contact Form: JS Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        clearErrors();

        const name = document.getElementById('contactName')?.value.trim() || '';
        const email = document.getElementById('contactEmail')?.value.trim() || '';
        const phone = document.getElementById('contactPhone')?.value.trim() || '';
        const subject = document.getElementById('contactSubject')?.value.trim() || '';
        const message = document.getElementById('contactMessage')?.value.trim() || '';

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^(\+27|0)\d{9}$/;

        let isValid = true;

        if (!name) {
            showError('nameError', 'Please enter your name.');
            isValid = false;
        }

        if (!emailPattern.test(email)) {
            showError('emailError', 'Please enter a valid email address.');
            isValid = false;
        }

        if (!phonePattern.test(phone)) {
            showError('phoneError', 'Please enter a valid 10-digit phone number (e.g., 0811234567).');
            isValid = false;
        }

        if (!subject) {
            showError('subjectError', 'Please enter a subject.');
            isValid = false;
        }

        if (!message) {
            showError('messageError', 'Please enter your message.');
            isValid = false;
        }

        if (isValid) {
            const formStatus = document.querySelector('.form-status');
            if (formStatus) {
                formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                formStatus.className = 'form-status success';
            } else {
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
            }
            contactForm.reset();
        }
    });
}

// Portfolio Category Filtering
function filterPortfolio(category, event) {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Handle button active state toggles
    if (event && event.target) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}

// Image Comparison Slider
const slider = document.getElementById('slider');
const afterWrapper = document.getElementById('afterWrapper');
if (slider && afterWrapper) {
    slider.addEventListener('input', function (e) {
        afterWrapper.style.width = `${e.target.value}%`;
    });
}

// Helper Functions for Validation Errors
function showError(elementId, message) {
    const errorSpan = document.getElementById(elementId);
    if (errorSpan) {
        errorSpan.textContent = message;
    } else {
        alert(message);
    }
}

function clearErrors() {
    const errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(span => {
        span.textContent = '';
    });
}