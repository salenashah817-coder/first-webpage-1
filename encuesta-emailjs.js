if (document.querySelector('form[name="encuesta-apicultura"]')) {
    const encuestaForm = document.querySelector('form[name="encuesta-apicultura"]');
    let isSubmitting = false;
    
    encuestaForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        if (isSubmitting || submitBtn.disabled) {
            return;
        }
        isSubmitting = true;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        const formData = new FormData(this);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        for (let key in data) {
            if (Array.isArray(data[key])) {
                data[key] = data[key].join(', ');
            }
        }
        
        let shouldReset = true;
        try {
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                {
                    to_email: 'your-email@example.com',
                    from_name: data.respondent_name || 'Anónimo',
                    from_email: data.respondent_email || 'No proporcionado',
                    
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
                    
                    submission_date: new Date().toLocaleString('es-ES')
                }
            );
            
            console.log('Email sent successfully!', response);
            
            shouldReset = false;
            window.location.href = 'survey-success.html';
            
        } catch (error) {
            console.error('Error sending email:', error);
            
            alert('Hubo un error al enviar la encuesta. Por favor, intenta de nuevo o contacta directamente con nosotros.');
        } finally {
            if (shouldReset) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                isSubmitting = false;
            }
        }
    });
}
