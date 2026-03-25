// Sticky header shadow on scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.10)';
    } else {
        header.style.boxShadow = 'none';
    }
}, { passive: true });

// Inject mobile booking bar (only on small screens)
function injectMobileBar() {
    if (document.querySelector('.mobile-book-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'mobile-book-bar';
    bar.innerHTML = `
        <div class="price">&#8377;3,000 <span>/ day</span></div>
        <a href="mailto:sauravsikarwar771@gmail.com?subject=Booking Request">Request to Book</a>
    `;
    document.body.appendChild(bar);
}

function handleResize() {
    const bar = document.querySelector('.mobile-book-bar');
    if (window.innerWidth < 900) {
        injectMobileBar();
        if (bar) bar.style.display = 'flex';
    } else {
        if (bar) bar.style.display = 'none';
    }
}

handleResize();
window.addEventListener('resize', handleResize);

// Fade-in sections on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-block, .highlights, .pet-header').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
