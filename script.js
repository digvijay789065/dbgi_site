// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");
const searchContainer = document.querySelector(".search-container");

mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    searchContainer.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        searchContainer.classList.remove("active");
    });
});

// Notice Board Slider - 3 sections rotating every 6 seconds
const noticeSlides = document.querySelectorAll(".notice-slide");
const noticeDots = document.querySelectorAll(".notice .dot");
let currentNoticeSlide = 0;

function showNoticeSlide(n) {
    noticeSlides.forEach((slide) => slide.classList.remove("active"));
    noticeDots.forEach((dot) => dot.classList.remove("active"));

    currentNoticeSlide = (n + noticeSlides.length) % noticeSlides.length;
    noticeSlides[currentNoticeSlide].classList.add("active");
    noticeDots[currentNoticeSlide].classList.add("active");
}

// Auto advance notice slides every 6 seconds
setInterval(() => {
    showNoticeSlide(currentNoticeSlide + 1);
}, 6000);

// Dot click events for notice board
noticeDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showNoticeSlide(index);
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonials .dot");
let currentTestimonialSlide = 0;

function showTestimonialSlide(n) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    testimonialDots.forEach((dot) => dot.classList.remove("active"));

    currentTestimonialSlide = (n + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides[currentTestimonialSlide].classList.add("active");
    testimonialDots[currentTestimonialSlide].classList.add("active");
}

// Auto advance testimonial slides
setInterval(() => {
    showTestimonialSlide(currentTestimonialSlide + 1);
}, 5000);

// Dot click events for testimonials
testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showTestimonialSlide(index);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth",
            });
        }
    });
});

// Header background on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
        header.style.background = "linear-gradient(135deg, rgba(255, 210, 0, 0.3), rgba(254, 11, 0, 0.3))";
        header.style.backdropFilter = "blur(5px)";
    } else {
        header.style.background = "linear-gradient(135deg, rgb(255, 210, 0), rgb(254, 11, 0))";
        header.style.backdropFilter = "none";
    }
});

// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = (stat.getAttribute('data-final') || stat.textContent).trim();
        let current = 0;
        const duration = 5000;
        const increment = finalValue.includes('+') || finalValue.includes('%') || finalValue.includes('L') 
            ? 1 
            : parseInt(finalValue.replace(/[+,]/g, '')) / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseInt(finalValue.replace(/[+,%L]/g, ''))) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
            }
        }, 16);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Trigger stats animation when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('.stats-section'));
});

