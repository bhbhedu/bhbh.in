document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mobileNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Header Scroll & Scroll Progress
  const header = document.querySelector('.header');
  const scrollProgress = document.querySelector('.scroll-progress');
  const fab = document.querySelector('.floating-social');
  const footer = document.querySelector('.footer');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Header styling
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Scroll progress bar
    if (scrollProgress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + "%";
    }
    
    // Floating WhatsApp Button logic
    if (fab) {
      if (scrollY > 300) {
        fab.classList.add('visible');
      } else {
        fab.classList.remove('visible');
      }
      
      // Hide if covering footer
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < window.innerHeight) {
          fab.style.transform = `translateY(-${window.innerHeight - footerRect.top}px)`;
        } else {
          fab.style.transform = 'translateY(0)';
        }
      }
    }
  });

  // Reveal Animations on Scroll
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal');
    
    // Add js-hidden so elements start hidden if JS is active
    revealElements.forEach(el => el.classList.add('js-hidden'));
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.remove('js-hidden');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Section Background & Accent Color Transitions
    const colorSections = document.querySelectorAll('[data-bg], [data-accent]');
    const root = document.documentElement;
    
    const colorObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bgTokens = entry.target.getAttribute('data-bg');
          const accentToken = entry.target.getAttribute('data-accent');
          
          if (bgTokens) {
            root.style.setProperty('--page-bg', `var(--${bgTokens})`);
          }
          if (accentToken) {
            root.style.setProperty('--active-accent', `var(--${accentToken})`);
            
            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === entry.target.id || 
                  (entry.target.id === 'home' && link.getAttribute('href') === '/')) {
                link.classList.add('active');
              }
            });
          }
        }
      });
    }, {
      root: null,
      threshold: 0.4
    });
    
    colorSections.forEach(section => colorObserver.observe(section));
    
    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Disable on small screens
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
          const speed = el.getAttribute('data-speed') || 0.15;
          const max = el.getAttribute('data-max') || 40;
          
          let yPos = -(scrollY * speed);
          // Cap the movement
          if (yPos > max) yPos = max;
          if (yPos < -max) yPos = -max;
          
          el.style.transform = `translateY(${yPos}px)`;
        });
      });
    }
  }
});
