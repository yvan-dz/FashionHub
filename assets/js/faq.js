document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/js/faq.json')
        .then(response => response.json())
        .then(data => {
            const faqs = data;
            const faqSection = document.getElementById('faqSection');

            faqs.forEach((faq, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.style.animationDelay = `${index * 0.2}s`;
                faqItem.innerHTML = `
                    <div class="faq-question">${faq.question}</div>
                    <div class="faq-answer">${faq.answer}</div>
                `;
                faqSection.appendChild(faqItem);
            });

            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', function () {
                    const answer = this.nextElementSibling;
                    answer.style.display = answer.style.display === 'none' || answer.style.display === '' ? 'block' : 'none';
                });
            });
        })
        .catch(error => console.error('Error loading FAQs:', error));
});
