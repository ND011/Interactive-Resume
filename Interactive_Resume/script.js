document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Skill Bar Animation on Scroll
    const skillsSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-bar .bar span');

    function showProgress() {
        skillBars.forEach(progressBar => {
            const value = progressBar.parentElement.parentElement.getAttribute('data-percentage');
            progressBar.style.width = value;
            progressBar.style.opacity = 1;
        });
    }

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showProgress();
            }
        });
    }, {
        threshold: 0.2
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }


    // Active Section Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Dynamic coloring for specific skill bars
    // Matching the classes used in index.html: .python, .dl, .web, .cpp
    const colors = {
        'python': '#3776ab', // Python Blue
        'dl': '#ee4c2c',     // PyTorch/TF Orange-Red
        'web': '#61dafb',    // React Blue
        'cpp': '#00599c'     // C++ Blue
    };

    document.querySelectorAll('.skill-bar .bar span').forEach(span => {
        // span.className might contain multiple classes, but here we just have one usually
        // Let's iterate keys and check if classList contains it
        for (const [key, color] of Object.entries(colors)) {
            if (span.classList.contains(key)) {
                span.style.backgroundColor = color;
            }
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    // PLACEHOLDER: Replace with your actual Web App URL from Google Apps Script
    // Example: https://script.google.com/macros/s/AKfycbx.../exec
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwyiZg1iJRm5x2mJQqzNztJj9TQAatwda-PZ2u68kzQtl8_0H45rsdFMkY__-B0x_U0/exec'; 

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Check if URL is configured
            if (GOOGLE_SCRIPT_URL === 'INSERT_WEB_APP_URL_HERE' || GOOGLE_SCRIPT_URL === '') {
                 formStatus.style.display = 'block';
                 formStatus.style.color = 'red';
                 formStatus.textContent = 'Error: Script URL not configured. Please see the setup guide.';
                 return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            formStatus.style.display = 'none';

            const formData = new FormData(contactForm);
            // Convert to URL parameters for the GET/POST request (Apps Script handles POST simply)
            // Or typically we send as application/x-www-form-urlencoded or JSON if the script supports it.
            // A simple way for Apps Script:
            
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // IMPORTANT: Bypass CORS restrictions
                body: formData
            })
            .then(() => {
                // In 'no-cors' mode, we cannot read the response status or data. 
                // We assume if the promise resolves, the request was sent.
                formStatus.style.display = 'block';
                formStatus.style.color = 'green';
                formStatus.textContent = 'Message sent successfully!';
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error!', error);
                formStatus.style.display = 'block';
                formStatus.style.color = 'red';
                formStatus.textContent = 'Failed to send. Please check your internet or try again.';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            });
        });
    }

});
