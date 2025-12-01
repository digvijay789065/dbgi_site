// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuBtn.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Program Toggle Functionality
const mbaToggle = document.getElementById("mba-toggle");
const bbaToggle = document.getElementById("bba-toggle");
const mbaContent = document.getElementById("mba-content");
const bbaContent = document.getElementById("bba-content");
const programTitle = document.getElementById("program-title");
const programSubtitle = document.getElementById("program-subtitle");
const ctaTitle = document.getElementById("cta-title");
const ctaSubtitle = document.getElementById("cta-subtitle");
const ctaButton = document.getElementById("cta-button");

mbaToggle.addEventListener("click", () => {
  // Update toggle buttons
  mbaToggle.classList.add("active");
  bbaToggle.classList.remove("active");

  // Update content visibility
  mbaContent.classList.add("active");
  bbaContent.classList.remove("active");

  // Update hero section
  programTitle.textContent = "Master of Business Administration (MBA)";
  programSubtitle.textContent =
    "Shape your future with our comprehensive MBA program designed to develop business leaders and entrepreneurs";

  // Update CTA section
  ctaTitle.textContent = "Ready to Start Your MBA Journey?";
  ctaSubtitle.textContent =
    "Join DBGI Saharanpur and take the first step towards a successful career in business management.";
  ctaButton.textContent = "Apply Now";
});

bbaToggle.addEventListener("click", () => {
  // Update toggle buttons
  bbaToggle.classList.add("active");
  mbaToggle.classList.remove("active");

  // Update content visibility
  bbaContent.classList.add("active");
  mbaContent.classList.remove("active");

  // Update hero section
  programTitle.textContent = "Bachelor of Business Administration (BBA)";
  programSubtitle.textContent =
    "Build a strong foundation in business principles with our comprehensive BBA program";

  // Update CTA section
  ctaTitle.textContent = "Ready to Start Your BBA Journey?";
  ctaSubtitle.textContent =
    "Join DBGI Saharanpur and begin your path to a successful business career.";
  ctaButton.textContent = "Apply Now";
});
