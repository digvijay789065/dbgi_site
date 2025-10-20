// Mobile menu toggle
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelector('.nav-links').classList.remove('active');
            });
        });

        // Simple PDF viewer simulation
        document.querySelectorAll('.btn:not(.btn-outline)').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.innerHTML.includes('fa-eye')) {
                    e.preventDefault();
                    const pdfTitle = this.closest('.pdf-content').querySelector('h3').textContent;
                    alert(`This would open a PDF viewer for: ${pdfTitle}\n\nIn a real implementation, this would display the PDF using a viewer component.`);
                }
            });
        });