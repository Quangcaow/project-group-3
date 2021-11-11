const navSlide = () => {
  const burger = document.querySelector(".menuIcon");
  const nav = document.querySelector(".top-navbar-links");
  burger.addEventListener("click", () => {
    nav.classList.toggle("showMenu");
  });
};

navSlide();
