    // Animate skill bars when they come into view
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.classList.add('animated');
            }
        });
    };

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

    // Fade in sections as they come into view
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize section opacity for fade-in effect
    const initializeSections = () => {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s ease-out';
        });
    };

    // Project card hover effects
    const initializeProjectCards = () => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Contact form functionality
    const initializeContactForm = () => {
        const form = document.querySelector('.contact-form form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                // Button loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.style.background = 'linear-gradient(45deg, #ccc, #999)';
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent! ✓';
                    submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
                    }, 3000);
                }, 2000);
            });
        }
    };

    // Enhanced scroll listener
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const codeBackground = document.querySelector('.code-background');
        if (codeBackground) {
            codeBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Trigger animations
        animateSkillBars();
        animateOnScroll();
        
        // Update navigation active state
        updateActiveNavLink();
    });

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

    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // Initialize all functionality
    initializeSections();
    initializeProjectCards();
    initializeContactForm();
    
    // Trigger initial animations
    setTimeout(() => {
        animateOnScroll();
        animateSkillBars();
    }, 100);

    // Add CSS for fade-in effect
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
        
        .skill-progress {
            transition: width 1.5s ease-out;
        }
    `;
    document.head.appendChild(additionalStyle);

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
    

    // Console welcome message
    console.log('%c👋 Welcome to my portfolio!', 'color: #f7931e; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with creativity and efficiency in mind 🚀', 'color: #ff6b35; font-size: 14px;');
    console.log('%c✨ Enhanced with smooth scrolling animations', 'color: #ff6b35; font-size: 12px;');

        const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
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
            
            .stat-number {
                transition: all 0.3s ease;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                .nav-links {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    height: 100vh;
                    width: 250px;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: right 0.3s ease;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                }
                
                .nav-links.mobile-active {
                    right: 0;
                }
                
                .nav-links a {
                    font-size: 1.2rem;
                    margin: 20px 0;
                    padding: 10px 20px;
                    border-radius: 25px;
                    transition: all 0.3s ease;
                }
                
                .nav-links a:hover {
                    background: rgba(247, 147, 30, 0.2);
                    transform: translateX(0);
                }
            }
            
            .navbar {
                transition: all 0.3s ease;
            }
            
            /* Smooth loading animation */
            .content-section {
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* Enhanced button hover effects */
            .cta-button:active {
                transform: translateY(-2px) scale(0.98);
            }
            
            .submit-btn:active {
                transform: translateY(-2px) scale(0.98);
            }
        `;
        document.head.appendChild(style);
    };