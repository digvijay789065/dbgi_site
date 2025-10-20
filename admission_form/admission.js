 document.getElementById('admissionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate required fields
            const requiredFields = document.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    const errorId = field.id + 'Error';
                    document.getElementById(errorId).style.display = 'block';
                    isValid = false;
                }
            });
            
            // Validate email format
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value && !emailRegex.test(email.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // Validate GPA range
            const gpa = document.getElementById('gpa');
            if (gpa.value && (gpa.value < 0 || gpa.value > 4)) {
                document.getElementById('gpaError').style.display = 'block';
                isValid = false;
            }
            
            // Validate graduation year
            const graduationYear = document.getElementById('graduationYear');
            const currentYear = new Date().getFullYear();
            if (graduationYear.value && (graduationYear.value < 1980 || graduationYear.value > currentYear + 2)) {
                document.getElementById('graduationYearError').style.display = 'block';
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                alert('Thank you for submitting your application! We will review it and contact you soon.');
                // In a real application, you would submit the form data to a server here
                // this.submit();
            }
        });
        
        // Reset form and clear error messages
        document.querySelector('.btn-reset').addEventListener('click', function() {
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
            });
        });