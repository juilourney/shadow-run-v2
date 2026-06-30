let current = 's-name';

export function goTo(id) {
  if (id === current) return;
  const prev = document.getElementById(current);
  const next = document.getElementById(id);
  if (!prev || !next) return;

  prev.classList.remove('active');
  prev.classList.add('exit');
  setTimeout(() => prev.classList.remove('exit'), 400);

  next.classList.add('active');
  const scroll = next.querySelector('.scroll');
  if (scroll) scroll.scrollTop = 0;

  current = id;
}
