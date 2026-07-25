// ============ Hero terminal boot sequence ============
const typedLineEl = document.getElementById('typedLine');
const bootOutputEl = document.getElementById('bootOutput');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const bootCommand = 'Who is Vibha? ';
const bootLines = [
  'Vibha Manomai ',
  'AI/ML student, B.Tech CSE (AI & ML)',
  'Undergraduate at BVRIT Hyderabad College of Engineering for Women',
  'GSSoC\'26 contributor · open to opportunities'
];

function typeCommand(text, el, speed, onDone){
  if (reduceMotion){ el.textContent = text; onDone && onDone(); return; }
  let i = 0;
  (function step(){
    if (i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    } else {
      onDone && onDone();
    }
  })();
}

function printBootLines(lines, el){
  if (reduceMotion){
    el.innerHTML = lines.map(l => `<div class="line-ok">${l}</div>`).join('');
    return;
  }
  let i = 0;
  (function next(){
    if (i < lines.length){
      const div = document.createElement('div');
      div.className = 'line-ok';
      div.textContent = lines[i];
      el.appendChild(div);
      i++;
      setTimeout(next, 350);
    }
  })();
}

if (typedLineEl){
  typeCommand(bootCommand, typedLineEl, 90, () => {
    setTimeout(() => printBootLines(bootLines, bootOutputEl), 300);
  });
}

// ============ Mobile nav toggle ============
const menuBtn = document.getElementById('menuBtn');
const tabs = document.getElementById('tabs');

if (menuBtn && tabs){
  menuBtn.addEventListener('click', () => {
    const isOpen = tabs.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  tabs.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      tabs.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ Active tab on scroll ============
const sections = document.querySelectorAll('.section[id]');
const tabLinks = document.querySelectorAll('.tab');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      tabLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.target === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(section => observer.observe(section));

// ============ Contact form (no backend — mailto fallback) ============
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message){
      formStatus.textContent = 'error: all fields are required.';
      formStatus.classList.add('error');
      return;
    }

    // No backend in this basic version — opens the user's email client instead.
    // Replace this with a real fetch() call to a form service or backend when ready.
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:25wh1a66c4@bvrithyderabad.edu.in?subject=${subject}&body=${body}`;

    formStatus.textContent = 'opening your email client...';
    formStatus.classList.remove('error');
    contactForm.reset();
  });
}

// ============ Footer year ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
