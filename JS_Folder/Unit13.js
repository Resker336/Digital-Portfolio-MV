// Unit13.js - Website Development Project Interactive Features
// Author: Martin V.
// Enhanced portfolio page with smooth animations and user interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== NAVIGATION FUNCTIONALITY ====================
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink(clickedLink = null) {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        if (clickedLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            clickedLink.classList.add('active');
            return;
        }
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // ==================== GALLERY FILTERING FUNCTIONALITY ====================
    
    // Gallery filter functionality - FIXED for proper image display
    const initializeGalleryFilters = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        // Ensure all gallery items start with proper styling
        galleryItems.forEach(item => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
            item.style.display = 'block';
            item.style.visibility = 'visible';
            item.style.position = 'relative'; // Prevent positioning issues
            item.style.zIndex = '1'; // Ensure proper stacking
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        // Show item
                        item.style.display = 'block';
                        item.style.visibility = 'visible';
                        item.style.position = 'relative';
                        item.style.zIndex = '1';
                        
                        // Animate in
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    } else {
                        // Hide item with animation
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                            item.style.visibility = 'hidden';
                        }, 300);
                    }
                });
            });
        });
    };

    // Gallery item hover effects - FIXED to prevent interference
    const initializeGalleryItems = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            // Ensure proper initial state
            item.style.position = 'relative';
            item.style.zIndex = '1';
            item.style.overflow = 'visible';
            
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.02)';
                item.style.zIndex = '10'; // Bring to front on hover
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.zIndex = '1'; // Return to normal layer
            });
        });
    };
    
    // ==================== SCROLL ANIMATIONS ====================
    
    // Intersection Observer for scroll animations - FIXED to not interfere with gallery
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate timeline items with stagger effect
                if (entry.target.classList.contains('timeline-item')) {
                    const timelineItems = document.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 200);
                    });
                }
                
                // Animate feature cards with stagger effect
                if (entry.target.classList.contains('features-grid')) {
                    const featureCards = entry.target.querySelectorAll('.feature-card');
                    featureCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }
                
                // Animate stat cards with stagger effect
                if (entry.target.classList.contains('overview-stats')) {
                    const statCards = entry.target.querySelectorAll('.stat-card');
                    statCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                            animateNumber(card.querySelector('.stat-number'));
                        }, index * 150);
                    });
                }
                
                // Animate metrics with stagger effect
                if (entry.target.classList.contains('metrics-grid')) {
                    const metricItems = entry.target.querySelectorAll('.metric-item');
                    metricItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                            animateNumber(item.querySelector('.metric-value'));
                        }, index * 100);
                    });
                }
                
                // FIXED: Handle gallery items without interfering with their display
                if (entry.target.classList.contains('gallery-item')) {
                    // Only add animation class, don't modify display properties
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);
    
    // Elements to observe for animations
    const elementsToAnimate = document.querySelectorAll(`
        .overview-text,
        .overview-stats,
        .timeline-item,
        .features-grid,
        .gallery-item,
        .evaluation-item,
        .reflection-item,
        .metrics-grid,
        .cta-content
    `);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // ==================== NUMBER ANIMATION ====================
    
    function animateNumber(element) {
        if (!element || element.classList.contains('animated')) return;
        
        const finalNumber = element.textContent.trim();
        const isPercentage = finalNumber.includes('%');
        const isFraction = finalNumber.includes('/');
        
        let targetValue;
        if (isPercentage) {
            targetValue = parseInt(finalNumber.replace('%', ''));
        } else if (isFraction) {
            targetValue = parseInt(finalNumber.split('/')[0]);
        } else {
            targetValue = parseInt(finalNumber) || 0;
        }
        
        if (isNaN(targetValue)) return;
        
        element.classList.add('animated');
        let currentValue = 0;
        const increment = targetValue / 30;
        const duration = 1500;
        const stepTime = duration / 30;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(currentValue);
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (isFraction) {
                element.textContent = displayValue + '/' + finalNumber.split('/')[1];
            } else {
                element.textContent = displayValue;
            }
        }, stepTime);
    }
    
    // ==================== ENHANCED HOVER EFFECTS ====================
    
    // Feature cards enhanced hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(247, 147, 30, 0.25)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
            this.style.zIndex = '1';
        });
    });
    
    // Gallery items enhanced interaction - FIXED for proper layering
    const galleryItemsArray = document.querySelectorAll('.gallery-item');
    galleryItemsArray.forEach(item => {
        // Ensure proper initial positioning
        item.style.position = 'relative';
        item.style.zIndex = '1';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) rotateX(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(247, 147, 30, 0.3)';
            this.style.zIndex = '10'; // Bring to front
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = 'none';
            this.style.zIndex = '1'; // Return to normal
        });
    });
    
    // ==================== PARALLAX EFFECTS ====================
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const codeElements = document.querySelectorAll('.code-bracket');
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        codeElements.forEach((element, index) => {
            const speed = 0.05 + (index * 0.02);
            element.style.transform = `translateY(${scrolled * speed}px) rotateZ(${scrolled * 0.01}deg)`;
        });
    }
    
    // ==================== TYPING EFFECT FOR HERO SECTION ====================
    
    function typewriterEffect() {
        const subtitle = document.querySelector('.project-subtitle');
        if (!subtitle) return;
        
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #f7931e';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    }
    
    // ==================== SCROLL PROGRESS INDICATOR ====================
    
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
        
        window.addEventListener('scroll', updateProgress);
    }
    
    // ==================== MOBILE MENU FUNCTIONALITY ====================
    
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navContainer || !navLinks) return;
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 10px;
            z-index: 10000;
        `;
        
        navContainer.appendChild(mobileMenuBtn);
        
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            this.innerHTML = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
    }
    
    // ==================== LAZY LOADING FOR IMAGES ====================
    
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ==================== SMOOTH PAGE LOAD ANIMATION ====================
    
    function initPageLoadAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    
    // ==================== EVENT LISTENERS ====================
    
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleParallax();
    });
    
    window.addEventListener('resize', () => {
        // Recalculate positions on resize
        updateActiveNavLink();
    });
    
    // ==================== INITIALIZE ALL FEATURES ====================
    
    // Initialize gallery functions first to ensure proper setup
    initializeGalleryFilters();
    initializeGalleryItems();
    
    // Initialize other features with delay for smooth loading
    setTimeout(() => {
        typewriterEffect();
        createScrollProgress();
        createMobileMenu();
        setupLazyLoading();
        initPageLoadAnimation();
    }, 500);
    
    // Add CSS animations for JavaScript-triggered elements - FIXED for gallery
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feature-card, .timeline-item {
            transition: all 0.3s ease;
        }
        
        /* FIXED: Gallery item styles to prevent obstruction */
        .gallery-item {
            transition: all 0.3s ease;
            position: relative !important;
            z-index: 1;
            overflow: visible;
            display, block;
            visibility: visible;
        }
        
        .gallery-item:hover {
            z-index: 10 !important;
        }
        
        /* Ensure gallery container doesn't clip content */
        .gallery-container, .gallery-grid {
            overflow: visible !important;
            position: relative;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(26, 26, 46, 0.95);
                flex-direction: column;
                padding: 20px;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 9998;
            }
            
            .nav-links.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-links li {
                margin: 10px 0;
            }
        }
        
        .scroll-progress {
            box-shadow: 0 2px 10px rgba(247, 147, 30, 0.3);
        }
        
        .timeline-item.animate-in .timeline-marker {
            animation: bounceIn 0.6s ease 0.3s both;
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.1);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* Additional fixes for gallery visibility */
        .gallery-item img {
            position: relative;
            z-index: 1;
            display: block;
            max-width: 100%;
            height: auto;
        }
        
        /* Prevent any pseudo-elements from covering images */
        .gallery-item::before,
        .gallery-item::after {
            z-index: 0 !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🚀 Unit 13 Portfolio JavaScript loaded successfully!');
    console.log('✨ Features active: Navigation, Gallery Filtering, Scroll Animations, Parallax Effects');
    console.log('🔧 FIXED: Gallery image obstruction issues resolved');
});