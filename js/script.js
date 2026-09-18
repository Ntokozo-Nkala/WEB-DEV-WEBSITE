    const contactForm = document.querySelector('.contact-form');
    const enquiryForm = document.querySelector('.enquiry-form');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function handleFormSubmit(event, formType) {
        event.preventDefault(); 
        const form = event.target;
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        let isValid = true;
        if (name.length < 2) {
            alert("Please enter a valid name.");
            isValid = false;
        }
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            isValid = false;
        }
        if (message.length < 10) {
            alert("Your message must be at least 10 characters long.");
            isValid = false;
        }

        if (isValid) {
            console.log(`Submitting ${formType} form via AJAX...`);
            if (formType === 'contact') {
                const compiledEmail = `mailto:info@stonebridgeindustrialcontractors.co.za?subject=Contact from ${name}&body=${message}`;
                alert(`Thank you ${name}. Your message has been compiled. Opening your email client...`);
                window.location.href = compiledEmail;
            } 
            else if (formType === 'enquiry') {
                alert(`Thank you for your enquiry, ${name}. Based on standard processing, a consultant will review your request and provide a cost breakdown and timeline within 24-48 hours.`);
            }
            
            form.reset();
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
    }
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => handleFormSubmit(e, 'enquiry'));
    }


// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
filterBtns.forEach((btn) => {
btn.addEventListener('click', () => {
filterBtns.forEach((b) => b.classList.remove('active'));
btn.classList.add('active');
const filter = btn.dataset.filter;
portfolioCards.forEach((card) => {
if(filter === 'all' || card.dataset.category === filter){
card.classList.remove('hidden');
} else {
card.classList.add('hidden');
}
});
});
});