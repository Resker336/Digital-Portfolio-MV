// Database Project Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
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

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    const handleNavbarScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    };

    // Fade in sections as they come into view
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !section.classList.contains('animated')) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                section.classList.add('animated');
            }
        });
    };

    // Initialize sections for fade-in effect
    const initializeSections = () => {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s ease-out';
        });
    };

    // Gallery filter functionality
    const initializeGalleryFilters = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

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
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    };

    // Gallery item hover effects
    const initializeGalleryItems = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Stat cards animation
    const animateStatCards = () => {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !card.classList.contains('animated')) {
                const statNumber = card.querySelector('.stat-number');
                const finalNumber = parseInt(statNumber.textContent);
                let currentNumber = 0;
                
                const increment = finalNumber / 30; // Animation duration control
                
                const updateNumber = () => {
                    if (currentNumber < finalNumber) {
                        currentNumber += increment;
                        statNumber.textContent = Math.ceil(currentNumber);
                        requestAnimationFrame(updateNumber);
                    } else {
                        statNumber.textContent = finalNumber;
                    }
                };
                
                updateNumber();
                card.classList.add('animated');
            }
        });
    };

    // Tech cards hover effects
    const initializeTechCards = () => {
        const techCards = document.querySelectorAll('.tech-card');
        
        techCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Timeline items animation
    const animateTimelineItems = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !item.classList.contains('animated')) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 200); // Stagger animation
                
                item.classList.add('animated');
            }
        });
    };

    // Initialize timeline items for animation
    const initializeTimelineItems = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'all 0.6s ease-out';
        });
    };

    // Skills animation for reflection section
    const animateSkills = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((skill, index) => {
            const rect = skill.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !skill.classList.contains('animated')) {
                setTimeout(() => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateX(0)';
                }, index * 100);
                
                skill.classList.add('animated');
            }
        });
    };

    // Initialize skills for animation
    const initializeSkills = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(skill => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateX(-30px)';
            skill.style.transition = 'all 0.5s ease-out';
        });
    };

    // Reflection items stagger animation
    const animateReflectionItems = () => {
        const reflectionItems = document.querySelectorAll('.reflection-item');
        
        reflectionItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !item.classList.contains('animated')) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150);
                
                item.classList.add('animated');
            }
        });
    };

    // Initialize reflection items
    const initializeReflectionItems = () => {
        const reflectionItems = document.querySelectorAll('.reflection-item');
        reflectionItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease-out';
        });
    };

    // Update active navigation link based on scroll position
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('.content-section, .hero');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    // Database icon animation enhancement
    const enhanceDatabaseIcon = () => {
        const databaseIcon = document.querySelector('.database-icon');
        if (databaseIcon) {
            // Add additional floating animation
            databaseIcon.addEventListener('mouseenter', () => {
                databaseIcon.style.transform = 'scale(1.1) translateY(-10px)';
                databaseIcon.style.transition = 'all 0.3s ease';
            });
            
            databaseIcon.addEventListener('mouseleave', () => {
                databaseIcon.style.transform = 'scale(1) translateY(0)';
            });
        }
    };

    // CTA buttons hover effects
    const initializeCTAButtons = () => {
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Scroll indicator animation
    const animateScrollIndicator = () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                if (scrolled > 100) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            });
        }
    };

    // Parallax effect for hero background
    const initializeParallax = () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    };

    // Enhanced scroll listener with throttling
    let ticking = false;
    
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                animateOnScroll();
                animateStatCards();
                animateTimelineItems();
                animateSkills();
                animateReflectionItems();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    };

    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger specific animations based on element class
                if (entry.target.classList.contains('stat-card')) {
                    animateStatCards();
                }
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItems();
                }
                if (entry.target.classList.contains('reflection-item')) {
                    animateReflectionItems();
                }
            }
        });
    }, observerOptions);

    // Observe elements for intersection
    const observeElements = () => {
        document.querySelectorAll('.content-section, .stat-card, .timeline-item, .reflection-item').forEach(element => {
            observer.observe(element);
        });
    };

    // Add dynamic CSS for enhanced animations
    const addDynamicStyles = () => {
        const additionalStyle = document.createElement('style');
        additionalStyle.textContent = `
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .nav-links a.active {
                color: #f7931e !important;
            }
            
            .nav-links a.active::after {
                width: 100% !important;
            }
            
            .gallery-item {
                transition: all 0.3s ease;
            }
            
            .stat-card {
                transition: all 0.3s ease;
            }
            
            .tech-card {
                transition: all 0.3s ease;
            }
            
            .btn-primary, .btn-secondary {
                transition: all 0.3s ease;
            }
            
            .database-icon {
                transition: all 0.3s ease;
            }
            
            .scroll-indicator {
                transition: opacity 0.3s ease;
            }
            
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(additionalStyle);
    };

    // Initialize all functionality
    const initializeAll = () => {
        // Initialize elements for animations
        initializeSections();
        initializeTimelineItems();
        initializeSkills();
        initializeReflectionItems();
        
        // Initialize interactive elements
        initializeGalleryFilters();
        initializeGalleryItems();
        initializeTechCards();
        initializeCTAButtons();
        
        // Initialize effects
        enhanceDatabaseIcon();
        animateScrollIndicator();
        initializeParallax();
        
        // Add dynamic styles
        addDynamicStyles();
        
        // Set up observers
        observeElements();
        
        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Trigger initial animations after a brief delay
        setTimeout(() => {
            animateOnScroll();
            animateStatCards();
        }, 100);
    };

    // ==================== MOBILE MENU FUNCTIONALITY ====================
    
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        
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
    

    // Start everything
    initializeAll();

    // Console welcome message
    console.log('%c🗄️ Database Project Portfolio Loaded!', 'color: #f7931e; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with Microsoft Access and enhanced with modern web animations 🚀', 'color: #ff6b35; font-size: 14px;');
    console.log('%c✨ Features: Smooth scrolling, intersection observers, and performance optimizations', 'color: #ff6b35; font-size: 12px;');

    // Error handling
    window.addEventListener('error', (e) => {
        console.warn('Script error caught:', e.message);
    });

    // Performance monitoring (optional)
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`%cPage loaded in ${loadTime.toFixed(2)}ms`, 'color: #28a745; font-size: 12px;');
        });
    }
});