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

  closeButton?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

const apartmentModal = document.getElementById("apartment-modal");
if (apartmentModal) {
  const openButtons = document.querySelectorAll(".apartment-btn");
  const closeButton = apartmentModal.querySelector(".apartment-modal__close");
  const overlay = apartmentModal.querySelector(".apartment-modal__overlay");
  const modalImage = apartmentModal.querySelector(".apartment-modal__image");
  const modalTitle = apartmentModal.querySelector(".apartment-modal__title");
  const modalArea = apartmentModal.querySelector("[data-apartment-area]");
  const modalRooms = apartmentModal.querySelector("[data-apartment-rooms]");
  const modalPrice = apartmentModal.querySelector("[data-apartment-price]");
  const modalCost = apartmentModal.querySelector("[data-apartment-cost]");
  const apartmentContactBtn = apartmentModal.querySelector(".apartment-modal__cta");

  const openModal = (button) => {
    const img = button.querySelector("img");
    const title = button.querySelector(".apartment-subtitle");
    const area = button.querySelector(".apartment-text");

    const areaValue = button.dataset.area;
    const roomsValue = button.dataset.rooms;
    const priceValue = button.dataset.price;
    const costValue = button.dataset.cost;

    if (modalImage) {
      const modalSrc = button.dataset.modalImage;
      if (modalSrc) {
        modalImage.src = modalSrc;
      } else if (img) {
        modalImage.src = img.src;
      }
      modalImage.alt = img?.alt || "Apartment";
    }
    const modalSrcCheck = button.dataset.modalImage || img?.src || "";
    apartmentModal.classList.toggle(
      "apartment-modal--house-2",
      modalSrcCheck.includes("house2")
    );
    if (title && modalTitle) {
      const rawTitle = title.textContent.trim();
      const modalText = rawTitle.replace(/^Type\s*/i, "House ");
      modalTitle.textContent = modalText;
    }
    if (modalArea) {
      if (areaValue) {
        modalArea.textContent = areaValue;
      } else if (area) {
        const cleaned = area.textContent.replace(/total area/i, "").trim();
        modalArea.textContent = cleaned || area.textContent.trim();
      }
    }
    if (roomsValue && modalRooms) {
      modalRooms.textContent = roomsValue;
    }
    if (priceValue && modalPrice) {
      modalPrice.textContent = priceValue;
    }
    if (costValue && modalCost) {
      modalCost.textContent = costValue;
    }

    apartmentModal.classList.add("is-open");
    apartmentModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    apartmentModal.classList.remove("is-open");
    apartmentModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn));
  });

  closeButton?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", closeModal);
  apartmentContactBtn?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}
