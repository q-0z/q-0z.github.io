document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect for About section
    const aboutText = "An enthusiast self-motivated programmer with 5+ years of extensive experience in game programming and a great understanding of games. Has deep technical knowledge of Unity, Unreal Engine, Game programming and software development. Capable of writing bug-free optimized code for PC and mobile platforms.";
    let i = 0;
    const aboutTextElement = document.getElementById('about-text');
    if (aboutTextElement) {
        function typeWriterAbout() {
            try {
                if (i < aboutText.length) {
                    aboutTextElement.innerHTML = aboutText.substring(0, i + 1) + '<span style="color: #E9ECEF; animation: blink 0.5s infinite;">|</span>';
                    i++;
                    setTimeout(typeWriterAbout, 0.1);
                } else {
                    aboutTextElement.innerHTML = aboutText;
                }
            } catch (error) {
                console.error('About typewriter error:', error);
                aboutTextElement.innerHTML = aboutText;
            }
        }
        typeWriterAbout();
    }

    // Typewriter effect for Contact section
    const contactText = "Here are my contacts link. Feel free to reach out to me";
    let j = 0;
    const contactTextElement = document.getElementById('contact-text');
    if (contactTextElement) {
        function typeWriterContact() {
            try {
                if (j < contactText.length) {
                    contactTextElement.innerHTML = contactText.substring(0, j + 1) + '<span style="color: #264653; animation: blink 0.5s infinite;">|</span>';
                    j++;
                    setTimeout(typeWriterContact, 1);
                } else {
                    contactTextElement.innerHTML = contactText;
                }
            } catch (error) {
                console.error('Contact typewriter error:', error);
                contactTextElement.innerHTML = contactText;
            }
        }
        typeWriterContact();
    }

    // Game-themed background animation
    const canvas = document.getElementById('game-background');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Set canvas size
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                console.log('Canvas resized:', canvas.width, canvas.height);
            }
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            // Game element class
            class GameElement {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 20 + 10;
                    this.speedX = (Math.random() - 0.5) * 1.5;
                    this.speedY = (Math.random() - 0.5) * 1.5;
                    this.opacity = Math.random() * 0.5 + 0.5;
                    this.rotation = Math.random() * Math.PI * 2;
                    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                    this.type = ['block', 'heart', 'health', 'sword', 'gun'][Math.floor(Math.random() * 5)];
                    this.parallax = Math.random() * 0.5 + 0.5;
                    // Assign colors based on type
                    this.color = this.type === 'block' ? '#F4E76E' : 
                                 this.type === 'heart' ? '#FF4D4D' : 
                                 this.type === 'health' ? '#4CAF50' : 
                                 this.type === 'sword' ? '#B0C4DE' : 
                                 '#A9A9A9'; // gun
                    this.innerColor = this.type === 'block' ? '#264653' : this.color;
                    console.log('Created element:', this.type, this.x, this.y, this.color);
                }

                draw() {
                    ctx.save();
                    ctx.globalAlpha = this.opacity;
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation);
                    ctx.fillStyle = this.color;
                    try {
                        if (this.type === 'block') {
                            ctx.fillRect(-this.size / 2, -this.size / 2, this.size * 0.8, this.size * 0.8);
                            ctx.fillStyle = this.innerColor;
                            ctx.fillRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);
                        } else if (this.type === 'heart') {
                            ctx.beginPath();
                            ctx.moveTo(0, this.size / 4);
                            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 4, 0, this.size);
                            ctx.bezierCurveTo(this.size, this.size / 4, this.size / 2, -this.size / 2, 0, this.size / 4);
                            ctx.closePath();
                            ctx.fill();
                        } else if (this.type === 'health') {
                            ctx.beginPath();
                            ctx.fillRect(-this.size / 4, -this.size / 2, this.size / 2, this.size); // Vertical bar
                            ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2); // Horizontal bar
                            ctx.closePath();
                            ctx.fill();
                        } else if (this.type === 'sword') {
                            ctx.beginPath();
                            ctx.moveTo(0, -this.size / 2); // Blade tip
                            ctx.lineTo(-this.size / 8, this.size / 4); // Blade left edge
                            ctx.lineTo(-this.size / 3, this.size / 4); // Crossguard left
                            ctx.lineTo(-this.size / 4, this.size / 2); // Hilt left
                            ctx.lineTo(this.size / 4, this.size / 2); // Hilt right
                            ctx.lineTo(this.size / 3, this.size / 4); // Crossguard right
                            ctx.lineTo(this.size / 8, this.size / 4); // Blade right edge
                            ctx.lineTo(0, -this.size / 2); // Back to tip
                            ctx.closePath();
                            ctx.fill();
                        } else if (this.type === 'gun') {
                            ctx.beginPath();
                            ctx.fillRect(-this.size / 2, -this.size / 8, this.size / 2, this.size / 4); // Barrel
                            ctx.moveTo(0, -this.size / 8);
                            ctx.lineTo(this.size / 8, this.size / 2); // Grip right
                            ctx.lineTo(-this.size / 8, this.size / 2); // Grip left
                            ctx.lineTo(0, -this.size / 8); // Back to barrel
                            ctx.closePath();
                            ctx.fill();
                        }
                    } catch (error) {
                        console.error('Draw error for', this.type, ':', error);
                    }
                    ctx.restore();
                }

                update(scrollY) {
                    try {
                        this.x += this.speedX * this.parallax;
                        this.y += this.speedY - scrollY * 0.05 * this.parallax;
                        this.rotation += this.rotationSpeed;

                        // Boundary checks
                        if (this.x < -this.size) this.x += canvas.width + this.size * 2;
                        if (this.x > canvas.width + this.size) this.x -= canvas.width + this.size * 2;
                        if (this.y < -this.size) this.y += canvas.height + this.size * 2;
                        if (this.y > canvas.height + this.size) this.y -= canvas.height + this.size * 2;
                    } catch (error) {
                        console.error('Update error:', error);
                    }
                }
            }

            // Create elements
            const elements = [];
            for (let i = 0; i < 30; i++) {
                elements.push(new GameElement());
            }
            console.log('Total elements created:', elements.length);

            // Animation loop
            let lastScrollY = window.scrollY;
            function animate() {
                try {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const scrollY = window.scrollY - lastScrollY;
                    elements.forEach(element => {
                        element.update(scrollY);
                        element.draw();
                    });
                    lastScrollY = window.scrollY;
                    requestAnimationFrame(animate);
                } catch (error) {
                    console.error('Animation loop error:', error);
                }
            }
            animate();
        } else {
            console.error('Canvas context not available');
        }
    } else {
        console.error('Canvas element not found');
    }

    // Sound toggle
    let soundEnabled = true;
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            try {
                soundEnabled = !soundEnabled;
                soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
            } catch (error) {
                console.error('Sound toggle error:', error);
            }
        });
    }

    // Smooth scrolling
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            try {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error('Smooth scroll error:', error);
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        try {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        } catch (error) {
            console.error('Header scroll effect error:', error);
        }
    });

    // Project card animations
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length) {
        const projectObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    try {
                        entry.target.style.animation = 'fadeIn 0.8s ease-in forwards';
                    } catch (error) {
                        console.error('Project card animation error:', error);
                    }
                }
            });
        }, { threshold: 0.1 });
        projectCards.forEach(card => projectObserver.observe(card));
    }

    // Stat bar animation on load
    const statBars = document.querySelectorAll('.stat-bar');
    statBars.forEach(bar => {
        const fill = bar.querySelector('.stat-fill');
        if (fill) {
            setTimeout(() => {
                fill.style.width = bar.style.getPropertyValue('--width');
            }, 500);
        }
    });
});