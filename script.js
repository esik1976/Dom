const filterButtons = document.querySelectorAll(".filter-chip");
const listingCards = document.querySelectorAll(".listing-card");
const quickForm = document.getElementById("quick-form");
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

function applyCardVisibility({ type = "all", city = "all", price = "all" }) {
  listingCards.forEach((card) => {
    const matchesType = type === "all" || card.dataset.type === type;
    const matchesCity = city === "all" || card.dataset.city === city;

    let matchesPrice = true;
    if (price !== "all") {
      const [min, max] = price.split("-").map(Number);
      const currentPrice = Number(card.dataset.price);
      matchesPrice = currentPrice >= min && currentPrice <= max;
    }

    card.classList.toggle("is-hidden", !(matchesType && matchesCity && matchesPrice));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    applyCardVisibility({ type: button.dataset.filter });
  });
});

quickForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(quickForm);

  filterButtons.forEach((item) => {
    item.classList.toggle("active", item.dataset.filter === data.get("type"));
  });

  applyCardVisibility({
    type: String(data.get("type")),
    city: String(data.get("city")),
    price: String(data.get("price")),
  });

  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get("name") || "").trim();

  formNote.textContent = name
    ? `${name}, заявка принята. Следующий шаг — подключить отправку в WhatsApp, Telegram или CRM.`
    : "Заявка принята. Следующий шаг — подключить отправку в WhatsApp, Telegram или CRM.";

  contactForm.reset();
});
