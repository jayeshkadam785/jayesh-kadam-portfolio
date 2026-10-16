const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const themeToggle = document.getElementById('themeToggle');
menuToggle?.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.sidebar a, .topnav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.sidebar a, .topnav a').forEach(item => item.classList.remove('active'));
    document.querySelectorAll(`a[href="${link.getAttribute('href')}"]`).forEach(item => item.classList.add('active'));
    sidebar.classList.remove('open');
  });
});
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.textContent = document.body.classList.contains('light-mode') ? '☾' : '☼';
});
const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.sidebar a, .topnav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-25% 0px -65% 0px' });
sections.forEach(section => observer.observe(section));
