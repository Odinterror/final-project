(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
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
      if (i === index)
        slide.classList.add("is-active");
      if (i === (index - 1 + slides.length) % slides.length)
        slide.classList.add("is-prev");
      if (i === (index + 1) % slides.length)
        slide.classList.add("is-next");
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  };
  prevBtn == null ? void 0 : prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
  nextBtn == null ? void 0 : nextBtn.addEventListener("click", () => {
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
const contactModal = document.getElementById("contact-modal");
if (contactModal) {
  const openButtons = document.querySelectorAll(".contact-btn");
  const closeButton = contactModal.querySelector(".contact-modal__close");
  const overlay = contactModal.querySelector(".contact-modal__overlay");
  const openModal = () => {
    contactModal.classList.add("is-open");
    contactModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    contactModal.classList.remove("is-open");
    contactModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });
  closeButton == null ? void 0 : closeButton.addEventListener("click", closeModal);
  overlay == null ? void 0 : overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}
