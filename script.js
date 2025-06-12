document.addEventListener( 'DOMContentLoaded', () =>
{
    let scrollPosition = 0;
    // Typewriter effect for About section
    const aboutText = "An enthusiast self-motivated programmer with 6+ years of extensive experience in game programming and a great understanding of games. Has deep technical knowledge of Unity, Unreal Engine, Game programming and software development. Capable of writing bug-free optimized code for PC and mobile platforms.";
    let i = 0;
    const aboutTextElement = document.getElementById( 'about-text' );
    if ( aboutTextElement )
    {
        function typeWriterAbout ()
        {
            try
            {
                if ( i < aboutText.length )
                {
                    aboutTextElement.innerHTML = aboutText.substring( 0, i + 1 ) + '<span style="color: #E9ECEF; animation: blink 0.5s infinite;">|</span>';
                    i++;
                    setTimeout( typeWriterAbout, 1 );
                } else
                {
                    aboutTextElement.innerHTML = aboutText;
                }
            } catch ( error )
            {
                console.error( 'About typewriter error:', error );
                aboutTextElement.innerHTML = aboutText;
            }
        }
        typeWriterAbout();
    }

    // Typewriter effect for Contact section
    const contactText = "Here are my contact links. Feel free to reach out to me";
    let j = 0;
    const contactTextElement = document.getElementById( 'contact-text' );
    if ( contactTextElement )
    {
        function typeWriterContact ()
        {
            try
            {
                if ( j < contactText.length )
                {
                    contactTextElement.innerHTML = contactText.substring( 0, j + 1 ) + '<span style="color: #264653; animation: blink 0.5s infinite;">|</span>';
                    j++;
                    setTimeout( typeWriterContact, 1 );
                } else
                {
                    contactTextElement.innerHTML = contactText;
                }
            } catch ( error )
            {
                console.error( 'Contact typewriter error:', error );
                contactTextElement.innerHTML = contactText;
            }
        }
        typeWriterContact();
    }

    // Game-themed background animation
    const canvas = document.getElementById( 'game-background' );
    if ( canvas )
    {
        const ctx = canvas.getContext( '2d' );
        if ( ctx )
        {
            // Set canvas size
            function resizeCanvas ()
            {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            window.addEventListener( 'resize', resizeCanvas );
            resizeCanvas();

            // Game element class
            class GameElement
            {
                constructor ()
                {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 20 + 10;
                    this.speedX = ( Math.random() - 0.5 ) * 1.5;
                    this.speedY = ( Math.random() - 0.5 ) * 1.5;
                    this.opacity = Math.random() * 0.5 + 0.5;
                    this.rotation = Math.random() * Math.PI * 2;
                    this.rotationSpeed = ( Math.random() - 0.5 ) * 0.02;
                    this.type = [ 'block', 'heart', 'health', 'sword', 'gun' ][ Math.floor( Math.random() * 5 ) ];
                    this.parallax = Math.random() * 0.5 + 0.5;
                    this.color = this.type === 'block' ? '#F4E76E' :
                        this.type === 'heart' ? '#FF4D4D' :
                            this.type === 'health' ? '#4CAF50' :
                                this.type === 'sword' ? '#B0C4DE' :
                                    '#A9A9A9';
                    this.innerColor = this.type === 'block' ? '#264653' : this.color;
                }

                draw ()
                {
                    ctx.save();
                    ctx.globalAlpha = this.opacity;
                    ctx.translate( this.x, this.y );
                    ctx.rotate( this.rotation );
                    ctx.fillStyle = this.color;
                    try
                    {
                        if ( this.type === 'block' )
                        {
                            ctx.fillRect( -this.size / 2, -this.size / 2, this.size * 0.8, this.size * 0.8 );
                            ctx.fillStyle = this.innerColor;
                            ctx.fillRect( -this.size / 4, -this.size / 4, this.size / 2, this.size / 2 );
                        } else if ( this.type === 'heart' )
                        {
                            ctx.beginPath();
                            ctx.moveTo( 0, this.size / 4 );
                            ctx.bezierCurveTo( -this.size / 2, -this.size / 2, -this.size, this.size / 4, 0, this.size );
                            ctx.bezierCurveTo( this.size, this.size / 4, this.size / 2, -this.size / 2, 0, this.size / 4 );
                            ctx.closePath();
                            ctx.fill();
                        } else if ( this.type === 'health' )
                        {
                            ctx.beginPath();
                            ctx.fillRect( -this.size / 4, -this.size / 2, this.size / 2, this.size );
                            ctx.fillRect( -this.size / 2, -this.size / 4, this.size, this.size / 2 );
                            ctx.closePath();
                            ctx.fill();
                        } else if ( this.type === 'sword' )
                        {
                            ctx.beginPath();
                            ctx.moveTo( 0, -this.size / 2 );
                            ctx.lineTo( -this.size / 8, this.size / 4 );
                            ctx.lineTo( -this.size / 3, this.size / 4 );
                            ctx.lineTo( -this.size / 4, this.size / 2 );
                            ctx.lineTo( this.size / 4, this.size / 2 );
                            ctx.lineTo( this.size / 3, this.size / 4 );
                            ctx.lineTo( this.size / 8, this.size / 4 );
                            ctx.lineTo( 0, -this.size / 2 );
                            ctx.closePath();
                            ctx.fill();
                        } else if ( this.type === 'gun' )
                        {
                            ctx.beginPath();
                            ctx.fillRect( -this.size / 2, -this.size / 8, this.size / 2, this.size / 4 );
                            ctx.moveTo( 0, -this.size / 8 );
                            ctx.lineTo( this.size / 8, this.size / 2 );
                            ctx.lineTo( -this.size / 8, this.size / 2 );
                            ctx.lineTo( 0, -this.size / 8 );
                            ctx.closePath();
                            ctx.fill();
                        }
                    } catch ( error )
                    {
                        console.error( 'Draw error for', this.type, ':', error );
                    }
                    ctx.restore();
                }

                update ( scrollY )
                {
                    try
                    {
                        this.x += this.speedX * this.parallax;
                        this.y += this.speedY - scrollY * 0.05 * this.parallax;
                        this.rotation += this.rotationSpeed;

                        // Boundary checks
                        if ( this.x < -this.size ) this.x += canvas.width + this.size * 2;
                        if ( this.x > canvas.width + this.size ) this.x -= canvas.width + this.size * 2;
                        if ( this.y < -this.size ) this.y += canvas.height + this.size * 2;
                        if ( this.y > canvas.height + this.size ) this.y -= canvas.height + this.size * 2;
                    } catch ( error )
                    {
                        console.error( 'Update error:', error );
                    }
                }
            }

            // Create elements
            const elements = [];
            for ( let i = 0; i < 150; i++ )
            {
                elements.push( new GameElement() );
            }

            // Animation loop
            let lastScrollY = window.scrollY;
            function animate ()
            {
                try
                {
                    ctx.clearRect( 0, 0, canvas.width, canvas.height );
                    const scrollY = window.scrollY - lastScrollY;
                    elements.forEach( element =>
                    {
                        element.update( scrollY );
                        element.draw();
                    } );
                    lastScrollY = window.scrollY;
                    requestAnimationFrame( animate );
                } catch ( error )
                {
                    console.error( 'Animation loop error:', error );
                }
            }
            animate();
        } else
        {
            console.error( 'Canvas context not available' );
        }
    } else
    {
        console.error( 'Canvas element not found' );
    }

    // Sound toggle
    let soundEnabled = true;
    const soundToggle = document.getElementById( 'sound-toggle' );
    if ( soundToggle )
    {
        const toggleSound = () =>
        {
            try
            {
                soundEnabled = !soundEnabled;
                soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
            } catch ( error )
            {
                console.error( 'Sound toggle error:', error );
            }
        };
        soundToggle.addEventListener( 'click', toggleSound );
        soundToggle.addEventListener( 'touchend', ( e ) =>
        {
            e.preventDefault();
            toggleSound();
        } );
    }

    // Smooth scrolling
    const navLinks = document.querySelectorAll( 'nav a' );
    navLinks.forEach( anchor =>
    {
        const smoothScroll = ( e ) =>
        {
            try
            {
                e.preventDefault();
                const targetId = anchor.getAttribute( 'href' ).substring( 1 );
                const targetElement = document.getElementById( targetId );
                if ( targetElement )
                {
                    window.scrollTo( {
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    } );
                }
            } catch ( error )
            {
                console.error( 'Smooth scroll error:', error );
            }
        };
        anchor.addEventListener( 'click', smoothScroll );
        anchor.addEventListener( 'touchend', ( e ) =>
        {
            e.preventDefault();
            smoothScroll( e );
        } );
    } );

    // Header scroll effect
    window.addEventListener( 'scroll', () =>
    {
        try
        {
            const header = document.querySelector( 'header' );
            if ( header )
            {
                if ( window.scrollY > 50 )
                {
                    header.classList.add( 'scrolled' );
                } else
                {
                    header.classList.remove( 'scrolled' );
                }
            }
        } catch ( error )
        {
            console.error( 'Header scroll effect error:', error );
        }
    } );

    // Project card animations
    const projectCards = document.querySelectorAll( '.project-card' );
    if ( projectCards.length )
    {
        const projectObserver = new IntersectionObserver( entries =>
        {
            entries.forEach( entry =>
            {
                if ( entry.isIntersecting )
                {
                    try
                    {
                        entry.target.style.animation = 'fadeIn 0.8s ease-in forwards';
                    } catch ( error )
                    {
                        console.error( 'Project card animation error:', error );
                    }
                }
            } );
        }, { threshold: 0.1 } );
        projectCards.forEach( card => projectObserver.observe( card ) );
    }

    // Stat bar animation on load
    const statBars = document.querySelectorAll( '.stat-bar' );
    statBars.forEach( bar =>
    {
        const fill = bar.querySelector( '.stat-fill' );
        if ( fill )
        {
            setTimeout( () =>
            {
                fill.style.width = bar.style.getPropertyValue( '--width' );
            }, 500 );
        }
    } );

    // Project Modal Functionality
    const projectModal = document.getElementById( 'project-modal' );
    const modalTitle = document.getElementById( 'modal-title' );
    const modalText = document.getElementById( 'modal-text' );
    const sliderImages = document.getElementById( 'slider-images' );
    const sliderPrev = document.getElementById( 'slider-prev' );
    const sliderNext = document.getElementById( 'slider-next' );
    let currentSlide = 0;

    // Project data
    const projectData = {
        'vega-metal-structures': {
            title: 'Vega Metal Structures',
            description: 'Ecommerce constructing building site built with Three.js, where users can choose and customize buildings to their needs.',
            images: [
                'images/Projects/Vega_0.png',
                'images/Projects/Vega_1.png',
                'images/Projects/Vega_2.png'
            ],
            links: {
                website: 'https://vegametalstructures.sensei3d.com/',
                 appstore: null,
                 playstore: null
            }
        },
        'astral-3d-visualizer': {
            title: 'Astral 3D Visualizer',
            description: 'A Unity and Android app using C# and Java to stimulate thought and relaxation through immersive 3D visuals for meditation.',
            images: [
                'images/Projects/AST_0.png',
                'images/Projects/AST_1.png',
                'images/Projects/AST_2.png',
                'images/Projects/AST_3.png',
            ],
            links: {
                playstore: 'https://play.google.com/store/apps/details?id=astral.teffexf&hl=en_IN',
                website: null,
                appstore: null,
            }
        },
        'jogo-health': {
            title: 'JoGo Health',
            description: 'A React Native and Unity app using C# and Java, enabling neuromuscular patients to play games using muscle contractions from Shimmer wearable devices.',
            images: [
            ],
            links: {
                website: 'https://jogohealth.com',
                 appstore: null,
                 playstore: null
            }
        },
        'vizit-app': {
            title: 'VizIT App',
            description: 'A Unity and C# survey app to log and scan market products via serial numbers and barcodes, analyzing data for insights.',
            images: [
                'images/Projects/Vizit_0.png',
                'images/Projects/Vizit_1.png',
                'images/Projects/Vizit_2.png',
            ],
            links: {
                website: null,
                appstore: 'https://apps.apple.com/us/app/nielsen-vizit/id1532264072',
                playstore: 'https://play.google.com/store/apps/details?id=com.connect.vizitprod'
            }
        },
        'word-mason': {
            title: 'Word Mason',
            description: 'A 2D Tetris-style puzzle game in Unity and C#, where players form words in multiple languages to score points.',
            images: [
                'images/Projects/WM_0.png',
                'images/Projects/WM_1.png',
                'images/Projects/WM_2.png'
            ],
            links: {
                website: 'https://images-na.ssl-images-amazon.com/images/I/D1dGrPKK+wS.mp4',
                appstore: 'https://www.amazon.com/Biswa-Games-Word-Mason/dp/B01DRPHZ02/ref=sr_1_2?dib=eyJ2IjoiMSJ9.H3is2MQrwhn5aURB1yIcIo2pn1FDBcyXvThr52GTgL3GjHj071QN20LucGBJIEps.yUgsBa-dhUcrI93EEjQMgBL0_VCJ3KaWi_xYERShqX8&dib_tag=se&qid=1749701848&refinements=p_4%3ABiswa+Games&s=mobile-apps&search-type=ss&sr=1-2',
                playstore: null
            }
        },
        'mazebomber': {
            title: 'Maze Bomber',
            description: 'Your task is to play a fish on a mission to protect your fish-queen at all costs from hungry sharks. This is achieved by completing 50 exciting levels spread across 5 underwater worlds. Clear the level from food to progress, and avoid the sharks. You can deploy underwater mines to fend off the sharks and you can use the Aegis Shield for temporary protection. You can also freeze enemy hearts using thunderbolts.',
            images: [
                'images/Projects/MB_0.jpg',
                'images/Projects/MB_1.jpg',
                'images/Projects/MB_2.jpg'
            ],
            links: {
                website: 'https://images-na.ssl-images-amazon.com/images/I/E1K7dINbjGS.mp4',
                appstore: 'https://www.amazon.com/Biswa-Games-Maze-Bomber/dp/B01MSQBKDQ/ref=sr_1_1?dib=eyJ2IjoiMSJ9.H3is2MQrwhn5aURB1yIcIo2pn1FDBcyXvThr52GTgL3GjHj071QN20LucGBJIEps.yUgsBa-dhUcrI93EEjQMgBL0_VCJ3KaWi_xYERShqX8&dib_tag=se&qid=1749700435&refinements=p_4%3ABiswa+Games&s=mobile-apps&sr=1-1',
                playstore: null
            }
        },
        'titans-vs-mutants': {
            title: 'Titans vs Mutants',
            description: 'A 3D multiplayer VR fighting game in Unreal Engine 4 and C++ with PvP, featuring mythical gods with hand- and head-tracking ability systems.',
            images: [
                'images/Projects/TVM_1.png'
            ],
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        },
        'lets-go-see': {
            title: "Let's Go See",
            description: 'Let\'s Go See is an entertaining, educational and inspirational brand, designed to bring learning to life through fun, adventure, and discovery!',
            images: [
                'images/Projects/lgs_0.png',
                'images/Projects/lgs_1.png',
                'images/Projects/lgs_2.png',
            ],
            links: {
                website: 'https://letsgosee.world/',
                appstore: 'https://apps.apple.com/gb/app/lets-go-see-kids-ar-game/id1536127623',
                playstore: null
            }
        },
        'rotate3d': {
            title: 'Rotate3d',
            description: 'Rotate 3D is a unique VR Rhythm Game to avoid the obstacles which are riding on the beat.Collect gems to unlock new powers.\
            Rotate through the tunnels to enjoy a unique environment.Do not forget to pick up your powers of Health & Shield.It gives you an extra bit of support that you need.',
            images: [
                'images/Projects/r3d_1.jpg',
                'images/Projects/r3d_2.jpg',
                'images/Projects/r3d_3.jpg'
            ],
            links: {
                website: null,
                appstore: 'https://www.meta.com/en-gb/experiences/pcvr/rotate-3d/3505572796210615/',
                playstore: null
            }
        },
        'boomheads': {
            title: 'Boomheads',
            description: 'A Bomberman-style deathmatch game in Unreal Engine 5 and C++ with multiplayer, featuring coin collection and player elimination.',
            images: [
            ],
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        },
        'mobile-star-dancing': {
            title: 'Mobile Star Dancing',
            description: 'A multiplayer MMORPG in Unreal Engine 5 and C++, with character customization, dance events, and social interactions like marriage.',
            images: [
                'images/Projects/Mstar_1.png',
                'images/Projects/Mstar_3.jpg',
                'images/Projects/Mstar_4.jpg',
                'images/Projects/Mstar_5.jpg',
                'images/Projects/Mstar_6.jpg',
                'images/Projects/Mstar_7.jpg',
            ],
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        },
        'firesky': {
            title: 'Fire Sky',
            description: 'FIRESKY is a multiplayer action RPG with strategic PVP and card collection elements.\
            The game follows a cast of heroes who overcome tremendous odds to fight a great evil spreading throughout the universe.',
            images: [
                'images/Projects/fs_1.jpg',
                'images/Projects/fs_2.jpg',
                'images/Projects/fs_3.jpg',
                'images/Projects/fs_4.jpg',
            ],
            links: {
                website: 'https://store.steampowered.com/app/2859900/FIRESKY/',
                appstore: null,
                playstore: 'https://play.google.com/store/apps/details?id=com.concepthaus.ds'
            }
        },
        'zomborgs': {
            title: 'Zomborgs',
            description: 'A multiplayer Street Fighter-style game in Unity and C#, with advanced leveling, tournaments, combos, and unique character movesets.',
            images: [
                'images/Projects/zb_1.jpg',
                'images/Projects/zb_2.jpg',
                'images/Projects/zb_3.jpg',
                'images/Projects/zb_5.jpg',
                'images/Projects/zb_7.jpg',
                'images/Projects/zb_6.jpg',
            ],
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        },
        'casino-vr': {
            title: 'Casino VR',
            description: 'A VR multiplayer casino game in Unity and C#, featuring Blackjack, Poker, Slots, and EU Roulette with avatar customization and MMO elements.',
            images: [
                'images/Projects/casvr_1.jpg',
                'images/Projects/casvr_2.jpg',
                'images/Projects/casvr_3.jpg'
            ],
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        }
    };

    // Function to open modal
    const openModal = ( card ) =>
    {
        try
        {
            const projectId = card.getAttribute( 'data-project-id' );
            const project = projectData[ projectId ];
            if ( project )
            {
                // Store scroll position
                scrollPosition = window.scrollY;
                // Populate modal
                modalTitle.textContent = project.title;
                modalText.textContent = project.description;

                // Populate slider images
                sliderImages.innerHTML = '';
                project.images.forEach( ( src, index ) =>
                {
                    const img = document.createElement( 'img' );
                    img.src = src;
                    img.alt = `${ project.title } screenshot`;
                    img.className = index === 0 ? 'active' : '';
                    sliderImages.appendChild( img );
                } );

                // Populate links
                const modalLinks = document.querySelector( '.modal-links' );
                modalLinks.innerHTML = '';
                const linkTypes = [
                    { type: 'website', label: 'Visit Website', tooltip: 'Go to the live project site' },
                    { type: 'appstore', label: 'App Store', tooltip: 'Download on the App Store' },
                    { type: 'playstore', label: 'Play Store', tooltip: 'Download on Google Play' }
                ];
                linkTypes.forEach( link =>
                {
                    if ( project.links[ link.type ] )
                    {
                        const a = document.createElement( 'a' );
                        a.href = project.links[ link.type ];
                        a.className = `modal-link ${ link.type }`;
                        a.target = '_blank';
                        a.rel = 'noopener noreferrer';
                        a.innerHTML = `${ link.label }<span class="modal-link-tooltip">${ link.tooltip }</span>`;
                        modalLinks.appendChild( a );
                    }
                } );

                // Reset slider
                currentSlide = 0;
                updateSlider();

                // Show modal and lock body
                projectModal.classList.add( 'active' );
                document.body.classList.add( 'modal-active' );
            }
        } catch ( e )
        {
            console.error( 'Error opening project modal:', e );
        }
    };

    // Function to close modal
    const closeModal = () =>
    {
        try
        {
            projectModal.classList.remove( 'active' );
            document.body.classList.remove( 'modal-active' );
            // Restore scroll position
            window.scrollTo( 0, scrollPosition );
        } catch ( e )
        {
            console.error( 'Error closing project modal:', e );
        }
    };

    // Slider navigation
    function updateSlider ()
    {
        const totalSlides = sliderImages.children.length;
        if ( totalSlides > 0 )
        {
            currentSlide = ( currentSlide + totalSlides ) % totalSlides; // Wrap around
            const images = sliderImages.querySelectorAll( 'img' );
            images.forEach( ( img, index ) =>
            {
                img.classList.remove( 'active' );
                if ( index === currentSlide )
                {
                    img.classList.add( 'active' );
                }
            } );
            // Center the active image
            const activeImage = sliderImages.children[ currentSlide ];
            const offset = -( activeImage.offsetWidth * currentSlide - ( sliderImages.parentElement.offsetWidth / 2 - activeImage.offsetWidth / 2 ) );
            sliderImages.style.transform = `translateX(${ offset }px)`;
        }
    }

    // Open modal when clicking project card
    projectCards.forEach( card =>
    {
        card.addEventListener( 'click', () => openModal( card ) );
        card.addEventListener( 'touchend', ( e ) =>
        {
            e.preventDefault();
            openModal( card );
        } );
    } );

    // Close modal when clicking outside
    projectModal.addEventListener( 'click', ( e ) =>
    {
        if ( e.target === projectModal )
        {
            closeModal();
        }
    } );
    projectModal.addEventListener( 'touchend', ( e ) =>
    {
        if ( e.target === projectModal )
        {
            e.preventDefault();
            closeModal();
        }
    } );

    // Next/Prev slide
    if ( sliderNext )
    {
        sliderNext.addEventListener( 'click', () =>
        {
            currentSlide++;
            updateSlider();
        } );
        sliderNext.addEventListener( 'touchend', ( e ) =>
        {
            e.preventDefault();
            currentSlide++;
            updateSlider();
        } );
    }

    if ( sliderPrev )
    {
        sliderPrev.addEventListener( 'click', () =>
        {
            currentSlide--;
            updateSlider();
        } );
        sliderPrev.addEventListener( 'touchend', ( e ) =>
        {
            e.preventDefault();
            currentSlide--;
            updateSlider();
        } );
    }

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    if ( sliderImages )
    {
        sliderImages.addEventListener( 'touchstart', ( e ) =>
        {
            touchStartX = e.changedTouches[ 0 ].pageX;
        } );

        sliderImages.addEventListener( 'touchend', ( e ) =>
        {
            touchEndX = e.changedTouches[ 0 ].pageX;
            if ( touchEndX - touchStartX > 50 )
            {
                currentSlide--;
                updateSlider();
            } else if ( touchEndX - touchStartX < -50 )
            {
                currentSlide++;
                updateSlider();
            }
        } );
    }
} );