// 1. Smooth Scrolling for Navbar Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Default jump ko rokne ke liye
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// 2. Real Contact Form Submission with Backend Connection
const portfolioForm = document.querySelector('form'); // Direct form tag select kiya taaki fail na ho

if (portfolioForm) {
    portfolioForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Page reload rokne ke liye

        // Form ke andar se values nikalna
        const nameInput = portfolioForm.querySelector('input[placeholder*="Name"]');
        const emailInput = portfolioForm.querySelector('input[placeholder*="Email"]');
        const phoneInput = portfolioForm.querySelector('input[placeholder*="Phone"]');
        const purposeSelect = portfolioForm.querySelector('select');
        const messageInput = portfolioForm.querySelector('textarea');

        // Object banana backend ke liye
        const formData = {
            name: nameInput ? nameInput.value.trim() : "",
            email: emailInput ? emailInput.value.trim() : "",
            phone: phoneInput ? phoneInput.value.trim() : "",
            purpose: purposeSelect ? purposeSelect.value : "Other Inquiry",
            message: messageInput ? messageInput.value.trim() : ""
        };

        // Inputs khali toh nahi hain, basic check
        if (!formData.name || !formData.email) {
            alert("Please enter your name and email!");
            return;
        }

        try {
            // Data ko hamare chalte hue Node.js server par bhej bhejha
            const response = await fetch('http://127.0.0.1:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Message Send Successfully! 🚀');
                portfolioForm.reset(); // Form khali karne ke liye
            } else {
                alert('Kuch gadbad hui: ' + result.message);
            }

        } catch (error) {
            console.error('Frontend Fetch Error:', error);
            alert('Server se connect nahi ho pa raha hai bhai! Check karo backend chalu hai na.');
        }
    });
}