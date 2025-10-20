// Mobile menu toggle
document.querySelector(".mobile-menu").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.remove("active");
  });
});

// Tab functionality for institutions
document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons and contents
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelectorAll(".institution-content").forEach((content) => {
      content.classList.remove("active");
    });

    // Add active class to clicked button
    this.classList.add("active");

    // Show corresponding content
    const tabId = this.getAttribute("data-tab");
    document.getElementById(`${tabId}-content`).classList.add("active");
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background =
      "linear-gradient(135deg, rgba(255, 210, 0, 0.3), rgba(254, 11, 0, 0.3))";
    header.style.backdropFilter = "blur(5px)";
  } else {
    header.style.background =
      "linear-gradient(135deg, rgb(255, 210, 0), rgb(254, 11, 0))";
    header.style.backdropFilter = "none";
  }
});
