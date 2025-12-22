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

});
