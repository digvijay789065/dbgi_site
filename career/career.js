// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.header-container') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.querySelector('i').classList.remove('fa-times');
                mobileMenu.querySelector('i').classList.add('fa-bars');
            }
        }
    });
    
    // Search Form Submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('.search-input').value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // Here you would implement actual search functionality
                this.querySelector('.search-input').value = '';
            }
        });
    }
    
    // Career Form Submission
    const careerForm = document.getElementById('careerForm');
    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call/email submission
            setTimeout(() => {
                // Show success message
                alert(`Thank you ${name}! Your inquiry has been submitted successfully. Our HR team will contact you at ${email} within 48 hours. For immediate consideration, please send your CV to job@dbgisre.edu.in`);
                
                // Reset form
                careerForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('#newsletter-input').value.trim();
            
            if (email) {
                // Show loading state
                const btn = this.querySelector('button');
                const originalText = btn.textContent;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;
                
                setTimeout(() => {
                    alert(`Thank you! You've been subscribed to career updates at DBGI. Updates will be sent to ${email}`);
                    this.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Position Card Click Effect
    const positionCards = document.querySelectorAll('.position-card');
    positionCards.forEach(card => {
        card.addEventListener('click', function() {
            const positionTitle = this.querySelector('h4').textContent;
            
            // Scroll to form
            document.querySelector('#apply').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight the clicked card
            this.style.boxShadow = '0 0 0 3px #ffd200';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 1000);
            
            // Auto-fill position in form
            const form = document.getElementById('careerForm');
            if (form) {
                const textarea = form.querySelector('textarea');
                const currentText = textarea.value;
                textarea.value = currentText ? `${currentText}\n\nInterested in: ${positionTitle}` : `Interested in: ${positionTitle}`;
                textarea.focus();
            }
        });
        
        // Add pointer cursor to all position cards
        card.style.cursor = 'pointer';
    });
    
    // Copy Email Address
    const jobEmail = document.querySelector('.job-email');
    if (jobEmail) {
        jobEmail.style.cursor = 'pointer';
        jobEmail.addEventListener('click', function() {
            const email = 'job@dbgisre.edu.in';
            navigator.clipboard.writeText(email)
                .then(() => {
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Email copied to clipboard!';
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy email:', err);
                });
        });
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Handle external links
            if (this.getAttribute('target') === '_blank') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenu) {
                        mobileMenu.querySelector('i').classList.remove('fa-times');
                        mobileMenu.querySelector('i').classList.add('fa-bars');
                    }
                }
                
                // Calculate header height offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections and position cards
    document.querySelectorAll('section, .position-card, .benefit-card, .admin-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // Feature toggle for position cards
    const featureToggle = () => {
        const featuredCards = document.querySelectorAll('.position-card.featured');
        let isFeatured = true;
        
        // Toggle feature every 5 seconds
        setInterval(() => {
            featuredCards.forEach(card => {
                if (isFeatured) {
                    card.style.boxShadow = '0 0 20px rgba(255, 210, 0, 0.5)';
                } else {
                    card.style.boxShadow = '';
                }
            });
            isFeatured = !isFeatured;
        }, 5000);
    };
    
    // Initialize feature toggle
    setTimeout(featureToggle, 1000);
    
    // Update copyright year
    const yearSpan = document.querySelector('.copyright');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
    }
    
    // Add print button functionality
    const addPrintButton = () => {
        const printBtn = document.createElement('button');
        printBtn.className = 'btn print-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print This Page';
        printBtn.style.position = 'fixed';
        printBtn.style.bottom = '20px';
        printBtn.style.right = '20px';
        printBtn.style.zIndex = '1000';
        printBtn.style.display = 'none';
        
        printBtn.addEventListener('click', () => {
            window.print();
        });
        
        document.body.appendChild(printBtn);
        
        // Show print button on larger screens
        if (window.innerWidth > 768) {
            printBtn.style.display = 'block';
        }
        
        window.addEventListener('resize', () => {
            printBtn.style.display = window.innerWidth > 768 ? 'block' : 'none';
        });
    };
    
    // Initialize print button
    addPrintButton();
    
    // Add page load animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add fade-in animation to hero
        const heroContent = document.querySelector('.career-hero-content');
        if (heroContent) {
            heroContent.style.animation = 'fadeIn 1s ease-out';
        }
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .print-btn {
        background: linear-gradient(135deg, #ffd200, #fe0b00) !important;
        padding: 12px 24px !important;
        border-radius: 25px !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
    }
    
    .print-btn:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
    }
    
    @media print {
        header, .btn, .mobile-menu, .search-container, .print-btn {
            display: none !important;
        }
        
        body {
            padding-top: 0 !important;
        }
        
        .position-card {
            break-inside: avoid;
            page-break-inside: avoid;
        }
    }
`;
document.head.appendChild(style);