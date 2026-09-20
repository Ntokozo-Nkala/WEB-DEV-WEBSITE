document.addEventListener('DOMContentLoaded', () => {
    // Lightbox Image Modal
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

    // Clear error highlights & reset green block when typing in contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const outerSection = document.getElementById('contactSection') || contactForm.closest('.contact');
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('input-error');
                
                const errorSpan = document.getElementById(input.id.replace('Input', 'Error')) || document.getElementById(input.id + 'Error');
                if (errorSpan) errorSpan.textContent = '';

                if (outerSection) {
                    outerSection.classList.remove('outer-block-success');
                }
            });
        });
    }
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
            showError('enquiry-name-error', 'Please enter your full name.', nameInput);
            return;
        }

        if (!emailPattern.test(email)) {
            showError('enquiry-email-error', 'Please enter a valid email address.', emailInput);
            return;
        }

        if (isNaN(rate) || rate <= 0) {
            showError('service-type-error', 'Please select a service from the dropdown.', serviceSelect);
            return;
        }

        if (isNaN(size) || size <= 0) {
            showError('project-size-error', 'Please enter a valid area size in m².', sizeInput);
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

// Contact Form: JS Validation, Security & Green Outer Block Success State
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        clearErrors();

        const outerSection = document.getElementById('contactSection') || contactForm.closest('.contact');
        if (outerSection) outerSection.classList.remove('outer-block-success');

        // Handles both nameInput and contactName element IDs automatically
        const nameEl = document.getElementById('nameInput') || document.getElementById('contactName');
        const emailEl = document.getElementById('emailInput') || document.getElementById('contactEmail');
        const phoneEl = document.getElementById('phoneInput') || document.getElementById('contactPhone');
        const subjectEl = document.getElementById('subjectInput') || document.getElementById('contactSubject');
        const messageEl = document.getElementById('messageInput') || document.getElementById('contactMessage');

        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const phone = phoneEl ? phoneEl.value.trim() : '';
        const subject = subjectEl ? subjectEl.value.trim() : '';
        const message = messageEl ? messageEl.value.trim() : '';

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^(\+27|0)\d{9}$/;

        let isValid = true;

        if (!name) {
            showError('nameError', 'Please enter your name.', nameEl);
            isValid = false;
        }

        if (!emailPattern.test(email)) {
            showError('emailError', 'Please enter a valid email address.', emailEl);
            isValid = false;
        }

        if (!phonePattern.test(phone)) {
            showError('phoneError', 'Please enter a valid 10-digit phone number (e.g., 0811234567).', phoneEl);
            isValid = false;
        }

        if (!subject) {
            showError('subjectError', 'Please enter a subject.', subjectEl);
            isValid = false;
        }

        if (!message) {
            showError('messageError', 'Please enter your message.', messageEl);
            isValid = false;
        }

        if (isValid) {
            // Apply green success background to the outer block
            if (outerSection) {
                outerSection.classList.add('outer-block-success');
            }

            const formStatus = document.getElementById('formStatus') || document.querySelector('.form-status');
            const submitBtn = document.getElementById('sendEmailBtn') || contactForm.querySelector('button[type="submit"]');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending Email...';
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }

                // Render explicit Email Sent Success banner
                if (formStatus) {
                    formStatus.style.display = 'block';
                    formStatus.className = 'form-status success-box';
                    formStatus.innerHTML = `
                        <strong>Email Sent Successfully!</strong><br>
                        Thank you, <em>${escapeHTML(name)}</em>. Your message has been sent and we will respond to you via email as soon as possible.
                    `;
                }

                contactForm.reset();
            }, 1000);
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

let activeCategory = 'all';

function filterPortfolio(category, event) {
    activeCategory = category;
    
    if (event && event.target) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    searchPortfolio();
}

function searchPortfolio() {
    const searchInput = document.getElementById('portfolioSearch');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const cards = document.querySelectorAll('.portfolio-card');

    cards.forEach(card => {
        const matchesCategory = activeCategory === 'all' || card.classList.contains(activeCategory);
        const titleText = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const matchesSearch = titleText.includes(query);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Image Comparison Slider
const slider = document.getElementById('slider');
const afterWrapper = document.getElementById('afterWrapper');
if (slider && afterWrapper) {
    slider.addEventListener('input', function (e) {
        afterWrapper.style.width = `${e.target.value}%`;
    });
}

// Helper Functions for Validation Errors & Sanitization
function showError(elementId, message, inputElement) {
    const errorSpan = document.getElementById(elementId);
    if (errorSpan) {
        errorSpan.textContent = message;
    }
    if (inputElement) {
        inputElement.classList.add('input-error');
    }
}

function clearErrors() {
    const errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(span => {
        span.textContent = '';
    });
    const inputs = document.querySelectorAll('.input-error');
    inputs.forEach(input => {
        input.classList.remove('input-error');
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}