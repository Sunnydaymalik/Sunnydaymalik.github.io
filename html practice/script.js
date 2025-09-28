// small accessible tabs controller with hash linking
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.brand-nav button');
    const panels = document.querySelectorAll('.brand-panel');
  
    function activate(id) {
      tabs.forEach(t => {
        const sel = t.dataset.target === id;
        t.setAttribute('aria-selected', sel);
      });
      panels.forEach(p => {
        if (p.id === id) {
          p.classList.add('active');
          p.removeAttribute('aria-hidden');
          // update URL hash without page jump
          history.replaceState(null, '', '#' + id);
        } else {
          p.classList.remove('active');
          p.setAttribute('aria-hidden', 'true');
        }
      });
    }
  
    tabs.forEach(btn => {
      btn.addEventListener('click', () => activate(btn.dataset.target));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          const arr = Array.from(tabs);
          const i = arr.indexOf(btn);
          const next = e.key === 'ArrowRight' ? (i + 1) % arr.length : (i - 1 + arr.length) % arr.length;
          arr[next].focus();
        }
      });
    });
  
    // deep-link to hash, default to supreme
    const hash = (location.hash || '#brand-supreme').replace('#','');
    // if the hash doesn't match any panel, fallback
    const target = document.getElementById(hash) ? hash : 'brand-supreme';
    activate(target);
  });