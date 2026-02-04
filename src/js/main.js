import "../scss/style.scss";

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close");

burger.addEventListener("click", () => {
  menu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("active");
});

const gallery = document.querySelector(".gallery-slider");
if (gallery) {
  const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
  const dots = Array.from(gallery.querySelectorAll(".gallery-dot"));
  const prevBtn = gallery.querySelector(".gallery-arrow--left");
  const nextBtn = gallery.querySelector(".gallery-arrow--right");
  let index = 0;

  const update = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove("is-active", "is-prev", "is-next");
      if (i === index) slide.classList.add("is-active");
      if (i === (index - 1 + slides.length) % slides.length) slide.classList.add("is-prev");
      if (i === (index + 1) % slides.length) slide.classList.add("is-next");
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  };

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    update();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      update();
    });
  });

  update();
}
