export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }
};
