// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
});

// Form Validation
function validateForm(form) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add('was-validated');
}

// Add form validation listeners
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  validateForm(this);
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
  validateForm(this);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'var(--brown-dark)';
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  } else {
    navbar.style.backgroundColor = 'var(--brown-dark)';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Menu tab animation
const menuTabs = document.querySelectorAll('#menuTabs .nav-link');
menuTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    menuTabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// Form submission handling
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!this.checkValidity()) {
      return;
    }
    
    // Add loading animation to submit button
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Thành công!';
      submitBtn.classList.add('btn-success');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('btn-success');
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
});

// Image hover effect with error handling
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
    this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
  });
});

// Image error handling
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.src = 'images/placeholder.jpg';
    this.alt = 'Hình ảnh không khả dụng';
  });
});

// Counter animation for statistics
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Initialize counters when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, target, 2000);
      observer.unobserve(counter);
    }
  });
});

document.querySelectorAll('.counter').forEach(counter => {
  observer.observe(counter);
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Về đầu trang');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add CSS for back to top button
const style = document.createElement('style');
style.textContent = `
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--brown-dark);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
  }
  
  .back-to-top:hover {
    background-color: var(--brown-light);
    transform: translateY(-3px);
  }
  
  .was-validated .form-control:invalid,
  .was-validated .form-select:invalid {
    border-color: #dc3545;
  }
  
  .was-validated .form-control:valid,
  .was-validated .form-select:valid {
    border-color: #198754;
  }
`;
document.head.appendChild(style); 