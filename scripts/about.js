function scrollUp() {
  document.body.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
