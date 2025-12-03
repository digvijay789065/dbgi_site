// academics.js - JavaScript functionality for DBGI Academics page

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializePage();
});

/**
 * Initialize all page functionality
 */
function initializePage() {
  initializeMobileMenu();
  initializeTabSystem();
  initializeScrollEffects();
  initializeNewsletterForm();
}

/**
 * Mobile Menu Functionality
 * Toggles mobile navigation menu
 */
function initializeMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Change menu icon based on state
      const icon = mobileMenu.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        const icon = mobileMenu.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }
}

/**
 * Tab System Functionality
 * Handles switching between different institution tabs
 */
function initializeTabSystem() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".institution-content");

  // Set initial active tab (Engineering) without scrolling on load
  setActiveTab("engineering", false);

  // Add click event listeners to all tab buttons
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      setActiveTab(tabId);
    });
  });

  /**
   * Set active tab and show corresponding content
   * @param {string} tabId - The ID of the tab to activate
   */
  function setActiveTab(tabId, doScroll = true) {
    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    // Add active class to clicked button
    const activeButton = document.querySelector(
      `.tab-btn[data-tab="${tabId}"]`
    );
    if (activeButton) {
      activeButton.classList.add("active");
    }

    // Show corresponding content with animation
    const activeContent = document.getElementById(`${tabId}-content`);
    if (activeContent) {
      activeContent.classList.add("active");

      // Optionally scroll to tab content (disabled on initial load)
      if (doScroll) {
        activeContent.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  }
}

/**
 * Scroll Effects
 * Handles header background change on scroll
 */
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

  // Add scroll animation to course cards
  initializeScrollAnimations();
  
  /**
   * Initialize scroll animations for course cards
  */
 function initializeScrollAnimations() {
   const observerOptions = {
     threshold: 0.1,
     rootMargin: "0px 0px -50px 0px",
    };
    
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all course cards for animation
  document.querySelectorAll(".course-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

/**
 * Newsletter Form Handling
 * Handles newsletter subscription form submission
 */
function initializeNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector(".newsletter-input");
      const email = emailInput.value.trim();

      if (validateEmail(email)) {
        // Simulate form submission
        submitNewsletter(email);
      } else {
        showFormMessage("Please enter a valid email address.", "error");
      }
    });
  }
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Submit newsletter subscription
 * @param {string} email - Subscriber's email address
 */
function submitNewsletter(email) {
  // Simulate API call - replace with actual endpoint
  console.log("Submitting newsletter subscription for:", email);

  // Show success message
  showFormMessage("Thank you for subscribing to our newsletter!", "success");

  // Reset form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.reset();
  }
}

/**
 * Show form message to user
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message element
  const messageElement = document.createElement("div");
  messageElement.className = `form-message ${type}`;
  messageElement.textContent = message;
  messageElement.style.cssText = `
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        text-align: center;
        color: white;
        background-color: ${type === "success" ? "#38a169" : "#e53e3e"};
    `;

  // Insert message after newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.parentNode.insertBefore(
      messageElement,
      newsletterForm.nextSibling
    );

    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
}

/**
 * Smooth scroll to section
 * @param {string} sectionId - ID of the section to scroll to
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Export functions for potential reuse (if using modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializePage,
    initializeMobileMenu,
    initializeTabSystem,
    validateEmail,
    scrollToSection,
  };
}
