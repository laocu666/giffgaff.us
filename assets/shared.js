/* GiffGaff.us shared JS v2.0 */

// year auto-update
document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// COPY BUTTON
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.copy;
    const text = target || btn.previousElementSibling?.textContent || btn.textContent;
    navigator.clipboard?.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.classList.add('copied');
      btn.textContent = '✓ 已复制';
      setTimeout(() => { btn.classList.remove('copied'); btn.textContent = orig; }, 1800);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  });
});

// ACTIVE NAV
(function() {
  const path = location.pathname;
  document.querySelectorAll('.header-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (path === href || path.endsWith(href.replace(/^\//, '')))) {
      a.classList.add('active');
    }
  });
})();

// INDEX/TAG SEARCH & FILTER
const searchInput = document.getElementById('searchInput');
const tagButtons = document.querySelectorAll('.tag-filter-btn');
const postItems = document.querySelectorAll('.post-item');

function filterPosts() {
  const q = searchInput?.value?.toLowerCase().trim() || '';
  const activeTag = document.querySelector('.tag-filter-btn.active')?.dataset?.tag || 'all';
  postItems.forEach(item => {
    const title = item.querySelector('h3')?.textContent?.toLowerCase() || '';
    const desc = item.querySelector('.post-desc')?.textContent?.toLowerCase() || '';
    const tags = item.dataset?.tags || '';
    const matchSearch = !q || title.includes(q) || desc.includes(q);
    const matchTag = activeTag === 'all' || tags.includes(activeTag);
    item.style.display = matchSearch && matchTag ? '' : 'none';
  });
}

searchInput?.addEventListener('input', filterPosts);
tagButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tagButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterPosts();
  });
});
