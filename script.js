        // Project Carousel
        const carousel = document.querySelector('.project-carousel');
        const slides = document.querySelectorAll('.project-slide');
        const dots = document.querySelectorAll('.project-dot');
        const navButtons = document.querySelectorAll('.project-nav');
        
        let currentIndex = 0;
        
        function updateCarousel() {
            const slideWidth = slides[0].clientWidth;
            carousel.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'smooth'
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('bg-cyan-400', index === currentIndex);
                dot.classList.toggle('bg-gray-700', index !== currentIndex);
            });
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel();
            });
        });
        
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.querySelector('.fa-chevron-left')) {
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
                } else {
                    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
                }
                updateCarousel();
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active navigation
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active-nav');
                    });
                    this.classList.add('active-nav');
                }
            });
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active-nav');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active-nav');
                        }
                    });
                }
            });
        });
        
        // Animation on scroll
        const observerOptions = {
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.card-hover, .typewriter, .language-progress-bar').forEach(element => {
            observer.observe(element);
        });