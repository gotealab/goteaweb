document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. PANTALLA DE CARGA (LOADER)
    // ==========================================================================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        // Añadir una pequeña pausa para asegurar una transición fluida
        setTimeout(() => {
            loader.classList.add('fade-out');
            document.body.style.overflow = 'auto'; // Permitir scroll una vez cargado
        }, 800);
    });

    // En caso de que tarde demasiado o falle, forzar ocultamiento tras 3 segundos
    setTimeout(() => {
        if (!loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            document.body.style.overflow = 'auto';
        }
    }, 3000);


    // ==========================================================================
    // 2. ENCABEZADO SCROLL (STICKY HEADER)
    // ==========================================================================
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al inicio por si ya está scrolleado


    // ==========================================================================
    // 3. MENÚ MÓVIL (HAMBURGER MENU)
    // ==========================================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');

    const toggleMenu = () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        
        // Animación de las barras del hamburger
        const bars = navToggle.querySelectorAll('.bar');
        if (navToggle.classList.contains('active')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    };

    navToggle.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // ==========================================================================
    // 4. INTERSECTION OBSERVER PARA NAVEGACIÓN Y VIDEOS
    // ==========================================================================
    
    // A. Resaltar enlace activo en el menú según la sección visible
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Detectar cuando está en el centro de pantalla
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // B. Autoplay/Pause de videos al entrar/salir de pantalla (Optimización de rendimiento)
    const outfitVideos = document.querySelectorAll('.outfit-video');

    const videoObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Iniciar cuando se ve al menos un 15% del video
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Reproducir si está en pantalla
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        // El navegador bloqueó la reproducción automática (silenciada no debería fallar)
                        console.log("Autoplay bloqueado temporalmente por navegador:", error);
                    });
                }
            } else {
                // Pausar si sale de pantalla para ahorrar CPU/Batería
                video.pause();
            }
        });
    }, videoObserverOptions);

    outfitVideos.forEach(video => {
        videoObserver.observe(video);
        
        // Asegurar que estén silenciados y en bucle
        video.muted = true;
        video.loop = true;
    });


    // ==========================================================================
    // 5. INTERACTIVIDAD DE VIDEOCARDS (PLAY/PAUSE AL CLIC)
    // ==========================================================================
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        const video = card.querySelector('.outfit-video');
        const playBtn = card.querySelector('.play-btn-overlay i');
        const overlay = card.querySelector('.video-wrapper');

        overlay.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.className = 'fa-solid fa-pause';
                playBtn.parentElement.style.opacity = '0'; // Ocultar boton al reproducir
            } else {
                video.pause();
                playBtn.className = 'fa-solid fa-play';
                playBtn.parentElement.style.opacity = '1'; // Mostrar boton al pausar
            }
        });

        // Al pasar el mouse por encima, asegurarse de mostrar botón si está pausado
        card.addEventListener('mouseenter', () => {
            if (video.paused) {
                playBtn.parentElement.style.opacity = '1';
            } else {
                playBtn.parentElement.style.opacity = '0.7';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!video.paused) {
                playBtn.parentElement.style.opacity = '0';
            }
        });
    });


    // ==========================================================================
    // 6. FORMULARIO DE CONTACTO SIMULADO
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar envío real por recarga de página
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Estado enviando
            submitBtn.disabled = true;
            submitBtn.textContent = 'ENVIANDO...';
            formMessage.textContent = '';
            formMessage.className = 'form-response';

            // Simular respuesta del servidor tras 1.5s
            setTimeout(() => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const idea = document.getElementById('idea').value;

                // Mensaje exitoso
                formMessage.textContent = `¡Gracias, ${name}! Tu propuesta ha sido guardada. Nos pondremos en contacto contigo a ${email} o mándanos un DM en Instagram para acelerar el proceso.`;
                formMessage.classList.add('success');

                // Limpiar formulario y restaurar botón
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                // Ocultar mensaje de éxito tras 8 segundos
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-response';
                }, 8000);

            }, 1500);
        });
    }
});
