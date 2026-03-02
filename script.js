document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const modal = document.getElementById('surprisePopup');
    const closeBtn = document.getElementById('closePopup');
    let heartInterval = null;
    let popupSparkleInterval = null;

    // ═══════════════════════════════════════════════════
    // 1. WELCOME POPUP — unique message, word-by-word
    // ═══════════════════════════════════════════════════
    const welcomeOverlay = document.getElementById('welcomePopup');
    const welcomeTextEl = document.getElementById('welcomeText');
    const welcomeCloseBtn = document.getElementById('welcomeClose');
    const welcomeSparkles = document.getElementById('welcomeSparkles');

    const welcomeMessage = "On this beautiful day, I always wish — may your life be filled with laughter, good health, endless love, and every dream you've ever wished for 💖🌟";


    const welcomeWords = welcomeMessage.split(' ');
    welcomeWords.forEach((word, i) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'welcome-word';
            span.textContent = word;
            welcomeTextEl.appendChild(span);
            if (i % 3 === 0) spawnSparkleIn(welcomeSparkles, 'welcome-sparkle-item');
        }, i * 120);
    });

    setTimeout(() => {
        welcomeCloseBtn.style.display = 'inline-block';
        for (let i = 0; i < 12; i++) {
            setTimeout(() => spawnSparkleIn(welcomeSparkles, 'welcome-sparkle-item'), i * 50);
        }
    }, welcomeWords.length * 120 + 300);

    welcomeCloseBtn.addEventListener('click', () => {
        welcomeOverlay.classList.remove('active');
        startMainPage();
    });

    // ═══════════════════════════════════════════════════
    // 2. MAIN PAGE (after welcome closes)
    // ═══════════════════════════════════════════════════
    function startMainPage() {
        const loadContainer = document.getElementById('loadSparkles');
        const symbols = ['✨', '⭐', '💫', '🌟', '💖'];
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const el = document.createElement('span');
                el.className = 'load-sparkle';
                el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                el.style.left = `${Math.random() * 100}%`;
                el.style.top = `${Math.random() * 100}%`;
                el.style.fontSize = `${1 + Math.random() * 1.5}rem`;
                loadContainer.appendChild(el);
                setTimeout(() => el.remove(), 2000);
            }, i * 80);
        }
        initScrollAnimations();
    }

    // ═══════════════════════════════════════════════════
    // 3. SCROLL ANIMATIONS
    // ═══════════════════════════════════════════════════
    function initScrollAnimations() {
        const slideEls = document.querySelectorAll('.slide-left, .slide-right');
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    const cap = e.target.querySelector('.rise-text');
                    if (cap) setTimeout(() => cap.classList.add('visible'), 300);
                    o.unobserve(e.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        slideEls.forEach(el => obs.observe(el));
    }

    // ═══════════════════════════════════════════════════
    // 4. "NO" BUTTON — unclickable first, alert on 2nd+
    // ═══════════════════════════════════════════════════
    let noClickCount = 0;

    // Start looking normal (no disabled class)

    noBtn.addEventListener('mouseover', () => {
        if (noClickCount === 0) return; // Don't run away on first interaction
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${Math.random() * maxX}px`;
        noBtn.style.top = `${Math.random() * maxY}px`;
        noBtn.style.zIndex = '9999';
    });

    noBtn.addEventListener('touchstart', (e) => {
        if (noClickCount === 0) return;
        e.preventDefault();
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${Math.random() * maxX}px`;
        noBtn.style.top = `${Math.random() * maxY}px`;
        noBtn.style.zIndex = '9999';
    }, { passive: false });

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        noClickCount++;

        if (noClickCount < 1) {
            // First and second click — nothing happens, button just runs away on hover
            return;
        }

        // Third click — hide No button and show "Nice try" alert
        noBtn.style.display = 'none';
        showNoAlert();
    });

    // ═══════════════════════════════════════════════════
    // CUSTOM "NO" ALERT
    // ═══════════════════════════════════════════════════
    const noAlertOverlay = document.getElementById('noAlert');
    const noAlertCloseBtn = document.getElementById('noAlertClose');
    const noAlertSparkles = document.getElementById('noAlertSparkles');

    function showNoAlert() {
        noAlertOverlay.classList.add('active');
        const symbols = ['❤️', '💖', '💕', '✨', '⭐', '💗', '💓', '🌟'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                spawnSparkleIn(noAlertSparkles, 'no-alert-sparkle-item', symbols);
            }, i * 80);
        }
    }

    noAlertCloseBtn.addEventListener('click', () => {
        noAlertOverlay.classList.remove('active');
        // Reset No button back beside Forever yours
        resetNoButton();
        // Remove disabled feel so it runs away next time
    });

    function resetNoButton() {
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.zIndex = '';
    }

    // ═══════════════════════════════════════════════════
    // 5. "FOREVER YOURS" — site sparkles → popup with word-by-word
    // ═══════════════════════════════════════════════════
    const popupMessageEl = document.getElementById('popupMessage');
    const foreverMessage = "“It happened quietly — loving you — and now it’s the strongest thing I feel✨. I wouldn’t undo it for anything.” I LOVE YOU 😘❤️";

    yesBtn.addEventListener('click', () => {
        resetNoButton(); // hide floating No button before popup
        burstSiteSparkles();
        setTimeout(() => openPopup(), 1200);
    });

    closeBtn.addEventListener('click', closePopup);

    function openPopup() {
        modal.classList.add('active');
        startFlyingKiss();
        startPopupSparkles();
        // Word-by-word message
        popupMessageEl.innerHTML = '';
        const words = foreverMessage.split(' ');
        words.forEach((word, i) => {
            setTimeout(() => {
                const span = document.createElement('span');
                span.className = 'popup-word';
                span.textContent = word;
                popupMessageEl.appendChild(span);
            }, i * 100);
        });
    }

    function closePopup() {
        modal.classList.remove('active');
        if (heartInterval) { clearInterval(heartInterval); heartInterval = null; }
        if (popupSparkleInterval) { clearInterval(popupSparkleInterval); popupSparkleInterval = null; }
        resetNoButton();
    }

    // ═══════════════════════════════════════════════════
    // SHARED HELPERS
    // ═══════════════════════════════════════════════════

    function spawnSparkleIn(container, className, customSymbols) {
        const symbols = customSymbols || ['✨', '⭐', '💫', '🌟', '💖', '🎉', '🥳'];
        const sp = document.createElement('span');
        sp.className = className;
        sp.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        sp.style.left = `${Math.random() * 100}%`;
        sp.style.top = `${Math.random() * 100}%`;
        sp.style.fontSize = `${1 + Math.random() * 1.5}rem`;
        container.appendChild(sp);
        setTimeout(() => sp.remove(), 2500);
    }

    function burstSiteSparkles() {
        const symbols = ['✨', '⭐', '💖', '🌟', '💫', '❤️'];
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const sp = document.createElement('span');
                sp.className = 'site-sparkle';
                sp.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                sp.style.left = `${Math.random() * 100}vw`;
                sp.style.top = `${Math.random() * 100}vh`;
                sp.style.fontSize = `${1 + Math.random() * 1.2}rem`;
                sp.style.setProperty('--sx', `${(Math.random() - 0.5) * 200}px`);
                sp.style.setProperty('--sy', `${(Math.random() - 0.5) * 200}px`);
                document.body.appendChild(sp);
                setTimeout(() => sp.remove(), 1600);
            }, i * 15);
        }
    }

    function startFlyingKiss() {
        const stage = document.getElementById('kissContainer');
        stage.innerHTML = '<span class="flying-kiss">😘</span>';
        heartInterval = setInterval(() => {
            if (!modal.classList.contains('active')) { clearInterval(heartInterval); return; }
            spawnHeart(stage);
        }, 350);
    }

    function spawnHeart(stage) {
        const hearts = ['❤️', '💖', '💕', '💗', '💓'];
        const h = document.createElement('span');
        h.className = 'floating-heart';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        const dx = (Math.random() - 0.5) * 160;
        const rot = (Math.random() - 0.5) * 60;
        const dur = 1.8 + Math.random() * 1.2;
        h.style.setProperty('--dx', `${dx}px`);
        h.style.setProperty('--rot', `${rot}deg`);
        h.style.setProperty('--dur', `${dur}s`);
        h.style.left = '50%';
        h.style.bottom = '20%';
        stage.appendChild(h);
        setTimeout(() => h.remove(), dur * 1000);
    }

    function startPopupSparkles() {
        const card = document.querySelector('.modal-card');
        const symbols = ['✨', '⭐', '💫'];
        popupSparkleInterval = setInterval(() => {
            if (!modal.classList.contains('active')) { clearInterval(popupSparkleInterval); return; }
            const sp = document.createElement('span');
            sp.className = 'popup-sparkle';
            sp.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            sp.style.left = `${Math.random() * 100}%`;
            sp.style.top = `${Math.random() * 100}%`;
            sp.style.fontSize = `${0.8 + Math.random()}rem`;
            sp.style.setProperty('--mx', `${(Math.random() - 0.5) * 120}px`);
            sp.style.setProperty('--my', `${(Math.random() - 0.5) * 120}px`);
            card.appendChild(sp);
            setTimeout(() => sp.remove(), 1800);
        }, 200);
    }
});

(function () {
    const container = document.getElementById('eqSparkles');
    if (!container) return;
    const symbols = [];
    const positions = [
        { left: '5%', top: '10%', delay: '0s' },
        { left: '90%', top: '15%', delay: '0.4s' },
        { left: '15%', top: '75%', delay: '0.8s' },
        { left: '80%', top: '70%', delay: '1.2s' },
        { left: '50%', top: '5%', delay: '0.6s' },
        { left: '50%', top: '85%', delay: '1s' },
        { left: '30%', top: '40%', delay: '1.5s' },
        { left: '70%', top: '45%', delay: '0.2s' },
    ];
    positions.forEach((pos, i) => {
        const sp = document.createElement('span');
        sp.className = 'eq-sparkle';
        sp.textContent = symbols[i % symbols.length];
        sp.style.left = pos.left;
        sp.style.top = pos.top;
        sp.style.animationDelay = pos.delay;
        container.appendChild(sp);
    });
})();
