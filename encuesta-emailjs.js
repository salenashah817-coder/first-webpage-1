// ===== ENCUESTA FORM HANDLER WITH EMAILJS =====
// Sends emails directly from the browser - No backend needed!

// Only run this code if we're on the encuesta page
if (document.querySelector('form[name="encuesta-apicultura"]')) {
    const encuestaForm = document.querySelector('form[name="encuesta-apicultura"]');
    
    encuestaForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Collect form data
        const formData = new FormData(this);
        const data = {};
        
        // Convert FormData to object (handling checkboxes)
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // If key already exists, make it an array
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Convert arrays to comma-separated strings for email
        for (let key in data) {
            if (Array.isArray(data[key])) {
                data[key] = data[key].join(', ');
            }
        }
        
        try {
            // Send email using EmailJS
            // Make sure to replace these with your actual EmailJS credentials:
            // - YOUR_SERVICE_ID: Your EmailJS service ID
            // - YOUR_TEMPLATE_ID: Your EmailJS template ID
            
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',     // Replace with your Service ID
                'YOUR_TEMPLATE_ID',    // Replace with your Template ID
                {
                    // Template parameters
                    to_email: 'your-email@example.com', // Where to receive emails
                    from_name: data.respondent_name || 'Anónimo',
                    from_email: data.respondent_email || 'No proporcionado',
                    
                    // Survey responses
                    q_experience: data.q_experience || 'No respondido',
                    q_sections: data.q_sections || 'No respondido',
                    q_reason: data.q_reason || 'No respondido',
                    q_content: data.q_content || 'No respondido',
                    q_navigation: data.q_navigation || 'No respondido',
                    q_found_info: data.q_found_info || 'No respondido',
                    q_impression: data.q_impression || 'No respondido',
                    q_return: data.q_return || 'No respondido',
                    q_interest: data.q_interest || 'No respondido',
                    q_improve: data.q_improve || 'No respondido',
                    
                    // Timestamp
                    submission_date: new Date().toLocaleString('es-ES')
                }
            );
            
            console.log('Email sent successfully!', response);
            
            // Success - redirect to success page
            window.location.href = 'survey-success.html';
            
        } catch (error) {
            console.error('Error sending email:', error);
            
            // Show error message
            alert('Hubo un error al enviar la encuesta. Por favor, intenta de nuevo o contacta directamente con nosotros.');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}
