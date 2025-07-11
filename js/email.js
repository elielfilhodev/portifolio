// email.js

(function() {
    emailjs.init('sCyPPqMVhV3D0Ipf-');
})();

window.onload = function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn'); // Pega a referência do botão

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // --- INÍCIO DA ANIMAÇÃO ---
        // Desativa o botão e mostra o loader
        submitBtn.disabled = true;
        submitBtn.classList.add('btn--loading');
        
        const serviceID = 'service_vf8sbrg';
        const templateID = 'template_0f6a39a';

        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            time: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            })
            .finally(function() {
                // --- FIM DA ANIMAÇÃO ---
                // Reativa o botão e esconde o loader, independentemente do resultado
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn--loading');
            });
    });
}