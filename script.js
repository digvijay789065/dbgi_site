// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Testimonial Slider
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  currentSlide = (n + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Auto advance slides
setInterval(() => {
  showSlide(currentSlide + 1);
}, 6000);

// Dot click events
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
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


//animation for stats

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to animate counting
function animateCount(element, finalValue, duration = 2000) {
    let start = 0;
    const increment = finalValue / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= finalValue) {
            element.textContent = formatFinalValue(finalValue, element.getAttribute('data-final'));
            clearInterval(timer);
        } else {
            element.textContent = formatFinalValue(Math.floor(start), element.getAttribute('data-final'));
        }
    }, 16);
}

// Format numbers during counting animation
function formatFinalValue(value, originalText) {
    if (originalText.includes('%')) {
        return Math.floor(value) + '%';
    } else if (originalText.includes('L')) {
        // For package - show in lacs during counting
        const lacsValue = (value / 100000).toFixed(1);
        return lacsValue.endsWith('.0') ? lacsValue.split('.')[0] + 'L' : lacsValue + 'L';
    } else if (originalText.includes('+')) {
        return value.toLocaleString() + '+';
    } else {
        return value.toLocaleString();
    }
}

// Handle special cases for percentages and package
function getFinalValue(statNumber) {
    const text = statNumber.textContent;
    
    if (text.includes('%')) {
        return parseInt(text);
    } else if (text.includes('L')) {
        // Convert lacs to actual number for counting
        return parseFloat(text.replace('L', '')) * 100000;
    } else {
        return parseInt(text.replace(/,/g, ''));
    }
}

// Main function to initialize counting animation
function initCountAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const animatedElements = new Set(); // Track which elements have been animated
    
    function checkAndAnimate() {
        statNumbers.forEach(statNumber => {
            if (isInViewport(statNumber) && !animatedElements.has(statNumber)) {
                animatedElements.add(statNumber);
                
                const originalText = statNumber.textContent;
                const finalValue = getFinalValue(statNumber);
                
                // Store original text in data attribute
                statNumber.setAttribute('data-final', originalText);
                
                // Start counting animation
                animateCount(statNumber, finalValue, 1500);
            }
        });
    }
    
    // Check on scroll and resize
    window.addEventListener('scroll', checkAndAnimate);
    window.addEventListener('resize', checkAndAnimate);
    
    // Initial check
    checkAndAnimate();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCountAnimation();
});
