// Main JavaScript file - Loads all modules


// Loading Animation
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);

    // Initialize animations after loading
    setTimeout(initAnimations, 500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Interactive cursor effects
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .case-study-card, .project-card, .form-input');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', function() {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Parallax effect for shapes
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = index === 0 ? 0.3 : 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Scroll Animation for Elements
function initAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .case-study-card, .project-card, .stat-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Global sendMail function
function sendMail() {
    const contactForm = document.querySelector('.contact-form');
    const submitButton = contactForm.querySelector('.cta-button');
    const originalText = submitButton.innerHTML;
    
    // Get form values
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };
    
    // Validate fields
    if (!parms.name || !parms.email || !parms.subject || !parms.message) {
        alert("Please fill in all fields!");
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.style.opacity = '0.7';
    submitButton.disabled = true;
    
    // Send email using EmailJS
    emailjs.send("service_rwo3ohh", "template_st8t4yk", parms)
        .then(function(response) {
            // Success
            console.log('Email sent successfully!', response.status, response.text);
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)';
            
            // Show success notification
            alert("Email sent successfully!");
            
            // Reset form after delay
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.opacity = '1';
                submitButton.disabled = false;
                submitButton.style.background = '';
                contactForm.reset();
            }, 2000);
        })
        .catch(function(error) {
            // Error
            console.error('Email failed to send:', error);
            submitButton.innerHTML = '<i class="fas fa-times"></i> Failed!';
            submitButton.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)';
            
            alert("Failed to send email. Please try again or email me directly at isanthan0409@gmail.com");
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.opacity = '1';
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 2000);
        });
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    sendMail(); // Call the global sendMail function
});

// Liquid hover effect for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});