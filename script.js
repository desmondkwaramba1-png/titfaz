// TITFAZ INVESTMENT | website interactions
// Zimbabwe WhatsApp number in international format, without the leading 0.
const COMPANY_WHATSAPP = "263783705199";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelectorAll('a[href="#top"], .back-top').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (window.location.hash === "#top") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });
});

// Project gallery category filters
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Enquiry form opens WhatsApp with a prepared message. It does not store submissions.
const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");
const serviceSelect = enquiryForm?.querySelector("#service");
document.querySelectorAll(".service-card a[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

enquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formStatus) return;

  const data = new FormData(enquiryForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const service = String(data.get("service") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !service || !message) {
    formStatus.textContent = "Please complete all required fields.";
    return;
  }

  if (!isValidEmail(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    return;
  }

  const enquiry = `Hello TITFAZ INVESTMENT Pvt Limited, I would like to enquire about your services.\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`;
  formStatus.textContent = "Opening WhatsApp with your enquiry. Please review it and press Send in WhatsApp.";
  window.open(`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(enquiry)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
