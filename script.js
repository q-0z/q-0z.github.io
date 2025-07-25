document.addEventListener( 'DOMContentLoaded', () =>
{
    document.addEventListener( 'click', () =>
    {
        if ( soundEnabled )
        {
            myAudio.currentTime = 0; // rewind to start
            myAudio.play();
        }
    } );
    let scrollPosition = 0;
    // Typewriter effect for About section
    const aboutText = " Game programmer with 6+ years of experience in Unity and Unreal Engine, specializing in cross-platform\
                        development for iOS, Android, Windows, and VR. Skilled in building diverse game genres—Action, Multiplayer,\
                        RPG, Puzzle, and more—with strong knowledge of optimization, plugin integration, and core software\
                        development. ";
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
    const ctx = canvas.getContext( '2d' );

    let mouse = { x: 0, y: 0 };

    window.addEventListener( 'mousemove', ( e ) =>
    {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    } );

    window.addEventListener( 'click', ( e ) =>
    {
        const rect = canvas.getBoundingClientRect();
        const newElement = new GameElement();
        newElement.x = e.clientX - rect.left;
        newElement.y = e.clientY - rect.top;
        elements.push( newElement );
    } );

    // Resize canvas
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

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt( dx * dx + dy * dy );
            const nearMouse = dist < 100;
            const effectiveSize = nearMouse ? this.size * 1.4 : this.size;

            ctx.fillStyle = this.color;

            try
            {
                if ( this.type === 'block' )
                {
                    ctx.fillRect( -effectiveSize / 2, -effectiveSize / 2, effectiveSize * 0.8, effectiveSize * 0.8 );
                    ctx.fillStyle = this.innerColor;
                    ctx.fillRect( -effectiveSize / 4, -effectiveSize / 4, effectiveSize / 2, effectiveSize / 2 );
                } else if ( this.type === 'heart' )
                {
                    ctx.beginPath();
                    ctx.moveTo( 0, effectiveSize / 4 );
                    ctx.bezierCurveTo( -effectiveSize / 2, -effectiveSize / 2, -effectiveSize, effectiveSize / 4, 0, effectiveSize );
                    ctx.bezierCurveTo( effectiveSize, effectiveSize / 4, effectiveSize / 2, -effectiveSize / 2, 0, effectiveSize / 4 );
                    ctx.closePath();
                    ctx.fill();
                } else if ( this.type === 'health' )
                {
                    ctx.beginPath();
                    ctx.fillRect( -effectiveSize / 4, -effectiveSize / 2, effectiveSize / 2, effectiveSize );
                    ctx.fillRect( -effectiveSize / 2, -effectiveSize / 4, effectiveSize, effectiveSize / 2 );
                    ctx.closePath();
                    ctx.fill();
                } else if ( this.type === 'sword' )
                {
                    ctx.beginPath();
                    ctx.moveTo( 0, -effectiveSize / 2 );
                    ctx.lineTo( -effectiveSize / 8, effectiveSize / 4 );
                    ctx.lineTo( -effectiveSize / 3, effectiveSize / 4 );
                    ctx.lineTo( -effectiveSize / 4, effectiveSize / 2 );
                    ctx.lineTo( effectiveSize / 4, effectiveSize / 2 );
                    ctx.lineTo( effectiveSize / 3, effectiveSize / 4 );
                    ctx.lineTo( effectiveSize / 8, effectiveSize / 4 );
                    ctx.lineTo( 0, -effectiveSize / 2 );
                    ctx.closePath();
                    ctx.fill();
                } else if ( this.type === 'gun' )
                {
                    ctx.beginPath();
                    ctx.fillRect( -effectiveSize / 2, -effectiveSize / 8, effectiveSize / 2, effectiveSize / 4 );
                    ctx.moveTo( 0, -effectiveSize / 8 );
                    ctx.lineTo( effectiveSize / 8, effectiveSize / 2 );
                    ctx.lineTo( -effectiveSize / 8, effectiveSize / 2 );
                    ctx.lineTo( 0, -effectiveSize / 8 );
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

    const elements = [];
    for ( let i = 0; i < 50; i++ )
    {
        elements.push( new GameElement() );
    }

    let lastScrollY = window.scrollY;
    let animationEnabled = false;
    let animationFrameId;

    function animate ()
    {
        if ( !animationEnabled ) return;
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
            animationFrameId = requestAnimationFrame( animate );
        } catch ( error )
        {
            console.error( 'Animation loop error:', error );
        }
    }
    animate();

    document.getElementById( 'animation-toggle' ).addEventListener( 'click', () =>
    {
        animationEnabled = !animationEnabled;
        const button = document.getElementById( 'animation-toggle' );
        button.innerHTML = animationEnabled ? ' JS ' : '<s> JS </s>';

        if ( animationEnabled )
        {
            lastScrollY = window.scrollY;
            animationFrameId = requestAnimationFrame( animate );
        } else
        {
            cancelAnimationFrame( animationFrameId );
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
        }
    } );

    let soundEnabled = true;
    const soundToggle = document.getElementById( 'sound-toggle' );
    const myAudio = document.getElementById( 'my-audio' );
    if ( soundToggle )
    {
        const toggleSound = () =>
        {
            try
            {
                soundEnabled = !soundEnabled;
                soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
                if ( soundEnabled )
                {
                    myAudio.play();
                } else
                {
                    myAudio.pause();
                    myAudio.currentTime = 0;
                }
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

    const projectModal = document.getElementById( 'project-modal' );
    const modalTitle = document.getElementById( 'modal-title' );
    const modalText = document.getElementById( 'modal-text' );
    const sliderImages = document.getElementById( 'slider-images' );
    const sliderPrev = document.getElementById( 'slider-prev' );
    const sliderNext = document.getElementById( 'slider-next' );
    let currentSlide = 0;

    const projectData = {
        'vega-metal-structures': {
            title: 'Vega Metal Structures',
            description: 'Ecommerce constructing building site built with Three.js, where users can choose and customize buildings to their needs.',
            images: [
                'images/Projects/Vega_0.png',
                'images/Projects/Vega_1.png',
                'images/Projects/Vega_2.png'
            ],
            youtube: null,
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
            youtube: null,
            links: {
                playstore: 'https://play.google.com/store/apps/details?id=astral.teffexf&hl=en_IN',
                website: null,
                appstore: null,
            }
        },
        'jogo-health': {
            title: 'JoGo Health',
            description: 'A React Native and Unity app using C# and Java, enabling neuromuscular patients to play games using muscle contractions from Shimmer wearable devices.',
            images: [],
            youtube: null,
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
            youtube: null,
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
            youtube: 'https://www.youtube.com/embed/4NAiwfN5Lk2n7mFS?autoplay=1&mute=1&rel=0',
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
            youtube: 'https://www.youtube.com/embed/6ugHLAM0pRE?autoplay=1&mute=1&rel=0',
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
            youtube: null,
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
            youtube: null,
            links: {
                website: 'https://letsgosee.world/',
                appstore: 'https://apps.apple.com/gb/app/lets-go-see-kids-ar-game/id1536127623',
                playstore: null
            }
        },
        'rotate3d': {
            title: 'Rotate3d',
            description: 'Rotate 3D is a unique VR Rhythm Game to avoid the obstacles which are riding on the beat. Collect gems to unlock new powers. Rotate through the tunnels to enjoy a unique environment. Do not forget to pick up your powers of Health & Shield. It gives you an extra bit of support that you need.',
            images: [
                'images/Projects/r3d_1.jpg',
                'images/Projects/r3d_2.jpg',
                'images/Projects/r3d_3.jpg'
            ],
            youtube: null,
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
                'images/Projects/BH_0.png',
                'images/Projects/BH_2.png',
            ],
            youtube: null,
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
                'images/Projects/MS_1.png',
                'images/Projects/MS_3.jpg',
                'images/Projects/MS_4.jpg',
                'images/Projects/MS_8.jpg',
                'images/Projects/MS_6.jpg',
                'images/Projects/MS_7.jpg',
            ],
            youtube: 'https://www.youtube.com/embed/Z6FbuELkCLc?autoplay=1&mute=1&rel=0',
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        },
        'firesky': {
            title: 'Fire Sky',
            description: 'FIRESKY is a multiplayer action RPG with strategic PVP and card collection elements. The game follows a cast of heroes who overcome tremendous odds to fight a great evil spreading throughout the universe.',
            images: [
                'images/Projects/fs_1.jpg',
                'images/Projects/fs_2.jpg',
                'images/Projects/fs_3.jpg',
                'images/Projects/fs_4.jpg',
            ],
            youtube: 'https://www.youtube.com/watch?v=BUoqRgV8FUE?autoplay=1&mute=1&rel=0',
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
            youtube: 'https://www.youtube.com/embed/icLlDUK3sag?autoplay=1&mute=1&rel=0',
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
            youtube: 'https://www.youtube.com/embed/HCD4gbgyY1M?autoplay=1&mute=1&rel=0',
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        },
        'Hololense': {
            title: 'Hololense Apps',
            description: 'Interactive hololense showcases for medical and archviz projects',
            images: [
                'images/Projects/MR_2.png',
                'images/Projects/MR_3.png',
                'images/Projects/MR_4.png',
                'images/Projects/MR_5.png',
            ],
            youtube: null,
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        },
        'charisma': {
            title: 'CHARISMA VR',
            description: 'Series of game to simulation like claw machine, music game, interactive dart game',
            images: [
                'images/Projects/CH_0.png',
                'images/Projects/CH_1.png',
                'images/Projects/CH_2.png'
            ],
            youtube: null,
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        },
        'FT Diagnostic': {
            title: 'DTC Diagnostic',
            description: 'Advance vehicle diagnostic tool for user to figuire out the detail statistics for the cars',
            images: [
            ],
            youtube: 'https://www.youtube.com/embed/nxpNzSDJsCo?autoplay=1&mute=1&rel=0',
            links: {
                website: null,
                appstore: null,
                playstore: null
            }
        }
    };

    const openModal = ( card ) =>
    {
        try
        {
            console.log( 'Opening modal for project:', card.getAttribute( 'data-project-id' ) );
            const projectId = card.getAttribute( 'data-project-id' );
            const project = projectData[ projectId ];
            if ( !project )
            {
                console.error( `Project data not found for ID: ${ projectId }` );
                return;
            }

            scrollPosition = window.scrollY;

            if ( !modalTitle || !modalText )
            {
                console.error( 'Modal title or text element not found in DOM' );
                return;
            }
            modalTitle.textContent = project.title;
            modalText.textContent = project.description;

            //
            const modalLinks = projectModal.querySelector( '.modal-links' ) || document.createElement( 'div' );
            modalLinks.className = 'modal-links';
            modalLinks.innerHTML = '';
            if ( project.links.website )
            {
                const websiteLink = document.createElement( 'a' );
                websiteLink.href = project.links.website;
                websiteLink.textContent = 'Website';
                websiteLink.target = '_blank';
                modalLinks.appendChild( websiteLink );
            }
            if ( project.links.appstore )
            {
                const appStoreLink = document.createElement( 'a' );
                appStoreLink.href = project.links.appstore;
                appStoreLink.textContent = 'App Store';
                appStoreLink.target = '_blank';
                modalLinks.appendChild( appStoreLink );
            }
            if ( project.links.playstore )
            {
                const playStoreLink = document.createElement( 'a' );
                playStoreLink.href = project.links.playstore;
                playStoreLink.textContent = 'Play Store';
                playStoreLink.target = '_blank';
                modalLinks.appendChild( playStoreLink );
            }
            modalText.parentElement.appendChild( modalLinks );
            // Ensure modal content is fully loaded before accessing slider elements
            if ( !projectModal )
            {
                console.error( 'project-modal element not found in DOM' );
                return;
            }
            const sliderMain = projectModal.querySelector( '#slider-main' );
            const sliderThumbnails = projectModal.querySelector( '#slider-thumbnails' );
            if ( !sliderMain || !sliderThumbnails )
            {
                console.error( 'slider-main or slider-thumbnails element not found in DOM' );
                return;
            }
            sliderMain.innerHTML = '';
            sliderThumbnails.innerHTML = '';

            // Add video thumbnail and main content if available
// Add video thumbnail and main content if available
            let modalVideo = projectModal.querySelector( '.modal-video' );
            if ( !modalVideo )
            {
                modalVideo = document.createElement( 'div' );
                modalVideo.classList.add( 'modal-video', 'modal-video-hidden' );
                modalVideo.dataset.index = '0'; // Assign index for video
                sliderMain.appendChild( modalVideo );
            }

            if ( project.youtube && typeof project.youtube === 'string' && project.youtube.startsWith( 'https://www.youtube.com/embed/' ) )
            {
                // Create thumbnail for video
                const videoId = project.youtube.split( '/embed/' )[1].split( '?' )[0];
                const thumbnail = document.createElement( 'div' );
                thumbnail.classList.add( 'thumbnail-video' );
                thumbnail.dataset.index = '0';
                thumbnail.style.backgroundImage = `ur[](https://img.youtube.com/vi/${videoId}/mqdefault.jpg)`;
                sliderThumbnails.appendChild( thumbnail );

                // Create main video
                modalVideo.innerHTML = '';
                modalVideo.classList.remove( 'modal-video-hidden' );
                const iframe = document.createElement( 'iframe' );
                iframe.src = project.youtube.includes( 'enablejsapi' ) ? project.youtube : `${ project.youtube }&enablejsapi=1`;
                iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.title = `${ project.title } YouTube Video`;
                iframe.setAttribute( 'frameborder', '0' );
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.borderRadius = '16px';
                iframe.style.display = 'block';
                iframe.addEventListener( 'error', () =>
                {
                    console.error( `Failed to load YouTube video for ${ projectId }: ${ project.youtube }` );
                    modalVideo.innerHTML = `
            <div style="color: #fff; text-align: center; padding: 20px; background: #1E1E1E; border: 1px solid #5C6BC0; border-radius: 16px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <p>Video blocked (ad-blocker or browser settings). Disable ad-blockers or <a href="${ project.youtube.split( '?' )[ 0 ] }" target="_blank" style="color: #5C6BC0; text-decoration: underline;">watch on YouTube</a>.</p>
                <button onclick="window.location.href='${ project.youtube }'" style="background: #5C6BC0; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-top: 10px;">Play Video</button>
            </div>`;
                    modalVideo.classList.remove( 'modal-video-hidden' );
                } );
                iframe.addEventListener( 'load', () =>
                {
                    console.log( `YouTube iframe loaded for ${ projectId }` );
                } );
                modalVideo.appendChild( iframe );
            } else
            {
                modalVideo.classList.add( 'modal-video-hidden' );
                modalVideo.innerHTML = '';
            }

            // Add image thumbnails and main content
            project.images.forEach( ( src, index ) =>
            {
                const offset = project.youtube ? 1 : 0;
                const img = document.createElement( 'img' );
                img.src = src;
                img.alt = `${ project.title } screenshot`;
                img.className = index === 0 && !project.youtube ? 'active' : '';
                img.dataset.index = (index + offset).toString(); // Add index for reference
                sliderMain.appendChild( img );

                const thumb = document.createElement( 'img' );
                thumb.src = src;
                thumb.alt = `${ project.title } thumbnail`;
                thumb.dataset.index = (index + offset).toString();
                sliderThumbnails.appendChild( thumb );
            } );

            // Event delegation for thumbnail clicks
            sliderThumbnails.addEventListener( 'click', ( e ) =>
            {
                const target = e.target.closest( '.thumbnail-video, img' );
                if ( target && target.dataset.index )
                {
                    currentSlide = parseInt( target.dataset.index, 10 );
                    updateSlider();
                }
            }, { passive: true } );

            projectModal.classList.add( 'active' );
            document.body.classList.add( 'modal-active' );
            currentSlide = 0;
            updateSlider();
        } catch ( e )
        {
            console.error( 'Error opening project modal:', e );
        }
    };

    const closeModal = () =>
    {
        try
        {
            projectModal.classList.remove( 'active' );
            document.body.classList.remove( 'modal-active' );
            window.scrollTo( 0, scrollPosition );
        } catch ( e )
        {
            console.error( 'Error closing project modal:', e );
        }
    };

    function updateSlider ()
    {
        const projectModal = document.getElementById( 'project-modal' );
        if ( !projectModal )
        {
            console.error( 'project-modal element not found in DOM' );
            return;
        }
        const modalVideo = projectModal.querySelector( '.modal-video' );
        if ( !modalVideo )
        {
            console.error( 'modal-video element not found in DOM' );
            return;
        }
        const sliderMain = projectModal.querySelector( '#slider-main' );
        const sliderThumbnails = projectModal.querySelector( '#slider-thumbnails' );
        if ( !sliderMain || !sliderThumbnails )
        {
            console.error( 'slider-main or slider-thumbnails element not found in DOM' );
            return;
        }
        const hasVideo = !modalVideo.classList.contains( 'modal-video-hidden' );
        const images = sliderMain.querySelectorAll( 'img' );
        const thumbnails = sliderThumbnails.querySelectorAll( '.thumbnail-video, img' );
        const totalSlides = hasVideo ? images.length + 1 : images.length;
        if ( totalSlides > 0 )
        {
            // Ensure currentSlide stays within bounds
            currentSlide = Math.max( 0, Math.min( currentSlide, totalSlides - 1 ) );
            modalVideo.classList.toggle( 'active', hasVideo && currentSlide === 0 );
            images.forEach( ( img, index ) =>
            {
                img.classList.toggle( 'active', parseInt(img.dataset.index, 10) === currentSlide );
            } );
            thumbnails.forEach( ( thumb, index ) =>
            {
                thumb.classList.toggle( 'active', index === currentSlide );
            } );
            const iframe = modalVideo.querySelector( 'iframe' );
            if ( hasVideo && iframe )
            {
                try
                {
                    if ( currentSlide === 0 )
                    {
                        iframe.contentWindow.postMessage( '{"event":"command","func":"playVideo","args":""}', '*' );
                    } else
                    {
                        iframe.contentWindow.postMessage( '{"event":"command","func":"pauseVideo","args":""}', '*' );
                    }
                } catch ( error )
                {
                    console.error( 'Error controlling YouTube iframe:', error );
                }
            }
            // Center the active thumbnail
            const activeThumb = thumbnails[ currentSlide ];
            if ( activeThumb )
            {
                const thumbRect = activeThumb.getBoundingClientRect();
                const containerRect = sliderThumbnails.getBoundingClientRect();
                const scrollOffset = thumbRect.left - containerRect.left - ( containerRect.width - thumbRect.width ) / 2;
                sliderThumbnails.scrollTo( { left: sliderThumbnails.scrollLeft + scrollOffset, behavior: 'smooth' } );
            }
        }
    }

    projectCards.forEach( card =>
    {
        card.addEventListener( 'click', () => openModal( card ) );
        card.addEventListener( 'touchend', ( e ) =>
        {
            e.preventDefault();
            openModal( card );
        } );
    } );

    if ( projectModal )
    {
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

        const sliderNext = projectModal.querySelector( '#slider-next' );
        const sliderPrev = projectModal.querySelector( '#slider-prev' );
        if ( sliderNext )
        {
            sliderNext.addEventListener( 'click', ( e ) =>
            {
                e.preventDefault();
                currentSlide++;
                updateSlider();
            }, { passive: true } );
            sliderNext.addEventListener( 'touchend', ( e ) =>
            {
                e.preventDefault();
                currentSlide++;
                updateSlider();
            }, { passive: true } );
        }
        if ( sliderPrev )
        {
            sliderPrev.addEventListener( 'click', ( e ) =>
            {
                e.preventDefault();
                currentSlide--;
                updateSlider();
            }, { passive: true } );
            sliderPrev.addEventListener( 'touchend', ( e ) =>
            {
                e.preventDefault();
                currentSlide--;
                updateSlider();
            }, { passive: true } );
        }
    }

    let touchStartX = 0;
    let touchEndX = 0;

    const sliderThumbnails = projectModal?.querySelector( '#slider-thumbnails' );
    if ( sliderThumbnails )
    {
        sliderThumbnails.addEventListener( 'touchstart', ( e ) =>
        {
            touchStartX = e.changedTouches[ 0 ].pageX;
        } );

        sliderThumbnails.addEventListener( 'touchend', ( e ) =>
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