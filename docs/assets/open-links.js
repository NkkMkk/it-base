// Make content links open in a new tab
document.addEventListener('DOMContentLoaded', function () {
  const content = document.querySelector('.md-content');
  if (!content) return;
  const links = content.querySelectorAll('a[href]');
  links.forEach(a => {
    // skip links that already specify target or are anchors
    if (a.target || a.getAttribute('href').startsWith('#')) return;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });
});
