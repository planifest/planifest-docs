// Theme Management
const setTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('planifest-theme', theme);
};

const getPreferredTheme = () => {
  const saved = localStorage.getItem('planifest-theme');
  if (saved) return saved as 'light' | 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Initialize Theme
setTheme(getPreferredTheme());

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Button Logic
  const toggleBtn = document.getElementById('theme-toggle');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('fade-in-up');
        el.classList.remove('reveal'); // only animate once
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Trigger once on load
  revealOnScroll();

  // Highlight active nav based on scroll position - Optional generic logic
});
