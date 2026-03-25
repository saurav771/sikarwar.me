/* ══════════════════════════════════════
   HEADER SCROLL SHADOW
══════════════════════════════════════ */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.10)'
        : 'none';
}, { passive: true });

/* ══════════════════════════════════════
   MOBILE BOOKING BAR
══════════════════════════════════════ */
function syncMobileBar() {
    let bar = document.querySelector('.mobile-book-bar');
    if (window.innerWidth < 900) {
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 'mobile-book-bar';
            bar.innerHTML = `
                <div class="price">&#8377;3,000 <span>/ day</span></div>
                <a href="mailto:sauravsikarwar771@gmail.com?subject=Booking Request">Request to Book</a>
            `;
            document.body.appendChild(bar);
        }
        bar.style.display = 'flex';
    } else {
        if (bar) bar.style.display = 'none';
    }
}
syncMobileBar();
window.addEventListener('resize', syncMobileBar);

/* ══════════════════════════════════════
   HAMBURGER / NAV DRAWER
══════════════════════════════════════ */
const hamburgerBtn = document.getElementById('hamburger-btn');
const drawer       = document.getElementById('nav-drawer');
const navOverlay   = document.getElementById('nav-overlay');
const drawerClose  = document.getElementById('drawer-close');

function openDrawer() {
    drawer.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeDrawer() {
    drawer.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
navOverlay.addEventListener('click', closeDrawer);

// Close drawer when a nav link is tapped
document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
});

/* ══════════════════════════════════════
   AUTH MODAL
══════════════════════════════════════ */
const overlay     = document.getElementById('auth-overlay');
const modalClose  = document.getElementById('modal-close');
const signinBtn   = document.getElementById('signin-btn');
const drawerSignin = document.getElementById('drawer-signin-btn');

function openModal(tab = 'signin') {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    switchTab(tab);
}
function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

signinBtn.addEventListener('click', () => openModal('signin'));
drawerSignin.addEventListener('click', () => { closeDrawer(); openModal('signin'); });
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeDrawer(); } });

// Tab switching
const tabs         = document.querySelectorAll('.auth-tab');
const formSignin   = document.getElementById('form-signin');
const formSignup   = document.getElementById('form-signup');

function switchTab(tab) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    formSignin.classList.toggle('hidden', tab !== 'signin');
    formSignup.classList.toggle('hidden', tab !== 'signup');
}

tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));

// In-form switch links
document.querySelectorAll('.link-btn[data-switch]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.switch));
});

/* ══════════════════════════════════════
   PASSWORD TOGGLE
══════════════════════════════════════ */
document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const show  = btn.querySelector('.eye-show');
        const hide  = btn.querySelector('.eye-hide');
        const isHidden = input.type === 'password';
        input.type = isHidden ? 'text' : 'password';
        show.style.display = isHidden ? 'none'  : '';
        hide.style.display = isHidden ? ''      : 'none';
    });
});

/* ══════════════════════════════════════
   FORM VALIDATION
══════════════════════════════════════ */
function setError(inputEl, errEl, msg) {
    inputEl.classList.toggle('error', !!msg);
    errEl.textContent = msg;
}
function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

// Sign In
formSignin.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('si-email');
    const pw    = document.getElementById('si-password');
    const eErr  = document.getElementById('si-email-err');
    const pErr  = document.getElementById('si-pw-err');
    let ok = true;

    setError(email, eErr, !email.value ? 'Email is required.'
        : !validateEmail(email.value) ? 'Enter a valid email address.' : '');
    setError(pw, pErr, !pw.value ? 'Password is required.'
        : pw.value.length < 6 ? 'Password must be at least 6 characters.' : '');

    if (email.classList.contains('error') || pw.classList.contains('error')) return;

    // Simulate successful sign in
    const btn = formSignin.querySelector('.auth-submit');
    btn.textContent = 'Signing in…';
    btn.disabled = true;
    setTimeout(() => {
        closeModal();
        signinBtn.textContent = 'My Account';
        signinBtn.style.color = 'var(--red)';
        btn.textContent = 'Sign In';
        btn.disabled = false;
    }, 1200);
});

// Sign Up
formSignup.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('su-name');
    const email   = document.getElementById('su-email');
    const pw      = document.getElementById('su-password');
    const confirm = document.getElementById('su-confirm');
    const nErr    = document.getElementById('su-name-err');
    const eErr    = document.getElementById('su-email-err');
    const pErr    = document.getElementById('su-pw-err');
    const cErr    = document.getElementById('su-confirm-err');

    setError(name,    nErr, !name.value.trim() ? 'Full name is required.' : '');
    setError(email,   eErr, !email.value ? 'Email is required.'
        : !validateEmail(email.value) ? 'Enter a valid email address.' : '');
    setError(pw,      pErr, !pw.value ? 'Password is required.'
        : pw.value.length < 8 ? 'Password must be at least 8 characters.' : '');
    setError(confirm, cErr, !confirm.value ? 'Please confirm your password.'
        : confirm.value !== pw.value ? 'Passwords do not match.' : '');

    const hasError = [name, email, pw, confirm].some(el => el.classList.contains('error'));
    if (hasError) return;

    const btn = formSignup.querySelector('.auth-submit');
    btn.textContent = 'Creating account…';
    btn.disabled = true;
    setTimeout(() => {
        closeModal();
        signinBtn.textContent = 'My Account';
        signinBtn.style.color = 'var(--red)';
        btn.textContent = 'Create Account';
        btn.disabled = false;
    }, 1400);
});

/* ══════════════════════════════════════
   SCROLL FADE-IN ANIMATIONS
══════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.section-block, .highlights, .pet-header').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
