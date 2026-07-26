// ===== script.js =====

// ----- Mobile Navigation Toggle -----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when a link is clicked (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ----- Active link highlighting on scroll -----
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  const scrollY = window.scrollY + 120; // offset for fixed header

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Throttled scroll event for performance
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveLink();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial call to set active on load
window.addEventListener('load', updateActiveLink);

// ----- Smooth anchor scroll (fallback for older browsers) -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const headerHeight = document.querySelector('.navbar').offsetHeight || 70;
      const targetPosition = targetElement.offsetTop - headerHeight - 10;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ----- Optional: Navbar background on scroll (already transparent) -----
// Add a subtle shadow when scrolled
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
  }
  lastScroll = currentScroll;
});

// ----- Smooth reveal animation on scroll (optional enhancement) -----
// Simple fade-in for cards using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and items for subtle animation
const animateElements = document.querySelectorAll(
  '.edu-card, .project-card, .exp-item, .pub-item, .honor-card, .skill-category'
);

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Also observe stat items
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ----- Handle resize to close mobile menu on large screens -----
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});
