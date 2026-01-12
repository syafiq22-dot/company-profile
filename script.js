// ===================================
// GlobalPath Scholarship Agency
// Custom JavaScript
// ===================================

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Scroll Reveal Animation using Intersection Observer API
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// Modal Functionality
const ctaBtn = document.getElementById('ctaBtn');
const consultModal = document.getElementById('consultModal');
const closeModal = document.getElementById('closeModal');
const consultForm = document.getElementById('consultForm');

// Open Modal
ctaBtn.addEventListener('click', () => {
    consultModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close Modal via Close Button
closeModal.addEventListener('click', () => {
    consultModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close Modal when clicking outside
consultModal.addEventListener('click', (e) => {
    if (e.target === consultModal) {
        consultModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close Modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && consultModal.classList.contains('show')) {
        consultModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Form Validation & Submission
consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const country = document.getElementById('country').value;
    
    // Validation: Check if all fields are filled
    if (!name || !email || !phone || !country) {
        alert('Mohon lengkapi semua field!');
        return;
    }
    
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid! Contoh: nama@email.com');
        return;
    }
    
    // Phone validation (basic - numbers, plus, dash, spaces, parentheses)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Format nomor telepon tidak valid! Gunakan hanya angka, +, -, (, )');
        return;
    }
    
    // Name validation (minimum 3 characters)
    if (name.length < 3) {
        alert('Nama harus minimal 3 karakter!');
        return;
    }
    
    // Phone validation (minimum 10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
        alert('Nomor telepon harus minimal 10 digit!');
        return;
    }
    
    // Success message
    alert(`✅ Terima kasih ${name}!\n\nData Anda telah kami terima:\n📧 Email: ${email}\n📱 WhatsApp: ${phone}\n🌍 Negara Tujuan: ${country}\n\nTim kami akan segera menghubungi Anda dalam 1x24 jam.`);
    
    // Close modal and reset form
    consultModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    consultForm.reset();
    
    // Optional: Send data to server (uncomment when backend is ready)
    // sendFormData({ name, email, phone, country });
});

// Optional: Function to send data to backend
/*
function sendFormData(data) {
    fetch('/api/consultation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
    });
}
*/

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calculate offset for sticky navbar
            const navHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Lazy loading for images (if needed)
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Add active class to current navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-yellow-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-yellow-400');
        }
    });
});

// Console welcome message
console.log('%c🎓 GlobalPath Scholarship Agency', 'color: #fbbf24; font-size: 20px; font-weight: bold;');
console.log('%cWujudkan mimpi kuliah di luar negeri bersama kami!', 'color: #0f172a; font-size: 14px;');
console.log('%c📧 Contact: info@globalpath.com', 'color: #64748b; font-size: 12px;');